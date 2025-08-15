<template>
  <div class="form-field">
    <label v-if="label" :for="inputId" class="field-label">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    
    <div class="input-wrapper" :class="{ 'has-icon': icon, 'has-error': error }">
      <span v-if="icon" class="input-icon">{{ icon }}</span>
      
      <component
        :is="inputComponent"
        :id="inputId"
        v-model="modelValue"
        :class="inputClasses"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        v-bind="$attrs"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
      />
      
      <button
        v-if="type === 'password' && showPasswordToggle"
        type="button"
        class="password-toggle"
        @click="togglePasswordVisibility"
      >
        {{ showPassword ? '👁️' : '🙈' }}
      </button>
    </div>
    
    <p v-if="helpText && !error" class="help-text">{{ helpText }}</p>
    <p v-if="error" class="error-text">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  helpText: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  showPasswordToggle: {
    type: Boolean,
    default: true
  },
  rows: {
    type: Number,
    default: 4
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'input'])

const showPassword = ref(false)
const isFocused = ref(false)

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputComponent = computed(() => {
  return props.type === 'textarea' ? 'textarea' : 'input'
})

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type === 'textarea' ? undefined : props.type
})

const inputClasses = computed(() => [
  'form-input',
  {
    'form-input--error': props.error,
    'form-input--focused': isFocused.value,
    'form-input--disabled': props.disabled,
    'form-input--with-icon': props.icon,
    'form-input--with-toggle': props.type === 'password' && props.showPasswordToggle
  }
])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleInput = (event) => {
  emit('input', event)
}

// Watch for external changes to add validation classes
watch(() => props.error, (newError) => {
  if (newError) {
    // Could add shake animation here
  }
})
</script>

<style scoped>
.form-field {
  margin-bottom: 1.5rem;
}

.field-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.required-indicator {
  color: var(--error-color);
  margin-left: 0.25rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-family: inherit;
  transition: var(--transition);
  background-color: var(--background-primary);
  color: var(--text-primary);
}

.form-input--with-icon {
  padding-left: 2.5rem;
}

.form-input--with-toggle {
  padding-right: 2.5rem;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.form-input--error {
  border-color: var(--error-color);
  animation: shake 0.5s ease;
}

.form-input--disabled {
  background-color: var(--background-secondary);
  cursor: not-allowed;
  opacity: 0.6;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
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

.help-text {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.error-text {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--error-color);
  font-weight: 500;
}

/* Textarea specific styles */
textarea.form-input {
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
</style>
