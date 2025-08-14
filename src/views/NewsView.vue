<template>
  <div class="page-container">
    <!-- Header Section -->
    <div class="news-header">
      <h1>Latest News & Updates</h1>
      <p class="news-description">
        Stay informed with the latest developments, insights, and announcements from the Epictetus EE Team
      </p>
    </div>

    <!-- Filter Section -->
    <div class="news-filters">
      <div class="filter-tabs">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="['filter-tab', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          {{ category.name }}
        </button>
      </div>
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search news..."
          class="search-input"
        >
        <span class="search-icon">🔍</span>
      </div>
    </div>

    <!-- News Grid -->
    <div class="news-grid">
      <article 
        v-for="article in filteredArticles" 
        :key="article.id"
        class="news-card"
        @click="openArticle(article)"
      >
        <div class="news-image">
          <img :src="article.image" :alt="article.title" />
          <div class="news-category">{{ article.category }}</div>
        </div>
        <div class="news-content">
          <div class="news-meta">
            <span class="news-date">{{ formatDate(article.date) }}</span>
            <span class="news-author">By {{ article.author }}</span>
          </div>
          <h3 class="news-title">{{ article.title }}</h3>
          <p class="news-excerpt">{{ article.excerpt }}</p>
          <div class="news-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">
              #{{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- Load More Button -->
    <div class="load-more-section" v-if="hasMoreArticles">
      <button class="btn btn-secondary load-more-btn" @click="loadMore">
        Load More Articles
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="filteredArticles.length === 0" class="empty-state">
      <div class="empty-icon">📰</div>
      <h3>No articles found</h3>
      <p>Try adjusting your search or filter criteria</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const activeCategory = ref('all')
const searchQuery = ref('')
const hasMoreArticles = ref(true)

// Categories for filtering
const categories = ref([
  { id: 'all', name: 'All News' },
  { id: 'updates', name: 'Updates' },
  { id: 'philosophy', name: 'Philosophy' },
  { id: 'technology', name: 'Technology' },
  { id: 'community', name: 'Community' }
])

// Sample news articles (in a real app, this would come from an API)
const articles = ref([
  {
    id: 1,
    title: 'New Features Released: Enhanced User Experience',
    excerpt: 'We are excited to announce several new features that will improve your experience with our platform, including better navigation and enhanced accessibility.',
    content: 'Full article content would go here...',
    author: 'Epictetus Team',
    date: new Date('2025-08-10'),
    category: 'Updates',
    tags: ['features', 'ux', 'accessibility'],
    image: '/vite.svg'
  },
  {
    id: 2,
    title: 'Stoic Philosophy in Modern Technology',
    excerpt: 'Exploring how ancient Stoic principles can guide modern technology development and create more mindful digital experiences.',
    content: 'Full article content would go here...',
    author: 'Marcus Aurelius',
    date: new Date('2025-08-08'),
    category: 'Philosophy',
    tags: ['stoicism', 'technology', 'mindfulness'],
    image: '/logo.jpg'
  },
  {
    id: 3,
    title: 'Community Spotlight: User Success Stories',
    excerpt: 'Celebrating our amazing community members and their inspiring journeys with Stoic principles and personal growth.',
    content: 'Full article content would go here...',
    author: 'Community Team',
    date: new Date('2025-08-05'),
    category: 'Community',
    tags: ['community', 'success', 'inspiration'],
    image: '/vite.svg'
  },
  {
    id: 4,
    title: 'Platform Updates: Performance Improvements',
    excerpt: 'We have made significant performance improvements to ensure faster loading times and smoother user interactions across all devices.',
    content: 'Full article content would go here...',
    author: 'Development Team',
    date: new Date('2025-08-03'),
    category: 'Technology',
    tags: ['performance', 'updates', 'optimization'],
    image: '/logo.jpg'
  }
])

// Computed properties
const filteredArticles = computed(() => {
  let filtered = articles.value

  // Filter by category
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(article => 
      article.category.toLowerCase() === activeCategory.value
    )
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const openArticle = (article) => {
  // In a real app, this would navigate to a detailed article view
  console.log('Opening article:', article.title)
  // For now, just show an alert
  alert(`Article: ${article.title}\n\n${article.excerpt}`)
}

const loadMore = () => {
  // Simulate loading more articles
  console.log('Loading more articles...')
  hasMoreArticles.value = false
}

onMounted(() => {
  // Any initialization logic
  console.log('NewsView mounted')
})
</script>

<style scoped>
/* Header Section */
.news-header {
  text-align: center;
  margin-bottom: 3rem;
}

.news-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Filters Section */
.news-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-color: var(--background-primary);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 0.5rem 1rem;
  border: 2px solid var(--border-color);
  background-color: transparent;
  color: var(--text-secondary);
  border-radius: 50px;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;
  font-weight: 500;
}

.filter-tab:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-tab.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.search-box {
  position: relative;
  max-width: 300px;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 50px;
  font-size: 0.9rem;
  transition: var(--transition);
}

.search-input:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
}

/* News Grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.news-card {
  background-color: var(--background-primary);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  cursor: pointer;
  border: 1px solid var(--border-color);
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.news-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

.news-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
}

.news-content {
  padding: 1.5rem;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.news-date {
  font-weight: 500;
}

.news-author {
  font-style: italic;
}

.news-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.news-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.news-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background-color: var(--background-secondary);
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Load More Section */
.load-more-section {
  text-align: center;
  margin-bottom: 2rem;
}

.load-more-btn {
  padding: 1rem 2rem;
  font-size: 1rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .news-filters {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .filter-tabs {
    justify-content: center;
  }
  
  .search-box {
    max-width: none;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .news-card {
    max-width: none;
  }
  
  .news-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}

@media (max-width: 480px) {
  .filter-tabs {
    justify-content: flex-start;
  }
  
  .filter-tab {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  
  .news-content {
    padding: 1rem;
  }
}
</style>