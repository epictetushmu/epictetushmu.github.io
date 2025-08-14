<template>
  <component 
    :is="tag"
    :class="buttonClasses"
    :disabled="loading || disabled"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <span v-if="icon && !loading" class="icon">{{ icon }}</span>
    <span class="button-text"><slot /></span>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'outline', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => [
  'app-button',
  `app-button--${props.variant}`,
  `app-button--${props.size}`,
  {
    'app-button--loading': props.loading,
    'app-button--disabled': props.disabled,
    'app-button--full-width': props.fullWidth,
    'app-button--with-icon': props.icon
  }
])

const handleClick = (event) => {
  if (!props.loading && !props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.app-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: var(--border-radius);
  border: 2px solid transparent;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  line-height: 1;
  min-height: 44px;
  overflow: hidden;
}

.app-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.app-button:hover:not(.app-button--disabled):not(.app-button--loading)::before {
  left: 100%;
}

/* Variants */
.app-button--primary {
  background-color: var(--primary-color);
  color: white;
}

.app-button--primary:hover:not(.app-button--disabled):not(.app-button--loading) {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.app-button--secondary {
  background-color: var(--secondary-color);
  color: white;
}

.app-button--secondary:hover:not(.app-button--disabled):not(.app-button--loading) {
  background-color: #37474f;
  transform: translateY(-1px);
}

.app-button--outline {
  background-color: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.app-button--outline:hover:not(.app-button--disabled):not(.app-button--loading) {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-1px);
}

.app-button--text {
  background-color: transparent;
  color: var(--primary-color);
  padding: 0.5rem;
}

.app-button--text:hover:not(.app-button--disabled):not(.app-button--loading) {
  background-color: rgba(33, 150, 243, 0.1);
}

/* Sizes */
.app-button--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  min-height: 36px;
}

.app-button--medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  min-height: 44px;
}

.app-button--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  min-height: 52px;
}

/* States */
.app-button--loading,
.app-button--disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none !important;
}

.app-button--full-width {
  width: 100%;
}

/* Icon and text spacing */
.icon {
  font-size: 1.2em;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Focus states */
.app-button:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
</style>
