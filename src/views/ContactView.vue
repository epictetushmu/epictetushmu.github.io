<template>
  <div class="contact page-container">
    <div class="contact-header">
      <h1>Get in Touch</h1>
      <p class="contact-description">
        Have questions about our projects or want to join our team? 
        We'd love to hear from you!
      </p>
    </div>

    <div class="contact-grid">
      <div class="contact-info">
        <h2>Contact Information</h2>
        <div class="info-item">
          <h3>📧 Email</h3>
          <p>epictetus.ee@hmu.gr</p>
        </div>
        <div class="info-item">
          <h3>🏫 Department</h3>
          <p>Electronic Engineering<br>Hellenic Mediterranean University</p>
        </div>
        <div class="info-item">
          <h3>🌐 Website</h3>
          <p><a href="https://ee.hmu.gr" target="_blank" rel="noopener">ee.hmu.gr</a></p>
        </div>
      </div>

      <div class="contact-form-section">
        <h2>Send us a Message</h2>
        <form @submit.prevent="submitForm" ref="contactForm" class="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label for="fname">First Name *</label>
              <input 
                type="text" 
                id="fname" 
                name="from_name"
                v-model="form.firstName" 
                placeholder="Your first name" 
                required
                :disabled="isSubmitting"
              >
            </div>
            
            <div class="form-group">
              <label for="lname">Last Name *</label>
              <input 
                type="text" 
                id="lname" 
                name="last_name"
                v-model="form.lastName" 
                placeholder="Your last name" 
                required
                :disabled="isSubmitting"
              >
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address *</label>
            <input 
              type="email" 
              id="email" 
              name="from_email"
              v-model="form.email" 
              placeholder="your.email@example.com" 
              required
              :disabled="isSubmitting"
            >
          </div>
          
          <div class="form-group">
            <label for="subject">Message *</label>
            <textarea 
              id="subject" 
              name="message"
              v-model="form.subject" 
              placeholder="Tell us how we can help you..."
              rows="6"
              required
              :disabled="isSubmitting"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary submit-btn"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="loading-spinner"></span>
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
        
        <div 
          v-if="statusMessage.text" 
          class="status-message"
          :class="statusMessage.type"
          role="alert"
        >
          {{ statusMessage.text }}
        </div>
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

onMounted(() => {
  document.title = 'Contact Us - Epictetus EE Team'
})

const showMessage = (text, type) => {
  statusMessage.text = text
  statusMessage.type = type
  
  // Clear message after 8 seconds
  setTimeout(() => {
    statusMessage.text = ''
    statusMessage.type = ''
  }, 8000)
  
  // Scroll to message
  setTimeout(() => {
    const messageElement = document.querySelector('.status-message')
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, 100)
}

const resetForm = () => {
  Object.keys(form).forEach(key => form[key] = '')
}

const submitForm = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  statusMessage.text = ''
  
  try {
    // Send email using EmailJS composable
    const result = await sendEmail(contactForm.value)
    
    console.log('Email sent successfully:', result.status, result.text)
    showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success')
    
    // Reset form after successful submission
    resetForm()
    
  } catch (error) {
    console.error('Failed to send email:', error)
    
    let errorMessage = 'Sorry, there was an error sending your message. Please try again later.'
    
    if (error.message.includes('not configured')) {
      errorMessage = 'Email service is currently unavailable. Please try contacting us directly at epictetus.ee@hmu.gr'
    } else if (error.message.includes('network')) {
      errorMessage = 'Network error. Please check your connection and try again.'
    }
    
    showMessage(errorMessage, 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>
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