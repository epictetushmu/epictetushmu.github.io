/**
 * Global error handling utilities
 * Provides centralized error management and logging
 */

/**
 * Error types for better error categorization
 */
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  AUTHORIZATION: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
}

/**
 * Error severity levels
 */
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
}

/**
 * Custom error class with additional properties
 */
export class AppError extends Error {
  constructor(message, type = ERROR_TYPES.UNKNOWN, severity = ERROR_SEVERITY.MEDIUM, details = null) {
    super(message)
    this.name = 'AppError'
    this.type = type
    this.severity = severity
    this.details = details
    this.timestamp = new Date().toISOString()
  }
}

/**
 * Error handler class for centralized error management
 */
class ErrorHandler {
  constructor() {
    this.errors = []
    this.maxErrors = 100 // Keep only last 100 errors
  }

  /**
   * Handle and log an error
   * @param {Error|AppError} error - The error to handle
   * @param {Object} context - Additional context about where the error occurred
   * @returns {Object} - Error information for UI display
   */
  handle(error, context = {}) {
    const errorInfo = this.processError(error, context)
    this.logError(errorInfo)
    return this.formatErrorForUI(errorInfo)
  }

  /**
   * Process error and extract relevant information
   * @param {Error|AppError} error - The error to process
   * @param {Object} context - Additional context
   * @returns {Object} - Processed error information
   */
  processError(error, context) {
    const isAppError = error instanceof AppError
    
    return {
      id: this.generateErrorId(),
      message: error.message || 'An unknown error occurred',
      type: isAppError ? error.type : ERROR_TYPES.UNKNOWN,
      severity: isAppError ? error.severity : ERROR_SEVERITY.MEDIUM,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context: {
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...context
      },
      details: isAppError ? error.details : null
    }
  }

  /**
   * Log error to console and store in memory
   * @param {Object} errorInfo - Processed error information
   */
  logError(errorInfo) {
    // Log to console based on severity
    const logMethod = this.getLogMethod(errorInfo.severity)
    logMethod(`[${errorInfo.type}] ${errorInfo.message}`, errorInfo)

    // Store in memory (in production, this would be sent to a logging service)
    this.errors.unshift(errorInfo)
    
    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors)
    }
  }

  /**
   * Get appropriate console method based on severity
   * @param {string} severity - Error severity level
   * @returns {Function} - Console method to use
   */
  getLogMethod(severity) {
    switch (severity) {
      case ERROR_SEVERITY.LOW:
        return console.info
      case ERROR_SEVERITY.MEDIUM:
        return console.warn
      case ERROR_SEVERITY.HIGH:
      case ERROR_SEVERITY.CRITICAL:
        return console.error
      default:
        return console.log
    }
  }

  /**
   * Format error for UI display
   * @param {Object} errorInfo - Processed error information
   * @returns {Object} - User-friendly error information
   */
  formatErrorForUI(errorInfo) {
    const userFriendlyMessages = {
      [ERROR_TYPES.NETWORK]: 'Network connection error. Please check your internet connection.',
      [ERROR_TYPES.VALIDATION]: 'Please check your input and try again.',
      [ERROR_TYPES.AUTHENTICATION]: 'Authentication failed. Please log in again.',
      [ERROR_TYPES.AUTHORIZATION]: 'You do not have permission to perform this action.',
      [ERROR_TYPES.NOT_FOUND]: 'The requested resource was not found.',
      [ERROR_TYPES.SERVER]: 'Server error. Please try again later.',
      [ERROR_TYPES.UNKNOWN]: 'An unexpected error occurred. Please try again.'
    }

    return {
      id: errorInfo.id,
      message: userFriendlyMessages[errorInfo.type] || errorInfo.message,
      type: errorInfo.type,
      severity: errorInfo.severity,
      timestamp: errorInfo.timestamp,
      canRetry: this.canRetry(errorInfo.type),
      showDetails: errorInfo.severity === ERROR_SEVERITY.CRITICAL
    }
  }

  /**
   * Check if an error type can be retried
   * @param {string} type - Error type
   * @returns {boolean} - Whether the error can be retried
   */
  canRetry(type) {
    const retryableTypes = [
      ERROR_TYPES.NETWORK,
      ERROR_TYPES.SERVER
    ]
    return retryableTypes.includes(type)
  }

  /**
   * Generate unique error ID
   * @returns {string} - Unique error identifier
   */
  generateErrorId() {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Get recent errors
   * @param {number} limit - Maximum number of errors to return
   * @returns {Array} - Array of recent errors
   */
  getRecentErrors(limit = 10) {
    return this.errors.slice(0, limit)
  }

  /**
   * Clear all stored errors
   */
  clearErrors() {
    this.errors = []
  }

  /**
   * Get error statistics
   * @returns {Object} - Error statistics
   */
  getErrorStats() {
    const stats = {
      total: this.errors.length,
      byType: {},
      bySeverity: {},
      recent: this.errors.filter(err => 
        new Date(err.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      ).length
    }

    this.errors.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1
    })

    return stats
  }
}

// Create singleton instance
export const errorHandler = new ErrorHandler()

// Global error handler for unhandled errors
window.addEventListener('error', (event) => {
  errorHandler.handle(event.error, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  })
})

// Global handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  errorHandler.handle(new Error(event.reason), {
    type: 'unhandled_promise_rejection'
  })
})

// Vue error handler
export const vueErrorHandler = (error, instance, info) => {
  errorHandler.handle(error, {
    component: instance?.$options.name || 'Unknown',
    info
  })
}

// Export utility functions
export const createError = (message, type, severity, details) => {
  return new AppError(message, type, severity, details)
}

export const handleError = (error, context) => {
  return errorHandler.handle(error, context)
}

export const getErrorStats = () => {
  return errorHandler.getErrorStats()
}
