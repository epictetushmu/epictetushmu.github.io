<template>
  <div class="login page-container">
    <div class="login-header">
      <h1>Welcome Back</h1>
      <p class="login-description">
        Sign in to your Epictetus EE Team account to access exclusive resources and connect with fellow students.
      </p>
    </div>

    <div class="login-form-container">
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group" :class="{ 'error': errors.email?.length }">
          <label for="email">Email Address *</label>
          <input 
            type="email" 
            id="email" 
            :value="credentials.email"
            @input="handleFieldInput('email', $event)"
            @blur="handleFieldBlur('email')"
            placeholder="Enter your email address"
            required
            :disabled="isSubmitting"
            autocomplete="username"
            :aria-invalid="errors.email?.length ? 'true' : 'false'"
            :aria-describedby="errors.email?.length ? 'email-error' : null"
          >
          <div v-if="errors.email?.length" id="email-error" class="error-message" role="alert">
            {{ errors.email[0] }}
          </div>
        </div>
        
        <div class="form-group" :class="{ 'error': errors.password?.length }">
          <label for="password">Password *</label>
          <div class="password-input-group">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              :value="credentials.password"
              @input="handleFieldInput('password', $event)"
              @blur="handleFieldBlur('password')"
              placeholder="Enter your password"
              required
              :disabled="isSubmitting"
              autocomplete="current-password"
              :aria-invalid="errors.password?.length ? 'true' : 'false'"
              :aria-describedby="errors.password?.length ? 'password-error' : null"
            >
            <button 
              type="button" 
              class="password-toggle"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <div v-if="errors.password?.length" id="password-error" class="error-message" role="alert">
            {{ errors.password[0] }}
          </div>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input 
              type="checkbox" 
              v-model="credentials.rememberMe"
              :disabled="isSubmitting"
            >
            <span class="checkmark"></span>
            Remember me
          </label>
          
          <a href="#" @click.prevent="showForgotPassword = true" class="forgot-password">
            Forgot password?
          </a>
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary submit-btn"
          :disabled="!canSubmit || isSubmitting"
          :aria-describedby="!isValid ? 'form-errors' : null"
        >
          <LoadingSpinner v-if="isSubmitting" size="small" color="white" />
          {{ isSubmitting ? 'Signing in...' : 'Sign In' }}
        </button>

        <div class="signup-prompt">
          <p>Don't have an account? 
            <router-link to="/signup">Create one here</router-link>
          </p>
        </div>
      </form>
      
      <div 
        v-if="statusMessage.text" 
        class="status-message"
        :class="statusMessage.type"
        role="alert"
        aria-live="polite"
      >
        {{ statusMessage.text }}
      </div>
      
      <div 
        v-if="!isValid && Object.keys(errors).length > 0" 
        id="form-errors" 
        class="form-errors" 
        role="alert"
        aria-live="assertive"
      >
        <h4>Please fix the following errors:</h4>
        <ul>
          <li v-for="(fieldErrors, field) in errors" :key="field">
            {{ fieldErrors[0] }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="modal-overlay" @click="showForgotPassword = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Reset Password</h3>
          <button @click="showForgotPassword = false" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <p>Enter your email address and we'll send you instructions to reset your password.</p>
          <form @submit.prevent="handleForgotPassword" class="forgot-form">
            <div class="form-group">
              <label for="reset-email">Email Address</label>
              <input 
                type="email" 
                id="reset-email"
                v-model="resetEmail" 
                placeholder="your.email@example.com"
                required
              >
            </div>
            <button type="submit" class="btn btn-primary">
              Send Reset Instructions
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useForm } from '@/composables/useForm.js'
import { VALIDATION_RULES, REGEX_PATTERNS } from '@/utils/validation.js'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const router = useRouter()
const authStore = useAuthStore()

// Initialize form with comprehensive validation
const {
  formData: credentials,
  errors,
  isValid,
  isSubmitting,
  handleFieldInput,
  handleFieldBlur,
  handleSubmit,
  resetForm,
  showMessage
} = useForm(
  {
    email: '',
    password: '',
    rememberMe: false
  },
  {
    email: [
      { required: true, message: VALIDATION_RULES.REQUIRED },
      { pattern: REGEX_PATTERNS.EMAIL, message: VALIDATION_RULES.EMAIL }
    ],
    password: [
      { required: true, message: VALIDATION_RULES.REQUIRED }
    ]
  }
)

const showPassword = ref(false)
const showForgotPassword = ref(false)
const resetEmail = ref('')

onMounted(() => {
  document.title = 'Sign In - Epictetus EE Team'
})

const handleLogin = async () => {
  const result = await handleSubmit(async (formData) => {
    const success = await authStore.login({
      email: formData.email,
      password: formData.password
    })
    
    if (success) {
      showMessage('Login successful! Welcome back.', 'success')
      resetForm()
      
      // Redirect to admin panel
      setTimeout(() => {
        router.push('/admin')
      }, 1000)
    } else {
      throw new Error('Invalid email or password. Please try again.')
    }
  })
  
  if (!result.success) {
    showMessage(result.error?.message || 'Login failed. Please try again.', 'error')
  }
}

const handleForgotPassword = async () => {
  if (!resetEmail.value) return
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Password reset requested for:', resetEmail.value)
    showMessage(`Password reset instructions sent to ${resetEmail.value}`, 'success')
    
    showForgotPassword.value = false
    resetEmail.value = ''
    
  } catch (error) {
    console.error('Password reset failed:', error)
    showMessage('Failed to send reset instructions. Please try again.', 'error')
  }
}
</script>

<style scoped>
.login-header {
  text-align: center;
  margin-bottom: 3rem;
}

.login-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin: 0 auto;
}

.login-form-container {
  max-width: 400px;
  margin: 0 auto;
  background-color: var(--background-primary);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.password-input-group {
  position: relative;
}

.password-input-group input {
  padding-right: 3rem;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1.2rem;
  color: var(--text-secondary);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.password-toggle:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
}

.remember-me input[type="checkbox"] {
  margin-right: 0.5rem;
  width: auto;
}

.forgot-password {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.forgot-password:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
}

.submit-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.signup-prompt {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.signup-prompt p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

.signup-prompt a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.signup-prompt a:hover {
  text-decoration: underline;
}

.status-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  animation: slideIn 0.3s ease;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: var(--background-primary);
  border-radius: var(--border-radius);
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition);
}

.close-btn:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
}

.forgot-form .form-group {
  margin-bottom: 1rem;
}

.forgot-form button {
  width: 100%;
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
@media (max-width: 768px) {
  .login-form-container {
    padding: 1.5rem;
  }
  
  .login-header {
    margin-bottom: 2rem;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
}

/* Error message styling */
.error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-errors {
  background-color: #fdeaea;
  color: var(--error-color);
  border: 1px solid #f5c6cb;
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-top: 1rem;
}

.form-errors h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 600;
}

.form-errors ul {
  margin: 0;
  padding-left: 1.5rem;
}

.form-errors li {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

/* Focus states for accessibility */
.login-form input:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Custom checkbox styling */
.remember-me input[type="checkbox"] {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid var(--border-color);
  border-radius: 3px;
  background-color: var(--background-primary);
  cursor: pointer;
  position: relative;
  transition: var(--transition);
}

.remember-me input[type="checkbox"]:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.remember-me input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.remember-me input[type="checkbox"]:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
</style>