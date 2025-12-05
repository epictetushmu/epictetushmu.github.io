<template>
  <div class="admin-pull-container">
    <PageHeader title="Admin Pull" />
    <div class="content">
      <AppButton @click="startPull" :disabled="loading">
        {{ loading ? 'Pulling and Building...' : 'Start Pull and Build' }}
      </AppButton>
      <div class="terminal-container" ref="terminal">
        <pre v-for="(line, index) in output" :key="index">{{ line }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import PageHeader from '@/components/common/PageHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import io from 'socket.io-client';

const loading = ref(false);
const output = ref([]);
const terminal = ref(null);
let socket;

const scrollToBottom = () => {
  nextTick(() => {
    if (terminal.value) {
      terminal.value.scrollTop = terminal.value.scrollHeight;
    }
  });
};

const startPull = () => {
  loading.value = true;
  output.value = [];
  socket.emit('pull_and_build');
};

onMounted(() => {
  const token = localStorage.getItem('epictetus_token');
  socket = io('http://localhost:5002/admin', {
    query: { token: token }
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('output', (data) => {
    output.value.push(data.data);
    scrollToBottom();
  });

  socket.on('pull_finished', (data) => {
    loading.value = false;
    output.value.push(data.success ? '--- Process finished successfully ---' : '--- Process finished with errors ---');
    scrollToBottom();
  });
});

onBeforeUnmount(() => {
  if (socket) {
    socket.disconnect();
  }
});
</script>

<style scoped>
.admin-pull-container {
  padding: 2rem;
}

.content {
  margin-top: 2rem;
}

.terminal-container {
  margin-top: 1rem;
  background-color: #222;
  color: #eee;
  padding: 1rem;
  border-radius: 5px;
  height: 400px;
  overflow-y: auto;
  font-family: 'Courier New', Courier, monospace;
}
</style>
