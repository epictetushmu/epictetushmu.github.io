/**
 * Status message composable
 * Provides reusable status message functionality with auto-clear and scroll
 */

import { reactive } from 'vue'

export function useStatusMessage() {
  const statusMessage = reactive({
    text: '',
    type: ''
  })

  const showMessage = (text, type = 'info', duration = 8000) => {
    statusMessage.text = text
    statusMessage.type = type
    
    // Clear message after specified duration
    if (duration > 0) {
      setTimeout(() => {
        clearMessage()
      }, duration)
    }
    
    // Scroll to message
    setTimeout(() => {
      const messageElement = document.querySelector('.status-message')
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }, 100)
  }

  const clearMessage = () => {
    statusMessage.text = ''
    statusMessage.type = ''
  }

  const showSuccess = (text, duration = 8000) => showMessage(text, 'success', duration)
  const showError = (text, duration = 8000) => showMessage(text, 'error', duration)
  const showWarning = (text, duration = 8000) => showMessage(text, 'warning', duration)
  const showInfo = (text, duration = 8000) => showMessage(text, 'info', duration)

  return {
    statusMessage,
    showMessage,
    clearMessage,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}
