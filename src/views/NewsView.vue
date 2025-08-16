<template>
  <div class="page-container">
    <!-- Header Section -->
    <PageHeader
      title="Latest News & Updates"
      description="Stay informed with the latest developments, insights, and announcements from the Epictetus EE Team"
      :breadcrumbs="breadcrumbs"
      :showBreadcrumbs="true"
    />

    <!-- Filter Section -->
    <FilterSection
      :categories="filterCategories"
      :defaultCategory="'all'"
      :showSearch="true"
      searchPlaceholder="Search news..."
      :showSort="true"
      :sortOptions="sortOptions"
      :showViewToggle="true"
      @update:category="handleCategoryChange"
      @update:search="handleSearchChange"
      @update:sort="handleSortChange"
      @update:view="handleViewChange"
    />

    <!-- News Grid -->
    <div v-if="filteredArticles.length > 0" :class="['news-container', `news-container--${currentView}`]">
      <NewsCard
        v-for="article in filteredArticles"
        :key="article.id"
        :article="transformArticleData(article)"
        :variant="currentView === 'list' ? 'compact' : 'default'"
        :layout="currentView === 'list' ? 'horizontal' : 'vertical'"
        :isArticleLiked="article.isLiked"
        :isSaved="article.isSaved"
        @read="handleArticleRead"
        @save="handleArticleSave"
        @unsave="handleArticleUnsave"
        @like="handleArticleLike"
        @unlike="handleArticleUnlike"
        @share="handleArticleShare"
        @view-source="handleViewSource"
        @topic-click="handleTopicClick"
      />
    </div>

    <!-- Load More Button -->
    <div class="load-more-section" v-if="hasMoreArticles && filteredArticles.length > 0">
      <AppButton
        variant="outline"
        size="large"
        @click="loadMore"
        :loading="loadingMore"
      >
        Load More Articles
      </AppButton>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">📰</div>
      <h3>No articles found</h3>
      <p>Try adjusting your search or filter criteria</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import FilterSection from '@/components/common/FilterSection.vue'
import NewsCard from '@/components/news/NewsCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs.js'

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('all')
const currentView = ref('grid')
const currentSort = ref('')
const hasMoreArticles = ref(true)
const loadingMore = ref(false)

// Navigation breadcrumbs
const { breadcrumbs } = useBreadcrumbs('News')

// Filter categories for FilterSection component
const filterCategories = ref([
  { value: 'all', label: 'All News', count: 6 },
  { value: 'updates', label: 'Updates', count: 2 },
  { value: 'philosophy', label: 'Philosophy', count: 2 },
  { value: 'technology', label: 'Technology', count: 1 },
  { value: 'community', label: 'Community', count: 1 }
])

// Sort options for FilterSection component
const sortOptions = ref([
  { value: 'date', label: 'Latest First' },
  { value: 'title', label: 'Title A-Z' },
  { value: 'author', label: 'Author A-Z' },
  { value: 'views', label: 'Most Viewed' }
])

// Sample news articles
const articles = ref([
  {
    id: 1,
    title: 'New Features Released: Enhanced User Experience',
    excerpt: 'We are excited to announce several new features that will improve your experience with our platform.',
    author: 'Development Team',
    category: 'updates',
    date: '2025-08-10',
    image: '/hmu.png',
    tags: ['features', 'ui', 'accessibility'],
    readingTime: '3 min',
    views: 1250,
    comments: 24,
    shares: 15,
    isLiked: false,
    isSaved: false,
    isBreaking: false,
    isTrending: true,
    topics: ['Product Updates', 'User Experience']
  },
  {
    id: 2,
    title: 'Stoic Philosophy in Modern Software Development',
    excerpt: 'How ancient Stoic principles can guide modern developers in creating better software.',
    author: 'Marcus Aurelius Jr.',
    category: 'philosophy',
    date: '2025-08-08',
    image: '/logo.jpg',
    tags: ['philosophy', 'development', 'productivity'],
    readingTime: '8 min',
    views: 892,
    comments: 18,
    shares: 32,
    isLiked: true,
    isSaved: true,
    isBreaking: false,
    isTrending: false,
    topics: ['Philosophy', 'Programming', 'Mindfulness']
  },
  {
    id: 3,
    title: 'Breaking: Major Platform Update Coming Soon',
    excerpt: 'A major platform update is scheduled for next week, bringing significant improvements.',
    author: 'Product Team',
    category: 'updates',
    date: '2025-08-05',
    image: '/logo.jpg',
    tags: ['breaking', 'update', 'platform'],
    readingTime: '4 min',
    views: 2100,
    comments: 45,
    shares: 67,
    isLiked: false,
    isSaved: true,
    isBreaking: true,
    isTrending: true,
    topics: ['Product Updates', 'Performance']
  }
])

// Computed properties
const filteredArticles = computed(() => {
  let filtered = articles.value

  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const transformArticleData = (article) => {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    author: article.author,
    category: article.category,
    publishedDate: article.date,
    imageUrl: article.image,
    tags: article.tags,
    readingTime: article.readingTime,
    views: article.views,
    comments: article.comments,
    shares: article.shares,
    likes: Math.floor(Math.random() * 100),
    isBreaking: article.isBreaking,
    isTrending: article.isTrending,
    topics: article.topics,
    contentTypes: article.isBreaking ? ['breaking'] : []
  }
}

const handleCategoryChange = (category) => {
  selectedCategory.value = category
}

const handleSearchChange = (query) => {
  searchQuery.value = query
}

const handleSortChange = (sortOption) => {
  currentSort.value = sortOption
}

const handleViewChange = (view) => {
  currentView.value = view
}

const handleArticleRead = (article) => {
  // Handle article reading logic
}

const handleArticleSave = (article) => {
  // Handle article save logic
}

const handleArticleUnsave = (article) => {
  // Handle article unsave logic
}

const handleArticleLike = (article) => {
  // Handle article like logic
}

const handleArticleUnlike = (article) => {
  // Handle article unlike logic
}

const handleArticleShare = (shareData) => {
  // Handle article sharing logic
}

const handleViewSource = (article) => {
  // Handle view source logic
}

const handleTopicClick = (topic) => {
  // Handle topic click logic
}

const loadMore = async () => {
  loadingMore.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  hasMoreArticles.value = false
  loadingMore.value = false
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.news-container {
  margin-top: 2rem;
}

.news-container--grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.news-container--list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.load-more-section {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.empty-state p {
  font-size: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
  
  .news-container--grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .page-container {
    padding: 0.5rem;
  }
}
</style>