<template>
  <nav class="top-navbar" :class="navbarClasses">
    <div class="navbar-container">
      <!-- Brand/Logo Section -->
      <div class="navbar-brand">
        <router-link to="/" class="brand-link">
          <img 
            v-if="logoSrc" 
            :src="logoSrc" 
            :alt="brandName" 
            class="brand-logo"
          >
          <span class="brand-text">{{ brandName }}</span>
        </router-link>
      </div>

      <!-- Desktop Navigation Links -->
      <div class="navbar-nav desktop-nav">
        <router-link
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ 'nav-link--active': isActiveRoute(item.path) }"
        >
          <span v-if="item.icon" class="nav-icon">{{ item.icon }}</span>
          <span class="nav-text">{{ item.name }}</span>
        </router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div class="mobile-nav" :class="{ 'mobile-nav--open': isMobileMenuOpen }">
      <router-link
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        class="mobile-nav-link"
        :class="{ 'mobile-nav-link--active': isActiveRoute(item.path) }"
        @click="closeMobileMenu"
      >
        <span v-if="item.icon" class="nav-icon">{{ item.icon }}</span>
        <span class="nav-text">{{ item.name }}</span>
      </router-link>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// Props
const props = defineProps({
  navigationItems: {
    type: Array,
    required: true
  },
  logoSrc: {
    type: String,
    default: ''
  },
  brandName: {
    type: String,
    default: 'Brand'
  },
  sticky: {
    type: Boolean,
    default: true
  },
  transparent: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'minimal', 'accent'].includes(value)
  }
})

// Reactive state
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const route = useRoute()

// Computed properties
const navbarClasses = computed(() => [
  'top-navbar',
  `top-navbar--${props.variant}`,
  {
    'top-navbar--sticky': props.sticky,
    'top-navbar--transparent': props.transparent && !isScrolled.value,
    'top-navbar--scrolled': isScrolled.value,
    'top-navbar--mobile-open': isMobileMenuOpen.value
  }
])

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  
  // Prevent body scroll when mobile menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Close mobile menu on route change
  closeMobileMenu()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})

// Watch for route changes to close mobile menu
import { watch } from 'vue'
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>

<style scoped>
.top-navbar {
  position: relative;
  background-color: var(--background-primary, #ffffff);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  transition: all 0.3s ease;
  z-index: 1000;
}

.top-navbar--sticky {
  position: sticky;
  top: 0;
}

.top-navbar--transparent {
  background-color: transparent;
  border-bottom-color: transparent;
}

.top-navbar--scrolled {
  background-color: var(--background-primary, #ffffff);
  border-bottom-color: var(--border-color, #e5e7eb);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.top-navbar--accent {
  background-color: var(--primary-color, #3b82f6);
  border-bottom-color: var(--primary-dark, #2563eb);
}

.top-navbar--accent .brand-text,
.top-navbar--accent .nav-text {
  color: white;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

/* Brand/Logo */
.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-weight: 600;
}

.brand-logo {
  height: 32px;
  width: auto;
  margin-right: 0.5rem;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary, #1f2937);
  transition: color 0.3s ease;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--text-secondary, #6b7280);
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--primary-color, #3b82f6);
  background-color: var(--background-secondary, #f9fafb);
}

.nav-link--active {
  color: var(--primary-color, #3b82f6);
  font-weight: 600;
}

.nav-link--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background-color: var(--primary-color, #3b82f6);
  border-radius: 1px;
}

.nav-icon {
  font-size: 1rem;
}

.nav-text {
  font-size: 0.875rem;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
}

.mobile-menu-toggle:hover {
  background-color: var(--background-secondary, #f9fafb);
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background-color: var(--text-primary, #1f2937);
  transition: all 0.3s ease;
  margin: 2px 0;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Navigation */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--background-primary, #ffffff);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  padding: 1rem;
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
}

.mobile-nav--open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--text-secondary, #6b7280);
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  margin-bottom: 0.25rem;
}

.mobile-nav-link:hover,
.mobile-nav-link--active {
  color: var(--primary-color, #3b82f6);
  background-color: var(--background-secondary, #f9fafb);
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

/* Responsive Design */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .navbar-container {
    padding: 0 1rem;
  }

  .brand-text {
    font-size: 1.1rem;
  }

  .brand-logo {
    height: 28px;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 0.75rem;
    height: 56px;
  }

  .brand-text {
    font-size: 1rem;
  }

  .brand-logo {
    height: 24px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .top-navbar {
    background-color: var(--background-primary-dark, #1f2937);
    border-bottom-color: var(--border-color-dark, #374151);
  }

  .brand-text {
    color: var(--text-primary-dark, #f9fafb);
  }

  .nav-link {
    color: var(--text-secondary-dark, #d1d5db);
  }

  .nav-link:hover {
    background-color: var(--background-secondary-dark, #374151);
  }

  .hamburger-line {
    background-color: var(--text-primary-dark, #f9fafb);
  }

  .mobile-nav {
    background-color: var(--background-primary-dark, #1f2937);
    border-bottom-color: var(--border-color-dark, #374151);
  }

  .mobile-nav-link {
    color: var(--text-secondary-dark, #d1d5db);
  }

  .mobile-nav-link:hover,
  .mobile-nav-link--active {
    background-color: var(--background-secondary-dark, #374151);
  }
}
</style>
