<template>
  <div class="page-container">
    <!-- Page Title Section -->
    <div class="section-title">
      <h2>Latest News & Updates</h2>
      <p>Stay informed with the latest developments from the Epictetus - Lab of Experimental Ideas</p>
    </div>

    <!-- News Grid -->
    <div v-if="articles.length > 0" class="news-grid">
      <div v-for="article in articles" :key="article.id" class="news-card">
        <div class="news-image">
          <!-- Using a placeholder icon as imageUrl is not in the store data -->
          <span>{{ getIconForCategory(article.category) }}</span>
        </div>
        <div class="news-content">
          <div class="news-meta">
            <span class="news-category">{{ article.category }}</span>
            <span class="news-date">{{ article.publishedDate }}</span>
          </div>
          <h3 class="news-title">{{ article.title }}</h3>
          <p class="news-description">{{ article.description }}</p>
          <a href="#" class="btn btn-outline" @click.prevent="readMore(article)">Read More</a>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <h3>No articles found</h3>
      <p>There are currently no news articles available. Please check back later.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useNewsStore } from '@/stores/news.js';

// Access the news store
const newsStore = useNewsStore();

// Get articles from the store
const articles = computed(() => newsStore.articles);

// Method to get a representative icon for a category
const getIconForCategory = (category) => {
  switch (category.toLowerCase()) {
    case 'events': return '🏆';
    case 'research': return '🔬';
    case 'announcements': return '📢';
    default: return '📰';
  }
};

// Placeholder for read more functionality
const readMore = (article) => {
  alert(`Navigating to article: ${article.title}`);
  // In a real app, you would use Vue Router to navigate to the article's page
  // router.push({ name: 'ArticleDetail', params: { id: article.id } });
};
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

/* News Grid Styles */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3.5rem;
}

.news-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.news-image {
  height: 200px;
  background-color: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--secondary);
}

.news-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Allows the content to fill the card */
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--gray);
  margin-bottom: 1rem;
}

.news-category {
  font-weight: 600;
  color: var(--primary);
  background-color: #e0e7ff;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
}

.news-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--dark);
  line-height: 1.3;
}

.news-description {
  color: var(--gray);
  margin-bottom: 1.5rem;
  flex-grow: 1; /* Pushes the button to the bottom */
}

.news-content .btn {
  margin-top: auto; /* Aligns button to the bottom */
  align-self: flex-start; /* Prevents button from stretching full-width */
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--gray);
}

.empty-state h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--dark);
}
</style>
