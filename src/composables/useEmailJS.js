// src/composables/useEmailJS.js
import { ref, reactive } from 'vue'
import { EMAIL_CONFIG } from '../config/email.js'

export function useEmailJS() {
  const isLoaded = ref(false)
  const isLoading = ref(false)

  const loadEmailJS = () => {
    return new Promise((resolve, reject) => {
      if (window.emailjs) {
        isLoaded.value = true
        resolve(window.emailjs)
        return
      }

      if (isLoading.value) {
        // If already loading, wait for it
        const checkLoaded = setInterval(() => {
          if (isLoaded.value) {
            clearInterval(checkLoaded)
            resolve(window.emailjs)
          }
        }, 100)
        return
      }

      isLoading.value = true
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
      
      script.onload = () => {
        if (window.emailjs) {
          window.emailjs.init(EMAIL_CONFIG.PUBLIC_KEY)
          isLoaded.value = true
          isLoading.value = false
          resolve(window.emailjs)
        } else {
          reject(new Error('EmailJS failed to load'))
        }
      }
      
      script.onerror = () => {
        isLoading.value = false
        reject(new Error('Failed to load EmailJS script'))
      }
      
      document.head.appendChild(script)
    })
  }

  const sendEmail = async (formElement) => {
    // Validate configuration
    if (EMAIL_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE' || 
        EMAIL_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID_HERE' || 
        EMAIL_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE') {
      throw new Error('Email service not configured. Please check EMAIL_SETUP.md for instructions.')
    }

    try {
      await loadEmailJS()
      
      const result = await window.emailjs.sendForm(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        formElement
      )
      
      return result
    } catch (error) {
      throw error
    }
  }

  return {
    isLoaded,
    isLoading,
    loadEmailJS,
    sendEmail,
    EMAIL_CONFIG
  }
}
