/**
 * Form management composable
 * Provides reactive form state, validation, and submission handling
 */

import { ref, reactive, computed, watch } from 'vue'
import { formValidator, ValidationResult } from '../utils/validation.js'
import { errorHandler, ERROR_TYPES } from '../utils/errorHandler.js'

/**
 * Form management composable
 * @param {Object} initialData - Initial form data
 * @param {Object} validationRules - Validation rules for form fields
 * @param {Object} options - Additional options
 * @returns {Object} - Form management utilities
 */
export function useForm(initialData = {}, validationRules = {}, options = {}) {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    debounceMs = 300
  } = options

  // Form state
  const formData = reactive({ ...initialData })
  const errors = reactive({})
  const touched = reactive({})
  const isSubmitting = ref(false)
  const isValid = ref(true)
  const isDirty = ref(false)

  // Setup validation rules
  Object.entries(validationRules).forEach(([field, rules]) => {
    formValidator.addRule(field, rules)
  })

  // Debounced validation
  let validationTimeout = null
  const validateFieldDebounced = (fieldName) => {
    if (validationTimeout) {
      clearTimeout(validationTimeout)
    }
    validationTimeout = setTimeout(() => {
      validateField(fieldName)
    }, debounceMs)
  }

  /**
   * Validate a single field
   * @param {string} fieldName - Name of the field to validate
   * @returns {boolean} - Whether the field is valid
   */
  const validateField = (fieldName) => {
    const result = formValidator.validateField(fieldName, formData[fieldName])
    errors[fieldName] = result.getErrorsForField(fieldName).map(err => err.message)
    return result.isValid
  }

  /**
   * Validate all fields
   * @returns {boolean} - Whether the form is valid
   */
  const validateForm = () => {
    const result = formValidator.validateForm(formData)
    
    // Clear all errors first
    Object.keys(errors).forEach(key => delete errors[key])
    
    // Set new errors
    result.errors.forEach(error => {
      if (!errors[error.field]) {
        errors[error.field] = []
      }
      errors[error.field].push(error.message)
    })
    
    isValid.value = result.isValid
    return result.isValid
  }

  /**
   * Get error message for a field
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null
   */
  const getFieldError = (fieldName) => {
    return errors[fieldName]?.[0] || null
  }

  /**
   * Check if a field has errors
   * @param {string} fieldName - Name of the field
   * @returns {boolean} - Whether the field has errors
   */
  const hasFieldError = (fieldName) => {
    return errors[fieldName] && errors[fieldName].length > 0
  }

  /**
   * Check if a field has been touched
   * @param {string} fieldName - Name of the field
   * @returns {boolean} - Whether the field has been touched
   */
  const isFieldTouched = (fieldName) => {
    return touched[fieldName] || false
  }

  /**
   * Mark a field as touched
   * @param {string} fieldName - Name of the field
   */
  const touchField = (fieldName) => {
    touched[fieldName] = true
  }

  /**
   * Clear errors for a field
   * @param {string} fieldName - Name of the field
   */
  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      delete errors[fieldName]
    }
  }

  /**
   * Clear all errors
   */
  const clearErrors = () => {
    Object.keys(errors).forEach(key => delete errors[key])
    isValid.value = true
  }

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    Object.keys(formData).forEach(key => {
      formData[key] = initialData[key] || ''
    })
    clearErrors()
    Object.keys(touched).forEach(key => delete touched[key])
    isDirty.value = false
  }

  /**
   * Update form data
   * @param {Object} newData - New form data
   */
  const updateFormData = (newData) => {
    Object.assign(formData, newData)
    isDirty.value = true
  }

  /**
   * Set field value
   * @param {string} fieldName - Name of the field
   * @param {any} value - New value
   */
  const setFieldValue = (fieldName, value) => {
    formData[fieldName] = value
    isDirty.value = true
    
    if (validateOnChange) {
      validateFieldDebounced(fieldName)
    }
  }

  /**
   * Handle field input event
   * @param {string} fieldName - Name of the field
   * @param {Event} event - Input event
   */
  const handleFieldInput = (fieldName, event) => {
    setFieldValue(fieldName, event.target.value)
  }

  /**
   * Handle field blur event
   * @param {string} fieldName - Name of the field
   */
  const handleFieldBlur = (fieldName) => {
    touchField(fieldName)
    if (validateOnBlur) {
      validateField(fieldName)
    }
  }

  /**
   * Handle form submission
   * @param {Function} submitFn - Submission function
   * @returns {Promise} - Submission result
   */
  const handleSubmit = async (submitFn) => {
    if (isSubmitting.value) return

    // Mark all fields as touched
    Object.keys(formData).forEach(field => {
      touched[field] = true
    })

    // Validate form
    if (!validateForm()) {
      return { success: false, errors: errors }
    }

    isSubmitting.value = true
    clearErrors()

    try {
      const result = await submitFn(formData)
      return { success: true, data: result }
    } catch (error) {
      const errorInfo = errorHandler.handle(error, { formData })
      return { success: false, error: errorInfo }
    } finally {
      isSubmitting.value = false
    }
  }

  // Watch for form data changes to update dirty state
  watch(formData, (newData, oldData) => {
    const hasChanges = Object.keys(newData).some(key => 
      newData[key] !== (initialData[key] || '')
    )
    isDirty.value = hasChanges
  }, { deep: true })

  // Computed properties
  const canSubmit = computed(() => {
    return isValid.value && !isSubmitting.value && isDirty.value
  })

  const hasErrors = computed(() => {
    return Object.keys(errors).length > 0
  })

  const errorCount = computed(() => {
    return Object.values(errors).reduce((total, fieldErrors) => 
      total + (fieldErrors?.length || 0), 0
    )
  })

  return {
    // State
    formData,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    
    // Computed
    canSubmit,
    hasErrors,
    errorCount,
    
    // Methods
    validateField,
    validateForm,
    getFieldError,
    hasFieldError,
    isFieldTouched,
    touchField,
    clearFieldError,
    clearErrors,
    resetForm,
    updateFormData,
    setFieldValue,
    handleFieldInput,
    handleFieldBlur,
    handleSubmit
  }
}

/**
 * Field-specific composable for individual form fields
 * @param {string} fieldName - Name of the field
 * @param {any} initialValue - Initial value
 * @param {Array} validationRules - Validation rules for the field
 * @returns {Object} - Field management utilities
 */
export function useField(fieldName, initialValue = '', validationRules = []) {
  const value = ref(initialValue)
  const error = ref(null)
  const touched = ref(false)
  const isValid = ref(true)

  // Setup validation rules for this field
  if (validationRules.length > 0) {
    formValidator.addRule(fieldName, validationRules)
  }

  /**
   * Validate the field
   * @returns {boolean} - Whether the field is valid
   */
  const validate = () => {
    const result = formValidator.validateField(fieldName, value.value)
    error.value = result.getFirstErrorForField(fieldName)
    isValid.value = result.isValid
    return result.isValid
  }

  /**
   * Handle input event
   * @param {Event} event - Input event
   */
  const handleInput = (event) => {
    value.value = event.target.value
    validate()
  }

  /**
   * Handle blur event
   * @param {Event} event - Blur event
   */
  const handleBlur = (event) => {
    touched.value = true
    validate()
  }

  /**
   * Clear error
   */
  const clearError = () => {
    error.value = null
    isValid.value = true
  }

  /**
   * Reset field
   */
  const reset = () => {
    value.value = initialValue
    error.value = null
    touched.value = false
    isValid.value = true
  }

  return {
    value,
    error,
    touched,
    isValid,
    validate,
    handleInput,
    handleBlur,
    clearError,
    reset
  }
}

