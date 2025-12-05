/**
 * Validation utilities for form inputs and data
 * Provides reusable validation functions with proper error messages
 */

/**
 * Validation rules and their corresponding error messages
 */
export const VALIDATION_RULES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  MIN_LENGTH: 'Must be at least {min} characters long',
  MAX_LENGTH: 'Must be no more than {max} characters long',
  PASSWORD_STRENGTH: 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
  PHONE: 'Please enter a valid phone number',
  URL: 'Please enter a valid URL',
  NUMBER: 'Please enter a valid number',
  POSITIVE_NUMBER: 'Please enter a positive number',
  DATE: 'Please enter a valid date',
  FUTURE_DATE: 'Date must be in the future',
  PAST_DATE: 'Date must be in the past',
  MATCH: 'Values do not match',
  UNIQUE: 'This value is already taken'
}

/**
 * Regular expressions for common validations
 */
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  ALPHA_ONLY: /^[a-zA-Z\s]+$/,
  NUMERIC_ONLY: /^\d+$/
}

/**
 * Validation result class
 */
export class ValidationResult {
  constructor(isValid = true, errors = []) {
    this.isValid = isValid
    this.errors = errors
  }

  addError(field, message) {
    this.isValid = false
    this.errors.push({ field, message })
  }

  getErrorsForField(field) {
    return this.errors.filter(error => error.field === field)
  }

  getFirstErrorForField(field) {
    const errors = this.getErrorsForField(field)
    return errors.length > 0 ? errors[0].message : null
  }

  hasErrors() {
    return this.errors.length > 0
  }

  clear() {
    this.isValid = true
    this.errors = []
  }
}

/**
 * Validator class with common validation methods
 */
export class Validator {
  /**
   * Validate required field
   * @param {any} value - Value to validate
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null if valid
   */
  static required(value, fieldName = 'Field') {
    if (value === null || value === undefined || value === '') {
      return `${fieldName} is required`
    }
    return null
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {string|null} - Error message or null if valid
   */
  static email(email) {
    if (!email) return null // Let required handle empty values
    if (!REGEX_PATTERNS.EMAIL.test(email)) {
      return VALIDATION_RULES.EMAIL
    }
    return null
  }

  /**
   * Validate minimum length
   * @param {string} value - Value to validate
   * @param {number} minLength - Minimum required length
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null if valid
   */
  static minLength(value, minLength, fieldName = 'Field') {
    if (!value) return null // Let required handle empty values
    if (value.length < minLength) {
      return VALIDATION_RULES.MIN_LENGTH.replace('{min}', minLength)
    }
    return null
  }

  /**
   * Validate maximum length
   * @param {string} value - Value to validate
   * @param {number} maxLength - Maximum allowed length
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null if valid
   */
  static maxLength(value, maxLength, fieldName = 'Field') {
    if (!value) return null // Let required handle empty values
    if (value.length > maxLength) {
      return VALIDATION_RULES.MAX_LENGTH.replace('{max}', maxLength)
    }
    return null
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {string|null} - Error message or null if valid
   */
  static passwordStrength(password) {
    if (!password) return null // Let required handle empty values
    if (!REGEX_PATTERNS.PASSWORD_STRONG.test(password)) {
      return VALIDATION_RULES.PASSWORD_STRENGTH
    }
    return null
  }

  /**
   * Validate phone number
   * @param {string} phone - Phone number to validate
   * @returns {string|null} - Error message or null if valid
   */
  static phone(phone) {
    if (!phone) return null // Let required handle empty values
    if (!REGEX_PATTERNS.PHONE.test(phone.replace(/\s/g, ''))) {
      return VALIDATION_RULES.PHONE
    }
    return null
  }

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {string|null} - Error message or null if valid
   */
  static url(url) {
    if (!url) return null // Let required handle empty values
    if (!REGEX_PATTERNS.URL.test(url)) {
      return VALIDATION_RULES.URL
    }
    return null
  }

  /**
   * Validate number
   * @param {any} value - Value to validate
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null if valid
   */
  static number(value, fieldName = 'Field') {
    if (value === null || value === undefined || value === '') return null
    if (isNaN(value)) {
      return `${fieldName} must be a valid number`
    }
    return null
  }

  /**
   * Validate positive number
   * @param {any} value - Value to validate
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null if valid
   */
  static positiveNumber(value, fieldName = 'Field') {
    const numberError = this.number(value, fieldName)
    if (numberError) return numberError
    
    if (parseFloat(value) <= 0) {
      return `${fieldName} must be a positive number`
    }
    return null
  }

  /**
   * Validate date
   * @param {string|Date} date - Date to validate
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null if valid
   */
  static date(date, fieldName = 'Date') {
    if (!date) return null
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return `${fieldName} must be a valid date`
    }
    return null
  }

  /**
   * Validate future date
   * @param {string|Date} date - Date to validate
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null if valid
   */
  static futureDate(date, fieldName = 'Date') {
    const dateError = this.date(date, fieldName)
    if (dateError) return dateError
    
    const dateObj = new Date(date)
    if (dateObj <= new Date()) {
      return `${fieldName} must be in the future`
    }
    return null
  }

  /**
   * Validate past date
   * @param {string|Date} date - Date to validate
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null if valid
   */
  static pastDate(date, fieldName = 'Date') {
    const dateError = this.date(date, fieldName)
    if (dateError) return dateError
    
    const dateObj = new Date(date)
    if (dateObj >= new Date()) {
      return `${fieldName} must be in the past`
    }
    return null
  }

  /**
   * Validate that two values match
   * @param {any} value1 - First value
   * @param {any} value2 - Second value
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null if valid
   */
  static match(value1, value2, fieldName = 'Fields') {
    if (value1 !== value2) {
      return `${fieldName} do not match`
    }
    return null
  }

  /**
   * Validate against a list of allowed values
   * @param {any} value - Value to validate
   * @param {Array} allowedValues - Array of allowed values
   * @param {string} fieldName - Name of the field
   * @returns {string|null} - Error message or null if valid
   */
  static oneOf(value, allowedValues, fieldName = 'Field') {
    if (!allowedValues.includes(value)) {
      return `${fieldName} must be one of: ${allowedValues.join(', ')}`
    }
    return null
  }

  /**
   * Validate custom pattern
   * @param {string} value - Value to validate
   * @param {RegExp} pattern - Regular expression pattern
   * @param {string} message - Error message
   * @returns {string|null} - Error message or null if valid
   */
  static pattern(value, pattern, message) {
    if (!value) return null
    if (!pattern.test(value)) {
      return message
    }
    return null
  }
}

/**
 * Form validation helper
 */
export class FormValidator {
  constructor() {
    this.rules = new Map()
    this.customValidators = new Map()
  }

  /**
   * Add validation rule for a field
   * @param {string} fieldName - Name of the field
   * @param {Array} rules - Array of validation rules
   */
  addRule(fieldName, rules) {
    this.rules.set(fieldName, rules)
  }

  /**
   * Add custom validator for a field
   * @param {string} fieldName - Name of the field
   * @param {Function} validator - Custom validator function
   */
  addCustomValidator(fieldName, validator) {
    this.customValidators.set(fieldName, validator)
  }

  /**
   * Validate a single field
   * @param {string} fieldName - Name of the field
   * @param {any} value - Value to validate
   * @returns {ValidationResult} - Validation result
   */
  validateField(fieldName, value) {
    const result = new ValidationResult()
    const rules = this.rules.get(fieldName) || []
    const customValidator = this.customValidators.get(fieldName)

    for (const ruleConfig of rules) {
      let error = null
      if (ruleConfig.required) {
        error = Validator.required(value, fieldName)
      } else if (ruleConfig.email) {
        error = Validator.email(value)
      } else if (ruleConfig.minLength) {
        error = Validator.minLength(value, ruleConfig.minLength, fieldName)
      } else if (ruleConfig.maxLength) {
        error = Validator.maxLength(value, ruleConfig.maxLength, fieldName)
      } else if (ruleConfig.passwordStrength) {
        error = Validator.passwordStrength(value)
      } else if (ruleConfig.phone) {
        error = Validator.phone(value)
      } else if (ruleConfig.url) {
        error = Validator.url(value)
      } else if (ruleConfig.number) {
        error = Validator.number(value, fieldName)
      } else if (ruleConfig.positiveNumber) {
        error = Validator.positiveNumber(value, fieldName)
      } else if (ruleConfig.date) {
        error = Validator.date(value, fieldName)
      } else if (ruleConfig.futureDate) {
        error = Validator.futureDate(value, fieldName)
      } else if (ruleConfig.pastDate) {
        error = Validator.pastDate(value, fieldName)
      } else if (ruleConfig.match) {
        // This case needs to be handled carefully as 'match' requires another field's value
        // For now, we'll assume 'match' is used with a custom validator or handled outside this generic loop
        console.warn(`'match' validation rule for field '${fieldName}' cannot be automatically applied in generic loop. Consider using a custom validator.`)
      } else if (ruleConfig.oneOf) {
        error = Validator.oneOf(value, ruleConfig.oneOf, fieldName)
      } else if (ruleConfig.pattern) {
        error = Validator.pattern(value, ruleConfig.pattern, ruleConfig.message)
      }

      if (error) {
        result.addError(fieldName, error)
      }
    }

    // Apply custom validator
    if (customValidator) {
      const customError = customValidator(value, fieldName)
      if (customError) {
        result.addError(fieldName, customError)
      }
    }

    return result
  }

  /**
   * Validate entire form
   * @param {Object} formData - Form data object
   * @returns {ValidationResult} - Validation result
   */
  validateForm(formData) {
    const result = new ValidationResult()

    for (const [fieldName, value] of Object.entries(formData)) {
      const fieldResult = this.validateField(fieldName, value)
      if (!fieldResult.isValid) {
        result.errors.push(...fieldResult.errors)
      }
    }

    result.isValid = result.errors.length === 0
    return result
  }

  /**
   * Clear all rules
   */
  clearRules() {
    this.rules.clear()
    this.customValidators.clear()
  }
}

// Export commonly used validation functions
export const validateEmail = (email) => Validator.email(email)
export const validatePassword = (password) => Validator.passwordStrength(password)
export const validateRequired = (value, fieldName) => Validator.required(value, fieldName)
export const validateMinLength = (value, minLength, fieldName) => Validator.minLength(value, minLength, fieldName)
export const validateMaxLength = (value, maxLength, fieldName) => Validator.maxLength(value, maxLength, fieldName)

// Export default form validator instance
export const formValidator = new FormValidator()

