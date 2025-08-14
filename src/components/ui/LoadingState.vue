<template>
  <div class="loading-state" :class="loadingClasses">
    <div v-if="type === 'spinner'" class="spinner-container">
      <div class="spinner" :class="`spinner--${size}`"></div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
    
    <div v-else-if="type === 'skeleton'" class="skeleton-container">
      <div v-for="n in skeletonLines" :key="n" class="skeleton-line"></div>
    </div>
    
    <div v-else-if="type === 'dots'" class="dots-container">
      <div class="dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
    
    <div v-else-if="type === 'pulse'" class="pulse-container">
      <div class="pulse-circle" :class="`pulse-circle--${size}`"></div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'spinner',
    validator: value => ['spinner', 'skeleton', 'dots', 'pulse'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  message: {
    type: String,
    default: null
  },
  overlay: {
    type: Boolean,
    default: false
  },
  skeletonLines: {
    type: Number,
    default: 3
  }
})

const loadingClasses = computed(() => [
  'loading-state',
  `loading-state--${props.type}`,
  `loading-state--${props.size}`,
  {
    'loading-state--overlay': props.overlay
  }
])
</script>

<style scoped>
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-state--overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
}

.loading-message {
  margin-top: 1rem;
  color: var(--text-secondary);
  font-size: 1rem;
  text-align: center;
}

/* Spinner Loading */
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner--small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.spinner--medium {
  width: 40px;
  height: 40px;
}

.spinner--large {
  width: 60px;
  height: 60px;
  border-width: 4px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Skeleton Loading */
.skeleton-container {
  width: 100%;
  max-width: 400px;
}

.skeleton-line {
  height: 1rem;
  background: linear-gradient(90deg, 
    var(--border-color) 25%, 
    rgba(var(--border-color), 0.5) 50%, 
    var(--border-color) 75%
  );
  background-size: 200% 100%;
  border-radius: var(--border-radius);
  margin-bottom: 0.75rem;
  animation: shimmer 1.5s infinite;
}

.skeleton-line:last-child {
  width: 70%;
  margin-bottom: 0;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Dots Loading */
.dots-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: var(--primary-color);
  border-radius: 50%;
  animation: dotPulse 1.5s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Pulse Loading */
.pulse-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pulse-circle {
  border-radius: 50%;
  background-color: var(--primary-color);
  animation: pulse 2s infinite;
}

.pulse-circle--small {
  width: 30px;
  height: 30px;
}

.pulse-circle--medium {
  width: 50px;
  height: 50px;
}

.pulse-circle--large {
  width: 70px;
  height: 70px;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.8);
    opacity: 1;
  }
}

/* Size variations for message */
.loading-state--small .loading-message {
  font-size: 0.875rem;
}

.loading-state--large .loading-message {
  font-size: 1.125rem;
}
</style>
