<script setup>
import { ref, onMounted } from 'vue'
import TopNavbar from '@/components/common/TopNavbar.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue'

const isLoading = ref(true)

// Navigation configuration for the TopNavbar component
const navigationItems = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Library', path: '/library', icon: '📚' },
  { name: 'News', path: '/news', icon: '📰' },
  { name: 'Chaniathon', path: 'https://epictetushmu.github.io/Chaniathon/', icon: '💻', external: true },
  { name: 'Contact', path: '/contact', icon: '📧' },
  { name: 'Sign Up', path: '/signup', icon: '✍️' },
  { name: 'Login', path: '/login', icon: '🔑' }
]

onMounted(() => {
  // Simulate app initialization
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <div id="app">
    <!-- Loading screen -->
    <div v-if="isLoading" class="loading-screen">
      <LoadingSpinner size="large" />
      <p>Loading Epictetus...</p>
    </div>
    
    <!-- Main app -->
    <template v-else>
      <ErrorBoundary>
        <header>
          <TopNavbar
            :navigationItems="navigationItems"
            logoSrc="/hmu.png"
            brandName="Epictetus"
            :sticky="true"
            variant="default"
          />
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
      </ErrorBoundary>
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
