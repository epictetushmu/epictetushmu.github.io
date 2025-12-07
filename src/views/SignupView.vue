<template>
  <div class="signup page-container">
    <div class="signup-header">
      <h1>Join Epictetus EE Team</h1>
      <p class="signup-description">
        Create your account to access our digital library, participate in discussions, 
        and stay connected with the Electronic Engineering community at HMU.
      </p>
    </div>

    <div class="signup-form-container">
      <form @submit.prevent="submitForm" class="signup-form">
        <div class="form-row">
          <div class="form-group" :class="{ 'error': errors.firstName?.length }">
            <label for="fname">First Name *</label>
            <input 
              type="text" 
              id="fname"
              :value="form.firstName"
              @input="handleFieldInput('firstName', $event)"
              @blur="handleFieldBlur('firstName')"
              placeholder="Enter your first name" 
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
              :value="form.lastName"
              @input="handleFieldInput('lastName', $event)"
              @blur="handleFieldBlur('lastName')"
              placeholder="Enter your last name" 
              required
              :disabled="isSubmitting"
              :aria-invalid="errors.lastName?.length ? 'true' : 'false'"
            >
            <div v-if="errors.lastName?.length" class="error-message" role="alert">
              {{ errors.lastName[0] }}
            </div>
          </div>
        </div>

        <div class="form-group" :class="{ 'error': errors.regNumber?.length }">
          <label for="am">Registration Number *</label>
          <input 
            type="text" 
            id="am"
            :value="form.regNumber"
            @input="handleFieldInput('regNumber', $event)"
            @blur="handleFieldBlur('regNumber')"
            placeholder="Enter your HMU registration number" 
            required
            :disabled="isSubmitting"
            :aria-invalid="errors.regNumber?.length ? 'true' : 'false'"
          >
          <small class="field-help">Your student registration number at HMU</small>
          <div v-if="errors.regNumber?.length" class="error-message" role="alert">
            {{ errors.regNumber[0] }}
          </div>
        </div>

        <div class="form-group" :class="{ 'error': errors.email?.length }">
          <label for="email">Email Address *</label>
          <input 
            type="email" 
            id="email"
            :value="form.email"
            @input="handleFieldInput('email', $event)"
            @blur="handleFieldBlur('email')"
            placeholder="your.email@example.com" 
            required
            :disabled="isSubmitting"
            :aria-invalid="errors.email?.length ? 'true' : 'false'"
          >
          <small class="field-help">We'll use this to send you important updates</small>
          <div v-if="errors.email?.length" class="error-message" role="alert">
            {{ errors.email[0] }}
          </div>
        </div>

        <div class="form-group" :class="{ 'error': errors.username?.length }">
          <label for="username">Username *</label>
          <input 
            type="text" 
            id="username"
            :value="form.username"
            @input="handleFieldInput('username', $event)"
            @blur="handleFieldBlur('username')"
            placeholder="Choose a unique username" 
            required
            :disabled="isSubmitting"
            :aria-invalid="errors.username?.length ? 'true' : 'false'"
          >
          <div v-if="errors.username?.length" class="error-message" role="alert">
            {{ errors.username[0] }}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group" :class="{ 'error': errors.password?.length }">
            <label for="psw">Password *</label>
            <div class="password-input-group">
              <input 
                :type="showPassword ? 'text' : 'password'"
                id="psw"
                :value="form.password"
                @input="handleFieldInput('password', $event)"
                @blur="handleFieldBlur('password')"
                placeholder="Create a strong password" 
                required
                :disabled="isSubmitting"
                autocomplete="new-password"
                :aria-invalid="errors.password?.length ? 'true' : 'false'"
                :aria-describedby="errors.password?.length ? 'password-error' : null"
              >
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <svg
                  v-if="showPassword"
                  class="password-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  class="password-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 3l18 18" />
                  <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" />
                  <path d="M9.88 9.88a3 3 0 0 1 4.24 4.24" />
                  <path d="M21 12s-3.5 6-9 6c-1.6 0-3.1-.36-4.46-1" />
                  <path d="M3 12s1.6-3.4 5-5" />
                  <path d="M12 6c1.31 0 2.57.26 3.72.72" />
                </svg>
                <span class="sr-only">{{ showPassword ? 'Hide password' : 'Show password' }}</span>
              </button>
            </div>
            <div v-if="errors.password?.length" id="password-error" class="error-message" role="alert">
              {{ errors.password[0] }}
            </div>
          </div>
          
          <div class="form-group" :class="{ 'error': errors.passwordConfirm?.length }">
            <label for="psw_repeat">Confirm Password *</label>
            <div class="password-input-group">
              <input 
                :type="showPasswordConfirm ? 'text' : 'password'"
                id="psw_repeat"
                :value="form.passwordConfirm"
                @input="handleFieldInput('passwordConfirm', $event)"
                @blur="handleFieldBlur('passwordConfirm')"
                placeholder="Repeat your password" 
                required
                :disabled="isSubmitting"
                autocomplete="new-password"
                :aria-invalid="errors.passwordConfirm?.length ? 'true' : 'false'"
                :aria-describedby="errors.passwordConfirm?.length ? 'passwordConfirm-error' : null"
              >
              <button
                type="button"
                class="password-toggle"
                @click="showPasswordConfirm = !showPasswordConfirm"
                :aria-label="showPasswordConfirm ? 'Hide password' : 'Show password'"
              >
                <svg
                  v-if="showPasswordConfirm"
                  class="password-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  v-else
                  class="password-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 3l18 18" />
                  <path d="M10.58 10.58a3 3 0 0 0 4.24 4.24" />
                  <path d="M9.88 9.88a3 3 0 0 1 4.24 4.24" />
                  <path d="M21 12s-3.5 6-9 6c-1.6 0-3.1-.36-4.46-1" />
                  <path d="M3 12s1.6-3.4 5-5" />
                  <path d="M12 6c1.31 0 2.57.26 3.72.72" />
                </svg>
                <span class="sr-only">{{ showPasswordConfirm ? 'Hide password' : 'Show password' }}</span>
              </button>
            </div>
            <div v-if="errors.passwordConfirm?.length" id="passwordConfirm-error" class="error-message" role="alert">
              {{ errors.passwordConfirm[0] }}
            </div>
          </div>
        </div>

        <div class="form-group checkbox-group" :class="{ 'error': errors.agreeToTerms?.length }">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              :checked="form.agreeToTerms"
              @change="handleFieldInput('agreeToTerms', $event)"
              @blur="handleFieldBlur('agreeToTerms')"
              required
              :disabled="isSubmitting"
              :aria-invalid="errors.agreeToTerms?.length ? 'true' : 'false'"
              :aria-describedby="errors.agreeToTerms?.length ? 'agreeToTerms-error' : null"
            >
            <span class="checkmark"></span>
            I agree to the <a href="#" @click.prevent="showTerms = true">Terms of Service</a> 
            and <a href="#" @click.prevent="showPrivacy = true">Privacy Policy</a>
          </label>
          <div v-if="errors.agreeToTerms?.length" id="agreeToTerms-error" class="error-message" role="alert">
            {{ errors.agreeToTerms[0] }}
          </div>
        </div>

        <div class="form-actions">
          <button 
            type="submit" 
            class="btn btn-primary submit-btn"
            :disabled="!canSubmit || isSubmitting"
          >
            <LoadingSpinner v-if="isSubmitting" size="small" color="white" />
            {{ isSubmitting ? 'Creating Account...' : 'Create Account' }}
          </button>
          
          <p class="login-link">
            Already have an account? 
            <router-link to="/login">Sign in here</router-link>
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
    </div>

    <!-- Terms Modal -->
    <div v-if="showTerms" class="modal-overlay" @click="showTerms = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Terms of Service</h3>
          <button @click="showTerms = false" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <p>By using the Epictetus EE Team platform, you agree to:</p>
          <ul>
            <li>Use the platform for educational and collaborative purposes</li>
            <li>Respect other users and maintain professional conduct</li>
            <li>Not share copyrighted materials without permission</li>
            <li>Keep your account information secure and up to date</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Privacy Modal -->
    <div v-if="showPrivacy" class="modal-overlay" @click="showPrivacy = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Privacy Policy</h3>
          <button @click="showPrivacy = false" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <p>We respect your privacy and are committed to protecting your personal information:</p>
          <ul>
            <li>We only collect information necessary for account creation and service improvement</li>
            <li>Your data is stored securely and never shared with third parties</li>
            <li>You can request data deletion at any time by contacting us</li>
            <li>We use cookies only for essential website functionality</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '../composables/useForm.js'
import { useStatusMessage } from '../composables/useStatusMessage.js'
import { VALIDATION_RULES, REGEX_PATTERNS } from '../utils/validation.js'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'

const router = useRouter()
const { statusMessage, showMessage } = useStatusMessage()

// Initialize form with comprehensive validation
const {
  formData: form,
  errors,
  isValid,
  isSubmitting,
  canSubmit,
  handleFieldInput,
  handleFieldBlur,
  handleSubmit,
  resetForm
} = useForm(
  {
    firstName: '',
    lastName: '',
    regNumber: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    agreeToTerms: false
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
    regNumber: [
      { required: true, message: VALIDATION_RULES.REQUIRED },
      { minLength: 5, message: VALIDATION_RULES.MIN_LENGTH.replace('{min}', '5') }
    ],
    email: [
      { required: true, message: VALIDATION_RULES.REQUIRED },
      { pattern: REGEX_PATTERNS.EMAIL, message: VALIDATION_RULES.EMAIL }
    ],
    username: [
      { required: true, message: VALIDATION_RULES.REQUIRED },
      { minLength: 3, message: VALIDATION_RULES.MIN_LENGTH.replace('{min}', '3') }
    ],
    password: [
      { required: true, message: VALIDATION_RULES.REQUIRED },
      { minLength: 8, message: VALIDATION_RULES.MIN_LENGTH.replace('{min}', '8') }
    ],
    passwordConfirm: [
      { required: true, message: VALIDATION_RULES.REQUIRED },
      { 
        validator: (value, formData) => {
          if (value !== formData.password) {
            return VALIDATION_RULES.MATCH
          }
          return null
        }
      }
    ],
    agreeToTerms: [
      { 
        validator: (value) => {
          if (!value) {
            return 'You must agree to the terms and conditions'
          }
          return null
        }
      }
    ]
  }
)

const showTerms = ref(false)
const showPrivacy = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

onMounted(() => {
  document.title = 'Sign Up - Epictetus EE Team'
})

const submitForm = async () => {
  const result = await handleSubmit(async (formData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, this would call an authentication API
    console.log('Account creation attempt:', { 
      ...formData, 
      password: '***', 
      passwordConfirm: '***' 
    })
    
    showMessage('Account created successfully! You can now sign in with your credentials.', 'success')
    
    // Reset form
    resetForm()
    
    // Redirect to login after a delay
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  })
  
  if (!result.success) {
    showMessage(result.error?.message || 'Failed to create account. Please try again later.', 'error')
  }
}
</script>

<style scoped>
.signup-header {
  text-align: center;
  margin-bottom: 3rem;
}

.signup-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.signup-form-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--background-primary);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.signup-form {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  background-color: var(--background-primary);
  color: var(--text-primary);
  transition: var(--transition);
}

.form-group input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
  color: var(--text-secondary);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.password-toggle:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}

.password-icon {
  width: 1.25rem;
  height: 1.25rem;
  display: block;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.field-help {
  display: block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.error-text {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.error {
  border-color: var(--error-color) !important;
}

.checkbox-group {
  margin: 2rem 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.4;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 0.75rem;
  margin-top: 0.2rem;
  width: auto;
  flex-shrink: 0;
}

.checkbox-label a {
  color: var(--primary-color);
  text-decoration: underline;
}

.form-actions {
  text-align: center;
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

.login-link {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.login-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
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

.status-message.warning {
  background-color: #fef3c7;
  color: #92400e;
  border: 1px solid #f59e0b;
}

.status-message.info {
  background-color: #dbeafe;
  color: #1e40af;
  border: 1px solid #3b82f6;
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
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
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

.modal-body ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.modal-body li {
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
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
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .signup-form-container {
    padding: 1.5rem;
  }
  
  .signup-header {
    margin-bottom: 2rem;
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

/* Focus states for accessibility */
.signup-form input:focus,
.signup-form textarea:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Custom checkbox styling */
.checkbox-label input[type="checkbox"] {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-color);
  border-radius: 3px;
  background-color: var(--background-primary);
  cursor: pointer;
  position: relative;
  transition: var(--transition);
}

.checkbox-label input[type="checkbox"]:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkbox-label input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.checkbox-label input[type="checkbox"]:focus {
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
  border-color: var(--error-color) !important;
}

.form-group.error input:focus,
.form-group.error textarea:focus {
  outline-color: var(--error-color);
}
</style>