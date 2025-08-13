<!-- src/components/ErrorBoundary.vue -->
<template>
  <div class="error-boundary">
    <div class="error-content">
      <h2>Oops! Something went wrong</h2>
      <p class="error-message">{{ errorMessage }}</p>
      <div class="error-actions">
        <button @click="retry" class="btn btn-primary">Try Again</button>
        <router-link to="/" class="btn btn-secondary">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  error: {
    type: Error,
    default: null
  }
})

const emit = defineEmits(['retry'])

const errorMessage = ref(
  props.error?.message || 'An unexpected error occurred. Please try again.'
)

const retry = () => {
  emit('retry')
}
</script>

<style scoped>
.error-boundary {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-content h2 {
  color: var(--error-color);
  margin-bottom: 1rem;
}

.error-message {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.error-actions .btn {
  text-decoration: none;
}
</style>
