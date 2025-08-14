<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(true)
const isMobileMenuOpen = ref(false)

onMounted(() => {
  // Simulate app initialization
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div id="app">
    <!-- Loading screen -->
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-spinner"></div>
      <p>Loading Epictetus...</p>
    </div>
    
    <!-- Main app -->
    <template v-else>
      <header>
        <nav class="topnav" role="navigation" aria-label="Main navigation">
          <router-link to="/" class="logo-link" aria-label="Home page">
            <img src="/hmu.png" width="60" height="40" alt="HMU logo" />
          </router-link>
          
          <div class="nav-links">
            <router-link to="/" class="nav-item" aria-label="Home page">
              <span class="nav-icon">🏠</span>
              <span class="nav-text">Home</span>
            </router-link>
            <router-link to="/library" class="nav-item" aria-label="E-Library page">
              <span class="nav-icon">📚</span>
              <span class="nav-text">Library</span>
            </router-link>
            <router-link to="/news" class="nav-item" aria-label="News page">
              <span class="nav-icon">📰</span>
              <span class="nav-text">News</span>
            </router-link>
            <router-link to="/contact" class="nav-item" aria-label="Contact page">
              <span class="nav-icon">📧</span>
              <span class="nav-text">Contact</span>
            </router-link>
            <router-link to="/signup" class="nav-item" aria-label="Sign up page">
              <span class="nav-icon">✍️</span>
              <span class="nav-text">Sign Up</span>
            </router-link>
            <router-link to="/login" class="nav-item" aria-label="Login page">
              <span class="nav-icon">🔑</span>
              <span class="nav-text">Login</span>
            </router-link>
          </div>

          <!-- Mobile menu toggle -->
          <button 
            class="mobile-menu-toggle" 
            @click="toggleMobileMenu" 
            :class="{ active: isMobileMenuOpen }"
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>

        <!-- Mobile menu overlay -->
        <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="toggleMobileMenu">
          <div class="mobile-menu" @click.stop>
            <router-link to="/" class="mobile-nav-item" @click="toggleMobileMenu">
              <span class="nav-icon">🏠</span>
              <span class="nav-text">Home</span>
            </router-link>
            <router-link to="/library" class="mobile-nav-item" @click="toggleMobileMenu">
              <span class="nav-icon">📚</span>
              <span class="nav-text">Library</span>
            </router-link>
            <router-link to="/news" class="mobile-nav-item" @click="toggleMobileMenu">
              <span class="nav-icon">📰</span>
              <span class="nav-text">News</span>
            </router-link>
            <router-link to="/contact" class="mobile-nav-item" @click="toggleMobileMenu">
              <span class="nav-icon">📧</span>
              <span class="nav-text">Contact</span>
            </router-link>
            <router-link to="/signup" class="mobile-nav-item" @click="toggleMobileMenu">
              <span class="nav-icon">✍️</span>
              <span class="nav-text">Sign Up</span>
            </router-link>
            <router-link to="/login" class="mobile-nav-item" @click="toggleMobileMenu">
              <span class="nav-icon">🔑</span>
              <span class="nav-text">Login</span>
            </router-link>
          </div>
        </div>
      </header>
      
      <main role="main">
        <router-view v-slot="{ Component, route }">
          <transition name="page" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </main>
      
      <footer class="app-footer">
        <div class="footer-content">
          <p>&copy; 2025 Epictetus EE Team - Hellenic Mediterranean University</p>
          <p class="footer-quote">
            <em>"It's not what happens to you, but how you react to it that matters." - Epictetus</em>
          </p>
        </div>
      </footer>
    </template>
  </div>
</template>

<style>
@import './style.css';

/* App-specific styles */
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-secondary);
}

.loading-screen p {
  margin-top: 1rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Footer */
.app-footer {
  background-color: var(--secondary-color);
  color: white;
  padding: 2rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-quote {
  margin-top: 1rem;
  font-style: italic;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .app-footer {
    padding: 1.5rem;
  }
  
  .footer-content p {
    font-size: 0.9rem;
  }
}
</style>
