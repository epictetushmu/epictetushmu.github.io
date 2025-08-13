<template>
  <div class="not-found page-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p class="error-description">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      
      <div class="suggestions">
        <h3>Try one of these instead:</h3>
        <div class="suggestion-links">
          <router-link to="/" class="btn btn-primary">
            🏠 Go Home
          </router-link>
          <router-link to="/library" class="btn btn-secondary">
            📚 Browse Library
          </router-link>
          <router-link to="/news" class="btn btn-secondary">
            📰 Read News
          </router-link>
          <router-link to="/contact" class="btn btn-secondary">
            💬 Contact Us
          </router-link>
        </div>
      </div>
      
      <div class="back-button">
        <button @click="goBack" class="btn btn-outline">
          ← Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  document.title = 'Page Not Found - Epictetus EE Team'
})

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found {
  text-align: center;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  max-width: 600px;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  color: var(--primary-color);
  opacity: 0.3;
  margin-bottom: 1rem;
  line-height: 1;
}

.not-found h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.error-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.suggestions {
  margin-bottom: 3rem;
}

.suggestions h3 {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.suggestion-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}

.suggestion-links .btn {
  text-decoration: none;
  min-width: 120px;
}

.btn-outline {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background-color: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
  
  .not-found h1 {
    font-size: 2rem;
  }
  
  .suggestion-links {
    flex-direction: column;
    align-items: center;
  }
  
  .suggestion-links .btn {
    width: 200px;
  }
}
</style>
