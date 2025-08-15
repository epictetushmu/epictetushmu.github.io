<template>
  <nav class="app-nav" :class="navClasses">
    <!-- Mobile Menu Toggle -->
    <button
      v-if="isMobile"
      class="mobile-menu-toggle"
      @click="toggleMobileMenu"
      :aria-expanded="mobileMenuOpen"
      aria-label="Toggle navigation menu"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    
    <!-- Navigation Links -->
    <div class="nav-content" :class="{ 'mobile-open': mobileMenuOpen }">
      <!-- Logo/Brand -->
      <div v-if="showLogo" class="nav-brand">
        <router-link to="/" class="brand-link" @click="closeMobileMenu">
          <img v-if="logoSrc" :src="logoSrc" :alt="brandName" class="brand-logo">
          <span v-else class="brand-text">{{ brandName }}</span>
        </router-link>
      </div>
      
      <!-- Navigation Items -->
      <ul class="nav-list" :class="listClasses">
        <li v-for="item in navigation" :key="item.path || item.name" class="nav-item">
          <!-- External Link -->
          <a
            v-if="item.external"
            :href="item.path"
            :target="item.target || '_blank'"
            :rel="item.rel || 'noopener noreferrer'"
            class="nav-link"
            :class="{ 'nav-link--button': item.button }"
            @click="closeMobileMenu"
          >
            <span v-if="item.icon" class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.name }}</span>
            <span v-if="item.external" class="external-icon">↗</span>
          </a>
          
          <!-- Router Link -->
          <router-link
            v-else
            :to="item.path"
            class="nav-link"
            :class="{ 'nav-link--button': item.button }"
            :exact="item.exact"
            @click="closeMobileMenu"
          >
            <span v-if="item.icon" class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.name }}</span>
            <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
          </router-link>
        </li>
      </ul>
      
      <!-- User Actions -->
      <div v-if="$slots.actions || showAuthButtons" class="nav-actions">
        <slot name="actions">
          <!-- Default Auth Buttons -->
          <div v-if="showAuthButtons" class="auth-buttons">
            <router-link
              v-if="!isAuthenticated"
              to="/login"
              class="auth-link auth-link--login"
              @click="closeMobileMenu"
            >
              Login
            </router-link>
            <router-link
              v-if="!isAuthenticated"
              to="/signup"
              class="auth-link auth-link--signup"
              @click="closeMobileMenu"
            >
              Sign Up
            </router-link>
            <button
              v-if="isAuthenticated"
              @click="handleLogout"
              class="auth-link auth-link--logout"
            >
              Logout
            </button>
          </div>
        </slot>
      </div>
    </div>
    
    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobile && mobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  navigation: {
    type: Array,
    required: true
  },
  variant: {
    type: String,
    default: 'horizontal',
    validator: value => ['horizontal', 'vertical', 'sidebar'].includes(value)
  },
  position: {
    type: String,
    default: 'top',
    validator: value => ['top', 'bottom', 'left', 'right', 'fixed'].includes(value)
  },
  showLogo: {
    type: Boolean,
    default: true
  },
  logoSrc: {
    type: String,
    default: ''
  },
  brandName: {
    type: String,
    default: 'Epictetus'
  },
  showAuthButtons: {
    type: Boolean,
    default: false
  },
  isAuthenticated: {
    type: Boolean,
    default: false
  },
  mobileBreakpoint: {
    type: Number,
    default: 768
  },
  sticky: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['logout', 'mobile-toggle'])

const route = useRoute()

// Reactive state
const mobileMenuOpen = ref(false)
const windowWidth = ref(window?.innerWidth || 1024)

// Computed properties
const isMobile = computed(() => windowWidth.value < props.mobileBreakpoint)

const navClasses = computed(() => [
  'app-nav',
  `app-nav--${props.variant}`,
  `app-nav--${props.position}`,
  {
    'app-nav--sticky': props.sticky,
    'app-nav--mobile-open': mobileMenuOpen.value
  }
])

const listClasses = computed(() => [
  'nav-list',
  `nav-list--${props.variant}`
])

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  emit('mobile-toggle', mobileMenuOpen.value)
  
  // Prevent body scroll when menu is open
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false
    emit('mobile-toggle', false)
    document.body.style.overflow = ''
  }
}

const handleLogout = () => {
  closeMobileMenu()
  emit('logout')
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  
  // Close mobile menu on desktop
  if (!isMobile.value && mobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.app-nav {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  box-shadow: var(--shadow);
  transition: var(--transition);
  z-index: 1000;
}

.app-nav--sticky {
  position: sticky;
  top: 0;
}

.app-nav--fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.app-nav--sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  border-right: 1px solid var(--border-color);
  border-bottom: none;
  background-color: var(--background-primary);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: auto;
  margin-right: 1rem;
}

.hamburger-line {
  width: 1.5rem;
  height: 2px;
  background-color: white;
  margin: 2px 0;
  transition: var(--transition);
  transform-origin: center;
}

.app-nav--mobile-open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}

.app-nav--mobile-open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.app-nav--mobile-open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
}

/* Navigation Content */
.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.app-nav--vertical .nav-content,
.app-nav--sidebar .nav-content {
  flex-direction: column;
  align-items: stretch;
  padding: 2rem 1rem;
  gap: 2rem;
}

/* Brand */
.nav-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
}

.brand-logo {
  height: 2rem;
  width: auto;
}

.brand-text {
  color: var(--primary-color);
}

/* Navigation List */
.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
  align-items: center;
}

.nav-list--vertical,
.nav-list--sidebar {
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
}

/* Navigation Links */
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: var(--transition);
  border-radius: var(--border-radius);
  white-space: nowrap;
  min-height: 44px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

.nav-link--button {
  background-color: var(--primary-color);
  color: white;
  border-radius: 50px;
}

.nav-link--button:hover {
  background-color: var(--primary-hover);
  color: white;
}

.nav-icon {
  font-size: 1.1rem;
}

.nav-text {
  font-size: 0.95rem;
}

.nav-badge {
  background-color: var(--error-color);
  color: white;
  padding: 0.125rem 0.375rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 1.25rem;
  text-align: center;
}

.external-icon {
  font-size: 0.875rem;
  opacity: 0.7;
}

/* Navigation Actions */
.nav-actions {
  flex-shrink: 0;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.auth-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  background: none;
}

.auth-link--login {
  color: var(--text-secondary);
}

.auth-link--login:hover {
  color: var(--primary-color);
  background-color: var(--background-secondary);
}

.auth-link--signup {
  background-color: var(--primary-color);
  color: white;
  border-radius: 50px;
}

.auth-link--signup:hover {
  background-color: var(--primary-dark);
}

.auth-link--logout {
  color: var(--error-color);
}

.auth-link--logout:hover {
  color: white;
  background-color: var(--error-color);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  .nav-content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background-primary);
    flex-direction: column;
    justify-content: flex-start;
    padding: 4rem 2rem 2rem;
    gap: 2rem;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 999;
  }
  
  .nav-content.mobile-open {
    transform: translateX(0);
  }
  
  .nav-list {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    width: 100%;
  }
  
  .nav-link {
    padding: 1rem;
    font-size: 1.1rem;
    justify-content: center;
    border: 1px solid var(--border-color);
    color: var(--text-primary);
  }

  .nav-link:hover {
    background-color: var(--background-secondary);
    color: var(--primary-color);
    transform: none;
  }
  
  .auth-buttons {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
  
  .auth-link {
    width: 100%;
    padding: 1rem;
    text-align: center;
    border: 1px solid var(--border-color);
  }
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

/* Sidebar specific styles */
.app-nav--sidebar .nav-content {
  height: 100vh;
  overflow-y: auto;
}

.app-nav--sidebar .nav-list {
  width: 100%;
}

.app-nav--sidebar .nav-link {
  width: 100%;
  justify-content: flex-start;
  padding: 1rem;
}

/* Animations */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.app-nav--sticky {
  animation: slideDown 0.3s ease-out;
}

/* Focus styles for accessibility */
.nav-link:focus,
.auth-link:focus,
.mobile-menu-toggle:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .nav-link {
    border: 1px solid transparent;
  }
  
  .nav-link:hover,
  .nav-link.router-link-active {
    border-color: currentColor;
  }
}
</style>
