/**
 * Simple validation helper functions
 */

export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`
  }
  return null
}

export const validateEmail = (email) => {
  if (!email) return null // Let required handle empty values
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  return null
}

export const validateMinLength = (value, min, fieldName = 'Field') => {
  if (!value) return null // Let required handle empty values
  
  if (value.length < min) {
    return `${fieldName} must be at least ${min} characters long`
  }
  return null
}

export const validateMaxLength = (value, max, fieldName = 'Field') => {
  if (!value) return null
  
  if (value.length > max) {
    return `${fieldName} must be no more than ${max} characters long`
  }
  return null
}

export const validatePassword = (password) => {
  if (!password) return null
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }
  return null
}

export const validatePasswordConfirm = (password, confirmPassword) => {
  if (!confirmPassword) return null
  
  if (password !== confirmPassword) {
    return 'Passwords do not match'
  }
  return null
}
