// src/composables/useLoading.js
import { ref } from 'vue'

/**
 * Composable for managing loading states
 * @param {boolean} initialState - Initial loading state
 */
export function useLoading(initialState = false) {
  const isLoading = ref(initialState)
  const loadingMessage = ref('')

  const startLoading = (message = 'Loading...') => {
    isLoading.value = true
    loadingMessage.value = message
  }

  const stopLoading = () => {
    isLoading.value = false
    loadingMessage.value = ''
  }

  const setLoadingMessage = (message) => {
    loadingMessage.value = message
  }

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    setLoadingMessage
  }
}
