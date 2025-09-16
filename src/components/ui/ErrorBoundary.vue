<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-content">
      <div class="error-icon">⚠️</div>
      <h2 class="error-title">Something went wrong</h2>
      <p class="error-message">
        {{ errorMessage }}
      </p>
      
      <div v-if="showDetails" class="error-details">
        <details>
          <summary>Error Details</summary>
          <pre class="error-stack">{{ errorInfo?.stack }}</pre>
        </details>
      </div>
      
      <div class="error-actions">
        <button @click="retry" class="btn btn-primary">
          Try Again
        </button>
        <button @click="goHome" class="btn btn-secondary">
          Go Home
        </button>
        <button v-if="showDetails" @click="reportError" class="btn btn-outline">
          Report Issue
        </button>
      </div>
    </div>
  </div>
  
  <slot v-else />
</template>

<script setup>
import { ref, onMounted, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import { errorHandler, ERROR_TYPES } from '@/utils/errorHandler.js'

const props = defineProps({
  fallback: {
    type: String,
    default: 'An unexpected error occurred. Please try again.'
  },
  showDetails: {
    type: Boolean,
    default: false
  },
  onError: {
    type: Function,
    default: null
  }
})

const emit = defineEmits(['error', 'retry'])

const router = useRouter()
const hasError = ref(false)
const errorInfo = ref(null)
const errorMessage = ref(props.fallback)

/**
 * Handle error and show error boundary
 * @param {Error} error - The error that occurred
 * @param {Object} info - Additional error information
 */
const handleError = (error, info = {}) => {
  hasError.value = true
  errorInfo.value = { error, info, timestamp: new Date().toISOString() }
  
  // Use error handler to process the error
  const processedError = errorHandler.handle(error, {
    component: 'ErrorBoundary',
    ...info
  })
  
  errorMessage.value = processedError.message
  
  // Emit error event
  emit('error', { error, info, processedError })
  
  // Call custom error handler if provided
  if (props.onError) {
    props.onError(error, info)
  }
}

/**
 * Retry the operation
 */
const retry = () => {
  hasError.value = false
  errorInfo.value = null
  errorMessage.value = props.fallback
  emit('retry')
}

/**
 * Navigate to home page
 */
const goHome = () => {
  router.push('/')
  retry()
}

/**
 * Report error (placeholder for error reporting service)
 */
const reportError = () => {
  if (errorInfo.value) {
    // In a real app, this would send to an error reporting service
    console.log('Error reported:', errorInfo.value)
    
    // Show feedback to user
    alert('Thank you for reporting this issue. We will look into it.')
  }
}

// Capture errors from child components
onErrorCaptured((error, instance, info) => {
  handleError(error, {
    component: instance?.$options.name || 'Unknown',
    info
  })
  return false // Prevent error from propagating further
})

// Handle unhandled promise rejections
onMounted(() => {
  const handleUnhandledRejection = (event) => {
    handleError(new Error(event.reason), {
      type: 'unhandled_promise_rejection'
    })
  }
  
  window.addEventListener('unhandledrejection', handleUnhandledRejection)
  
  // Cleanup
  return () => {
    window.removeEventListener('unhandledrejection', handleUnhandledRejection)
  }
})

// Expose methods for programmatic error handling
defineExpose({
  handleError,
  retry,
  hasError: () => hasError.value
})
</script>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  background-color: var(--background-secondary);
}

.error-content {
  text-align: center;
  max-width: 500px;
  background-color: var(--background-primary);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-title {
  color: var(--error-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.error-message {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.error-details {
  margin-bottom: 1.5rem;
  text-align: left;
}

.error-details details {
  background-color: var(--background-secondary);
  padding: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.error-details summary {
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.error-stack {
  background-color: var(--background-primary);
  padding: 1rem;
  border-radius: var(--border-radius);
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: var(--text-secondary);
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 0.5rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.error-actions .btn {
  min-width: 120px;
}

@media (max-width: 768px) {
  .error-boundary {
    padding: 1rem;
    min-height: 300px;
  }
  
  .error-content {
    padding: 1.5rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .error-actions .btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>

