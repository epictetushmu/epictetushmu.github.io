<template>
  <span 
    class="loading-spinner" 
    :class="spinnerClasses"
    :aria-label="label"
    role="status"
  ></span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  color: {
    type: String,
    default: 'primary'
  },
  label: {
    type: String,
    default: 'Loading...'
  }
})

const spinnerClasses = computed(() => [
  'loading-spinner',
  `loading-spinner--${props.size}`,
  `loading-spinner--${props.color}`
])
</script>

<style scoped>
.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Size variants */
.loading-spinner--small {
  width: 0.75rem;
  height: 0.75rem;
  border-width: 1.5px;
}

.loading-spinner--medium {
  width: 1rem;
  height: 1rem;
  border-width: 2px;
}

.loading-spinner--large {
  width: 1.5rem;
  height: 1.5rem;
  border-width: 3px;
}

/* Color variants */
.loading-spinner--primary {
  border-top-color: var(--primary-color);
}

.loading-spinner--white {
  border-top-color: white;
}

.loading-spinner--secondary {
  border-top-color: var(--text-secondary);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation: none;
    border: 2px solid var(--primary-color);
  }
}
</style>
