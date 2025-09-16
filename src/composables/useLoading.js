/**
 * Loading state management composable
 * Provides reusable loading functionality with multiple states support
 */

import { ref, computed } from 'vue'

/**
 * Composable for managing loading states
 * @param {boolean} initialState - Initial loading state
 */
export function useLoading(initialState = false) {
  const loadingStates = ref(new Map())
  const isLoading = ref(initialState)
  const loadingMessage = ref('')

  const startLoading = (message = 'Loading...', key = 'default') => {
    loadingStates.value.set(key, true)
    isLoading.value = true
    loadingMessage.value = message
  }

  const stopLoading = (key = 'default') => {
    loadingStates.value.delete(key)
    
    // If no more loading states, stop global loading
    if (loadingStates.value.size === 0) {
      isLoading.value = false
      loadingMessage.value = ''
    }
  }

  const setLoadingMessage = (message) => {
    loadingMessage.value = message
  }

  const isLoadingKey = (key) => {
    return loadingStates.value.has(key)
  }

  const hasAnyLoading = computed(() => {
    return loadingStates.value.size > 0
  })

  const clearAllLoading = () => {
    loadingStates.value.clear()
    isLoading.value = false
    loadingMessage.value = ''
  }

  return {
    isLoading,
    loadingMessage,
    hasAnyLoading,
    startLoading,
    stopLoading,
    setLoadingMessage,
    isLoadingKey,
    clearAllLoading
  }
}
