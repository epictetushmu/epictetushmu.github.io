import subprocess
import os
from flask import Flask, jsonify, request
from flask_socketio import SocketIO, Namespace
import threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

class AdminNamespace(Namespace):
    def on_connect(self):
        # Retrieve the token from the connection query parameters or headers
        # For simplicity, we'll assume it's passed in query params as 'token'
        # In a real app, you might use request.headers.get('Authorization')
        token = request.args.get('token')

        if token == 'mock-jwt-token': # In a real app, validate JWT
            print("Authenticated client connected")
        else:
            print("Unauthenticated client attempted to connect. Disconnecting.")
            self.disconnect()

    def on_disconnect(self):
        print("Client disconnected")

    def on_pull_and_build(self):
        def background_thread():
            try:
                # Git pull
                self.emit('output', {'data': '--- Starting Git pull ---\n'})
                pull_process = subprocess.Popen(['git', 'pull'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                for line in iter(pull_process.stdout.readline, ''):
                    self.emit('output', {'data': line})
                pull_process.stdout.close()
                pull_returncode = pull_process.wait()
                if pull_returncode != 0:
                    self.emit('output', {'data': f'--- Git pull failed with exit code {pull_returncode} ---\n'})
                    self.emit('pull_finished', {'success': False})
                    return

                self.emit('output', {'data': '--- Git pull successful ---\n'})

                # NPM build
                self.emit('output', {'data': '--- Starting NPM build ---\n'})
                build_process = subprocess.Popen(['npm', 'run', 'build'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                for line in iter(build_process.stdout.readline, ''):
                    self.emit('output', {'data': line})
                build_process.stdout.close()
                build_returncode = build_process.wait()
                if build_returncode != 0:
                    self.emit('output', {'data': f'--- NPM build failed with exit code {build_returncode} ---\n'})
                    self.emit('pull_finished', {'success': False})
                    return

                self.emit('output', {'data': '--- NPM build successful ---\n'})
                self.emit('pull_finished', {'success': True})

            except Exception as e:
                self.emit('output', {'data': f'--- Error: {str(e)} ---\n'})
                self.emit('pull_finished', {'success': False})

        thread = threading.Thread(target=background_thread)
        thread.start()

socketio.on_namespace(AdminNamespace('/admin'))

@app.route('/admin/pull', methods=['POST'])
def pull_and_build_request():
    socketio.emit('pull_and_build', namespace='/admin')
    return jsonify({'status': 'success', 'message': 'Pull and build process started.'})


if __name__ == '__main__':


    port = int(os.environ.get('PORT', 5002))


    socketio.run(app, host='0.0.0.0', port=port, allow_unsafe_werkzeug=True)

