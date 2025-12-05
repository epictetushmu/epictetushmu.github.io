<template>
  <div class="admin-section">
    <div class="section-header">
      <h2>Statistics</h2>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📰</div>
        <div class="stat-content">
          <h3>{{ articles.length }}</h3>
          <p>Total Articles</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">⭐</div>
        <div class="stat-content">
          <h3>{{ featuredArticlesCount }}</h3>
          <p>Featured Articles</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">👁️</div>
        <div class="stat-content">
          <h3>{{ totalViews }}</h3>
          <p>Total Views</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">❤️</div>
        <div class="stat-content">
          <h3>{{ totalLikes }}</h3>
          <p>Total Likes</p>
        </div>
      </div>
    </div>

    <div class="categories-overview">
      <h3>Articles by Category</h3>
      <div class="category-stats">
        <div 
          v-for="category in categoriesWithCounts" 
          :key="category.value"
          class="category-stat"
        >
          <span class="category-name">{{ category.label }}</span>
          <span class="category-count">{{ category.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useNewsStore } from '@/stores/news.js'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const newsStore = useNewsStore()

// Computed properties
const articles = computed(() => newsStore.articles)
const featuredArticlesCount = computed(() => 
  newsStore.featuredArticles.length
)
const totalViews = computed(() => 
  articles.value.reduce((sum, article) => sum + article.views, 0)
)
const totalLikes = computed(() => 
  articles.value.reduce((sum, article) => sum + article.likes, 0)
)
const categoriesWithCounts = computed(() => 
  newsStore.categories.filter(cat => cat.value !== 'all')
)

onMounted(() => {
  newsStore.clearError()
})
</script>

<style scoped>
/* Re-use styles from AdminView or define new ones if necessary */
.admin-section {
  background-color: var(--background-primary);
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: var(--shadow);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.section-header h2 {
  color: var(--text-primary);
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--background-secondary);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
}

.stat-icon {
  font-size: 2rem;
}

.stat-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.stat-content p {
  color: var(--text-secondary);
  margin: 0;
}

.categories-overview {
  margin-top: 2rem;
}

.categories-overview h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.category-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.category-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--background-secondary);
  border-radius: 0.375rem;
  border: 1px solid var(--border-color);
}

.category-name {
  font-weight: 500;
  color: var(--text-primary);
}

.category-count {
  font-weight: 600;
  color: var(--primary-color);
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
}
</style>
