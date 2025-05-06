<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <button @click="showModal = true" class="show-modal-btn">Sign Up</button>
    
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <form @submit.prevent="submitForm">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr>
          
          <div class="form-group">
            <label for="fname"><b>First Name</b></label>
            <input type="text" v-model="form.firstName" placeholder="Enter First Name" id="fname" required>
          </div>
          
          <div class="form-group">
            <label for="lname"><b>Last Name</b></label>
            <input type="text" v-model="form.lastName" placeholder="Enter Last Name" id="lname" required>
          </div>
          
          <div class="form-group">
            <label for="am"><b>Registration Number</b></label>
            <input type="text" v-model="form.regNumber" placeholder="Enter Registration Number" id="am" required>
          </div>
          
          <div class="form-group">
            <label for="email"><b>Email</b></label>
            <input type="email" v-model="form.email" placeholder="Enter Email" id="email" required>
          </div>
          
          <div class="form-group">
            <label for="username"><b>Username</b></label>
            <input type="text" v-model="form.username" placeholder="Enter Username" id="username" required>
          </div>
          
          <div class="form-group">
            <label for="psw"><b>Password</b></label>
            <input type="password" v-model="form.password" placeholder="Enter Password" id="psw" required>
          </div>
          
          <div class="form-group">
            <label for="psw_repeat"><b>Repeat Password</b></label>
            <input type="password" v-model="form.passwordConfirm" placeholder="Repeat Password" id="psw_repeat" required>
          </div>
          
          <div class="clearfix">
            <button type="button" @click="showModal = false" class="cancelbtn">Cancel</button>
            <button type="submit" class="signupbtn">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const showModal = ref(false)
const form = reactive({
  firstName: '',
  lastName: '',
  regNumber: '',
  email: '',
  username: '',
  password: '',
  passwordConfirm: ''
})

const submitForm = () => {
  if (form.password !== form.passwordConfirm) {
    alert('Passwords must be the same')
    return
  }
  
  console.log('Form submitted:', { ...form })
  showModal.value = false
  
  // Reset form
  Object.keys(form).forEach(key => form[key] = '')
}
</script>

<style scoped>
/* Modal styles */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  border-radius: 5px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: #000;
}

/* Form styles */
.form-group {
  margin-bottom: 15px;
}

input[type=text],
input[type=password],
input[type=email] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

.cancelbtn, .signupbtn {
  float: left;
  width: 50%;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
}

.cancelbtn {
  background-color: #f44336;
  color: white;
}

.signupbtn {
  background-color: #2196F3;
  color: white;
}

.show-modal-btn {
  background-color: #2196F3;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: auto;
  border-radius: 4px;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
</style>