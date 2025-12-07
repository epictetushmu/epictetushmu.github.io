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
            <div class="form-group" :class="{ 'error': errors.firstName?.length }">
              <label for="fname">First Name *</label>
              <input 
                type="text" 
                id="fname" 
                name="from_name"
                :value="form.firstName"
                @input="handleFieldInput('firstName', $event)"
                @blur="handleFieldBlur('firstName')"
                placeholder="Your first name" 
                required
                :disabled="isSubmitting"
                :aria-invalid="errors.firstName?.length ? 'true' : 'false'"
              >
              <div v-if="errors.firstName?.length" class="error-message" role="alert">
                {{ errors.firstName[0] }}
              </div>
            </div>
            
            <div class="form-group" :class="{ 'error': errors.lastName?.length }">
              <label for="lname">Last Name *</label>
              <input 
                type="text" 
                id="lname" 
                name="last_name"
                :value="form.lastName"
                @input="handleFieldInput('lastName', $event)"
                @blur="handleFieldBlur('lastName')"
                placeholder="Your last name" 
                required
                :disabled="isSubmitting"
                :aria-invalid="errors.lastName?.length ? 'true' : 'false'"
              >
              <div v-if="errors.lastName?.length" class="error-message" role="alert">
                {{ errors.lastName[0] }}
              </div>
            </div>
          </div>

          <div class="form-group" :class="{ 'error': errors.email?.length }">
            <label for="email">Email Address *</label>
            <input 
              type="email" 
              id="email" 
              name="from_email"
              :value="form.email"
              @input="handleFieldInput('email', $event)"
              @blur="handleFieldBlur('email')"
              placeholder="your.email@example.com" 
              required
              :disabled="isSubmitting"
              :aria-invalid="errors.email?.length ? 'true' : 'false'"
            >
            <div v-if="errors.email?.length" class="error-message" role="alert">
              {{ errors.email[0] }}
            </div>
          </div>
          
          <div class="form-group" :class="{ 'error': errors.subject?.length }">
            <label for="subject">Message *</label>
            <textarea 
              id="subject" 
              name="message"
              :value="form.subject"
              @input="handleFieldInput('subject', $event)"
              @blur="handleFieldBlur('subject')"
              placeholder="Tell us how we can help you..."
              rows="6"
              required
              :disabled="isSubmitting"
              :aria-invalid="errors.subject?.length ? 'true' : 'false'"
            ></textarea>
            <div v-if="errors.subject?.length" class="error-message" role="alert">
              {{ errors.subject[0] }}
            </div>
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary submit-btn"
            :disabled="isSubmitting"
          >
            <LoadingSpinner v-if="isSubmitting" size="small" color="white" />
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
import { ref, onMounted } from 'vue'
import { useEmailJS } from '../composables/useEmailJS.js'
import { useForm } from '../composables/useForm.js'
import { useStatusMessage } from '../composables/useStatusMessage.js'
import { VALIDATION_RULES, REGEX_PATTERNS } from '../utils/validation.js'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const { sendEmail } = useEmailJS()
const { statusMessage, showMessage } = useStatusMessage()

// Initialize form with comprehensive validation
const {
  formData: form,
  errors,
  isValid,
  isSubmitting,
  handleFieldInput,
  handleFieldBlur,
  handleSubmit,
  resetForm
} = useForm(
  {
    email: '',
    firstName: '',
    lastName: '',
    subject: ''
  },
  {
    firstName: [
      { required: true, message: VALIDATION_RULES.REQUIRED },
      { minLength: 2, message: VALIDATION_RULES.MIN_LENGTH.replace('{min}', '2') }
    ],
    lastName: [
      { required: true, message: VALIDATION_RULES.REQUIRED },
      { minLength: 2, message: VALIDATION_RULES.MIN_LENGTH.replace('{min}', '2') }
    ],
    email: [
      { required: true, message: VALIDATION_RULES.REQUIRED },
      { pattern: REGEX_PATTERNS.EMAIL, message: VALIDATION_RULES.EMAIL }
    ],
    subject: [
      { required: true, message: VALIDATION_RULES.REQUIRED },
      { minLength: 10, message: VALIDATION_RULES.MIN_LENGTH.replace('{min}', '10') }
    ]
  }
)

const contactForm = ref(null)

onMounted(() => {
  document.title = 'Contact Us - Epictetus EE Team'
})

const submitForm = async () => {
  const result = await handleSubmit(async (formData) => {
    // Send email using EmailJS composable
    const emailResult = await sendEmail(contactForm.value)
    
    console.log('Email sent successfully:', emailResult.status, emailResult.text)
    showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success')
    
    // Reset form after successful submission
    resetForm()
  })
  
  if (!result.success) {
    let errorMessage = 'Sorry, there was an error sending your message. Please try again later.'
    
    if (result.error?.message.includes('not configured')) {
      errorMessage = 'Email service is currently unavailable. Please try contacting us directly at epictetus.ee@hmu.gr'
    } else if (result.error?.message.includes('network')) {
      errorMessage = 'Network error. Please check your connection and try again.'
    }
    
    showMessage(errorMessage, 'error')
  }
}
</script>

<style scoped>
.contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: start;
}

.contact-info {
  background-color: var(--background-primary);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  height: fit-content;
}

.contact-info h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.info-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.info-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.info-item h3 {
  color: var(--primary-color);
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.info-item p {
  margin: 0;
  color: var(--text-secondary);
}

.info-item a {
  color: var(--primary-color);
  text-decoration: none;
}

.info-item a:hover {
  text-decoration: underline;
}

.contact-form-section {
  background-color: var(--background-primary);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.contact-form-section h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.contact-form {
  margin-bottom: 1.5rem;
}

.contact-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  background-color: var(--background-primary);
  color: var(--text-primary);
  transition: var(--transition);
}

.contact-form textarea {
  resize: vertical;
  min-height: 140px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
}

.submit-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.status-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  animation: slideIn 0.3s ease;
}

.status-message.success {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}

.status-message.error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

.status-message.info {
  background-color: #dbeafe;
  color: #1e40af;
  border: 1px solid #3b82f6;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
  
  .contact-info,
  .contact-form-section {
    padding: 1.5rem;
  }
  
  .contact-header {
    margin-bottom: 2rem;
  }
}

/* Focus states for accessibility */
.contact-form input:focus,
.contact-form textarea:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Error message styling */
.error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-group.error input,
.form-group.error textarea {
  border-color: var(--error-color);
}
</style>