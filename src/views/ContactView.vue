<template>
  <div class="contact">
    <h1>Contact Form</h1>
    <div class="container">
      <form @submit.prevent="submitForm" ref="contactForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="from_email"
            v-model="form.email" 
            placeholder="Your email.." 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="fname">First Name</label>
          <input 
            type="text" 
            id="fname" 
            name="from_name"
            v-model="form.firstName" 
            placeholder="Your name.." 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="lname">Last Name</label>
          <input 
            type="text" 
            id="lname" 
            name="last_name"
            v-model="form.lastName" 
            placeholder="Your last name.." 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="subject">Subject</label>
          <textarea 
            id="subject" 
            name="message"
            v-model="form.subject" 
            placeholder="What is your question?" 
            style="height:200px" 
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          class="submit-btn"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Sending...' : 'Submit' }}
        </button>
      </form>
      
      <div 
        v-if="statusMessage.text" 
        class="status-message"
        :class="statusMessage.type"
      >
        {{ statusMessage.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useEmailJS } from '../composables/useEmailJS.js'

const { sendEmail } = useEmailJS()

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
  subject: ''
})

const isSubmitting = ref(false)
const statusMessage = reactive({
  text: '',
  type: ''
})
const contactForm = ref(null)

const showMessage = (text, type) => {
  statusMessage.text = text
  statusMessage.type = type
  
  // Clear message after 5 seconds
  setTimeout(() => {
    statusMessage.text = ''
    statusMessage.type = ''
  }, 5000)
}

const submitForm = async () => {
  isSubmitting.value = true
  statusMessage.text = ''
  
  try {
    // Send email using EmailJS composable
    const result = await sendEmail(contactForm.value)
    
    console.log('SUCCESS!', result.status, result.text)
    showMessage('Message sent successfully! We will get back to you soon.', 'success')
    
    // Reset form
    Object.keys(form).forEach(key => form[key] = '')
    
  } catch (error) {
    console.log('FAILED...', error)
    showMessage(error.message || 'Failed to send message. Please try again later.', 'error')
  } finally {
    isSubmitting.value = false
  }
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
  font-weight: bold;
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
  font-family: inherit;
}

input[type=text]:focus,
input[type=email]:focus,
textarea:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.3);
}

.submit-btn {
  background-color: #2196F3;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0b7dda;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.status-message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>