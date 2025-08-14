<template>
  <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
    <div 
      class="modal-content" 
      :class="modalClasses"
      @click.stop
      role="dialog"
      :aria-labelledby="titleId"
      :aria-describedby="contentId"
    >
      <!-- Header -->
      <div v-if="$slots.header || title" class="modal-header">
        <h3 v-if="title" :id="titleId" class="modal-title">{{ title }}</h3>
        <slot name="header" />
        
        <button 
          v-if="showCloseButton"
          class="modal-close"
          @click="closeModal"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
      
      <!-- Body -->
      <div class="modal-body" :id="contentId">
        <slot />
      </div>
      
      <!-- Footer -->
      <div v-if="$slots.footer" class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, nextTick } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large', 'fullscreen'].includes(value)
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  },
  showCloseButton: {
    type: Boolean,
    default: true
  },
  persistent: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'opened', 'closed'])

const titleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)
const contentId = computed(() => `modal-content-${Math.random().toString(36).substr(2, 9)}`)

const modalClasses = computed(() => [
  'modal-content',
  `modal-content--${props.size}`,
  {
    'modal-content--persistent': props.persistent
  }
])

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick && !props.persistent) {
    closeModal()
  }
}

const closeModal = () => {
  if (!props.persistent) {
    emit('close')
  }
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && props.show && !props.persistent) {
    closeModal()
  }
}

// Watch for show prop changes to manage body scroll and focus
watch(() => props.show, async (newValue) => {
  if (newValue) {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscapeKey)
    
    // Focus management
    await nextTick()
    const modalElement = document.querySelector('.modal-content')
    if (modalElement) {
      modalElement.focus()
    }
    
    emit('opened')
  } else {
    // Restore body scroll
    document.body.style.overflow = 'auto'
    document.removeEventListener('keydown', handleEscapeKey)
    emit('closed')
  }
})

// Cleanup on component unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
  document.body.style.overflow = 'auto'
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background-color: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
  outline: none;
}

/* Sizes */
.modal-content--small {
  max-width: 400px;
  width: 100%;
}

.modal-content--medium {
  max-width: 600px;
  width: 100%;
}

.modal-content--large {
  max-width: 800px;
  width: 100%;
}

.modal-content--fullscreen {
  width: 100vw;
  height: 100vh;
  max-width: none;
  max-height: none;
  border-radius: 0;
  margin: 0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition);
}

.modal-close:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-content {
    margin: 0;
    width: 100%;
    max-height: calc(100vh - 1rem);
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
}

/* Accessibility improvements */
.modal-content:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: -2px;
}

/* Persistent modal styling */
.modal-content--persistent .modal-close {
  display: none;
}
</style>
