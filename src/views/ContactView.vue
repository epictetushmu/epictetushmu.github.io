<template>
  <div class="contact">
    <h1>Contact Form</h1>
    <div class="container">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" placeholder="Your email.." required>
        </div>
        
        <div class="form-group">
          <label for="fname">First Name</label>
          <input type="text" id="fname" v-model="form.firstName" placeholder="Your name.." required>
        </div>
        
        <div class="form-group">
          <label for="lname">Last Name</label>
          <input type="text" id="lname" v-model="form.lastName" placeholder="Your last name.." required>
        </div>
        
        <div class="form-group">
          <label for="subject">Subject</label>
          <textarea id="subject" v-model="form.subject" placeholder="What is your question?" style="height:200px" required></textarea>
        </div>
        
        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
  subject: ''
})

const submitForm = () => {
  console.log('Contact form submitted:', { ...form })
  
  // Reset form
  Object.keys(form).forEach(key => form[key] = '')
  
  // Show confirmation message
  alert('Your message has been sent. Thank you for contacting us!')
}
</script>

<style scoped>
.contact {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.container {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input[type=text],
input[type=email],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

.submit-btn {
  background-color: #2196F3;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0b7dda;
}
</style>