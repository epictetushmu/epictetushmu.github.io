/**
 * Simple validation composable for basic form validation needs
 */

import { reactive, computed } from 'vue'

export function useSimpleValidation(initialRules = {}) {
  const errors = reactive({})
  const touched = reactive({})

  const validateField = (fieldName, value, rules) => {
    delete errors[fieldName]

    if (!rules) return true

    for (const rule of rules) {
      const error = rule(value)
      if (error) {
        errors[fieldName] = error
        return false
      }
    }
    return true
  }

  const validateForm = (formData, validationRules) => {
    // Clear all errors
    Object.keys(errors).forEach(key => delete errors[key])

    let isValid = true
    Object.entries(validationRules).forEach(([field, rules]) => {
      const fieldValid = validateField(field, formData[field], rules)
      if (!fieldValid) isValid = false
    })

    return isValid
  }

  const markTouched = (fieldName) => {
    touched[fieldName] = true
  }

  const hasError = (fieldName) => {
    return !!errors[fieldName]
  }

  const getError = (fieldName) => {
    return errors[fieldName] || null
  }

  const clearError = (fieldName) => {
    delete errors[fieldName]
  }

  const clearAllErrors = () => {
    Object.keys(errors).forEach(key => delete errors[key])
  }

  const isFormValid = computed(() => {
    return Object.keys(errors).length === 0
  })

  return {
    errors,
    touched,
    validateField,
    validateForm,
    markTouched,
    hasError,
    getError,
    clearError,
    clearAllErrors,
    isFormValid
  }
}
