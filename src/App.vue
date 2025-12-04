<script setup>
import { ref, onMounted } from 'vue'
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue'

const isLoading = ref(false) // Assuming content loads quickly or handled elsewhere for now

onMounted(() => {
  // Initialize Lucide icons after components are mounted
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
</script>

<template>
  <div id="app-container">
    <template v-if="!isLoading">
      <!-- Header -->
      <header>
        <div class="container">
          <nav class="navbar">
            <div class="logo">
              <div class="logo-icon">
                <img src="/epictetus_logo_original-removebg-preview.png" alt="Epictetus EE Team Logo" style="height: 100%; width: 100%; object-fit: contain;">
              </div>
             <!-- <div class="logo-text">Epictetus - Lab of Experimental Ideas</div> -->
            </div>
            <div class="nav-links">
              <router-link to="/" class="nav-link" active-class="active">Home</router-link>
              <router-link to="/news" class="nav-link" active-class="active">News</router-link>
              <router-link to="/library" class="nav-link" active-class="active">E-Library</router-link>
              <router-link to="/projects" class="nav-link" active-class="active">Projects</router-link>
              <router-link to="/chaniathon" class="nav-link" active-class="active">Chaniathon</router-link>
              <router-link to="/contact" class="nav-link" active-class="active">Contact</router-link>
            </div>
            <div class="auth-buttons">
              <router-link to="/login" class="btn btn-outline">Login</router-link>
              <router-link to="/signup" class="btn btn-primary">Sign Up</router-link>
            </div>
          </nav>
        </div>
      </header>

      <!-- Main Content Area -->
      <main id="app-main">
        <ErrorBoundary>
          <router-view v-slot="{ Component, route }">
            <transition name="page" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </ErrorBoundary>
      </main>

      <!-- Footer -->
      <footer>
        <div class="container">
          <div class="footer-grid">
            <div class="footer-column">
              <h3>Epictetus - Lab of Experimental Ideas</h3>
              <p>A student-led group within the Department of Electronic Engineering at the Hellenic Mediterranean University, dedicated to advancing knowledge and innovation in electronic engineering.</p>
            </div>
            <div class="footer-column">
              <h3>Quick Links</h3>
              <ul class="footer-links">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/news">News</router-link></li>
                <li><router-link to="/library">E-Library</router-link></li>
                <li><router-link to="/projects">Projects</router-link></li>
                <li><router-link to="/chaniathon">Chaniathon</router-link></li>
                <li><router-link to="/contact">Contact</router-link></li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>Resources</h3>
              <ul class="footer-links">
                <li><a href="#">Student Handbook</a></li>
                <li><a href="#">Project Guidelines</a></li>
                <li><a href="#">Research Papers</a></li>
                <li><a href="#">Technical Documentation</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>Contact</h3>
              <ul class="footer-links">
                <li><span>📧 epictetus@hmu.gr</span></li>
                <li><span>📍 Τμήμα Ηλεκτρονικών Μηχανικών</span></li>
                <!--<li><span>📱 +30 28210 12345</span></li>-->
              </ul>
            </div>
          </div>
          <div class="copyright">
            <p>&copy; 2025 Epictetus - Lab of Experimental Ideas. All rights reserved. Hellenic Mediterranean University.</p>
          </div>
        </div>
      </footer>
    </template>
  </div>
</template>

<style>
@import './style.css';

/* Base styles for the app container to ensure full height */
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app-main {
  flex: 1;
}

/* Header Styles */
header {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.logo-icon {
    background: transparent;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.nav-links {
    display: flex;
    gap: 1.5rem;
}

.nav-link {
    text-decoration: none;
    color: var(--dark);
    font-weight: 500;
    position: relative;
    padding: 0.5rem 0;
    transition: var(--transition);
}

.nav-link:hover {
    color: var(--primary);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: var(--transition);
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}

.auth-buttons {
    display: flex;
    gap: 1rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    border: none;
    font-size: 0.95rem;
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}

.btn-outline {
    background: transparent;
    border: 2px solid var(--primary);
    color: var(--primary);
}

.btn-outline:hover {
    background: var(--primary);
    color: white;
}

.btn-secondary {
    background: var(--secondary);
    color: white;
}

.btn-secondary:hover {
    background: #0284c7;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

/* Footer */
footer {
    background: var(--dark);
    color: white;
    padding: 4rem 0 2rem;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.footer-column h3 {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.75rem;
    color: white;
}

.footer-column h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--accent);
}

.footer-links {
    list-style: none;
}

.footer-links li {
    margin-bottom: 0.75rem;
}

.footer-links a {
    color: #94a3b8;
    text-decoration: none;
    transition: var(--transition);
}

.footer-links a:hover {
    color: white;
    padding-left: 5px;
}

.copyright {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #334155;
    color: #94a3b8;
    font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-links {
        flex-wrap: wrap;
        justify-content: center;
    }
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
</style>
