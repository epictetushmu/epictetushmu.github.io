<template>
  <div class="page-container">
    <!-- Header Section -->
    <PageHeader
      title="Philosophy Library"
      description="Explore our curated collection of Stoic philosophy texts, modern interpretations, and philosophical works"
      :breadcrumbs="breadcrumbs"
      :showBreadcrumbs="true"
    />

    <!-- Filter Section -->
    <FilterSection
      :categories="filterCategories"
      :defaultCategory="'all'"
      :showSearch="true"
      searchPlaceholder="Search books..."
      :showSort="true"
      :sortOptions="sortOptions"
      :showViewToggle="true"
      @update:category="handleCategoryChange"
      @update:search="handleSearchChange"
      @update:sort="handleSortChange"
      @update:view="handleViewChange"
    />
    
    <!-- Books Grid -->
    <div v-if="filteredBooks.length > 0" :class="['books-container', `books-container--${currentView}`]">
      <BookCard
        v-for="book in filteredBooks"
        :key="book.id"
        :book="transformBookData(book)"
        :variant="currentView === 'list' ? 'compact' : 'default'"
        :layout="currentView === 'list' ? 'horizontal' : 'vertical'"
        :isBookLiked="book.isFavorite"
        :isFavorite="book.isFavorite"
        @read="handleBookRead"
        @download="handleBookDownload"
        @favorite="handleBookFavorite"
        @unfavorite="handleBookUnfavorite"
        @like="handleBookLike"
        @unlike="handleBookUnlike"
        @share="handleBookShare"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">📚</div>
      <h3>No books found</h3>
      <p>Try adjusting your search or filter criteria</p>
    </div>

    <!-- Book Detail Modal -->
    <AppModal
      v-if="selectedBook"
      :isOpen="!!selectedBook"
      @close="closeModal"
      title="Book Details"
      size="large"
    >
      <div class="book-detail-modal">
        <div class="book-cover-large">
          <img :src="selectedBook.cover" :alt="selectedBook.title" />
        </div>
        <div class="book-info-detail">
          <h2>{{ selectedBook.title }}</h2>
          <p class="author">By {{ selectedBook.author }}</p>
          <span class="category-badge">{{ selectedBook.category }}</span>
          <p class="description">{{ selectedBook.description }}</p>
          
          <div class="book-stats">
            <div class="stat">
              <span class="label">Published:</span>
              <span class="value">{{ selectedBook.year }}</span>
            </div>
            <div class="stat">
              <span class="label">Rating:</span>
              <span class="value">⭐ {{ selectedBook.rating }}/5</span>
            </div>
          </div>
          
          <div class="modal-actions">
            <AppButton
              variant="solid"
              size="medium"
              @click="handleBookRead(selectedBook)"
            >
              📖 Read Now
            </AppButton>
            <AppButton
              variant="outline"
              size="medium"
              @click="handleBookDownload(selectedBook)"
            >
              📥 Download
            </AppButton>
            <AppButton
              :variant="selectedBook.isFavorite ? 'solid' : 'outline'"
              size="medium"
              @click="toggleFavorite(selectedBook)"
            >
              {{ selectedBook.isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites' }}
            </AppButton>
          </div>
        </div>
      </div>
    </AppModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import FilterSection from '@/components/common/FilterSection.vue'
import BookCard from '@/components/library/BookCard.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs.js'

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedBook = ref(null)
const currentView = ref('grid')
const currentSort = ref('')

// Navigation breadcrumbs
const { breadcrumbs } = useBreadcrumbs('Library')

// Filter categories for FilterSection component
const filterCategories = ref([
  { value: 'all', label: 'All Books', count: 6 },
  { value: 'stoicism', label: 'Stoicism', count: 3 },
  { value: 'philosophy', label: 'Philosophy', count: 1 },
  { value: 'self-help', label: 'Self-Help', count: 1 },
  { value: 'modern', label: 'Modern', count: 1 }
])

// Sort options for FilterSection component
const sortOptions = ref([
  { value: 'title', label: 'Title A-Z' },
  { value: 'author', label: 'Author A-Z' },
  { value: 'year', label: 'Publication Year' },
  { value: 'rating', label: 'Highest Rated' }
])

// Sample books data (in a real app, this would come from an API)
const books = ref([
  {
    id: 1,
    title: 'Meditations',
    author: 'Marcus Aurelius',
    category: 'Stoicism',
    year: '180 AD',
    rating: 4.8,
    cover: '/logo.jpg',
    description: 'A series of personal writings by Marcus Aurelius, Roman Emperor from 161 to 180 AD, recording his private notes to himself and ideas on Stoic philosophy.',
    downloadUrl: '#',
    isFavorite: false
  },
  {
    id: 2,
    title: 'The Enchiridion',
    author: 'Epictetus',
    category: 'Stoicism',
    year: '135 AD',
    rating: 4.7,
    cover: '/vite.svg',
    description: 'A short manual of Stoic ethical advice compiled by Arrian, a student of Epictetus. It teaches practical wisdom for daily life.',
    downloadUrl: '#',
    isFavorite: true
  },
  {
    id: 3,
    title: 'Letters to Lucilius',
    author: 'Seneca',
    category: 'Stoicism',
    year: '65 AD',
    rating: 4.6,
    cover: '/logo.jpg',
    description: 'A collection of 124 letters written by Seneca the Younger to his friend Lucilius Junior, discussing Stoic philosophy and practical wisdom.',
    downloadUrl: '#',
    isFavorite: false
  },
  {
    id: 4,
    title: 'The Obstacle Is the Way',
    author: 'Ryan Holiday',
    category: 'Modern',
    year: '2014',
    rating: 4.5,
    cover: '/vite.svg',
    description: 'A modern interpretation of Stoic philosophy, showing how ancient wisdom can help us turn trials into triumphs and obstacles into opportunities.',
    downloadUrl: '#',
    isFavorite: false
  },
  {
    id: 5,
    title: 'A Guide to the Good Life',
    author: 'William Irvine',
    category: 'Philosophy',
    year: '2008',
    rating: 4.4,
    cover: '/logo.jpg',
    description: 'An accessible introduction to Stoic philosophy that shows how ancient techniques can help us live more fulfilling lives in the modern world.',
    downloadUrl: '#',
    isFavorite: true
  },
  {
    id: 6,
    title: 'How to Be a Stoic',
    author: 'Massimo Pigliucci',
    category: 'Self-Help',
    year: '2017',
    rating: 4.3,
    cover: '/vite.svg',
    description: 'A practical guide to applying Stoic principles in daily life, combining ancient wisdom with modern psychology and philosophy.',
    downloadUrl: '#',
    isFavorite: false
  }
])

// Computed properties
const filteredBooks = computed(() => {
  let filtered = books.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(book => 
      book.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    )
  }

  // Sort by selected option
  if (currentSort.value) {
    filtered = [...filtered].sort((a, b) => {
      switch (currentSort.value) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'author':
          return a.author.localeCompare(b.author)
        case 'year':
          return new Date(b.year).getTime() - new Date(a.year).getTime()
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })
  }

  return filtered
})

// Methods
const transformBookData = (book) => {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    description: book.description,
    category: book.category,
    publishedDate: book.year,
    rating: book.rating,
    coverUrl: book.cover,
    tags: [book.category],
    pageCount: Math.floor(Math.random() * 500) + 100, // Mock data
    language: 'English',
    readingTime: `${Math.floor(Math.random() * 10) + 5} hours`,
    status: 'available'
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

const handleBookRead = (book) => {
  // Handle book reading logic here
}

const handleBookDownload = (book) => {
  // Handle book download logic here
}

const handleBookFavorite = (book) => {
  const bookIndex = books.value.findIndex(b => b.id === book.id)
  if (bookIndex !== -1) {
    books.value[bookIndex].isFavorite = true
  }
}

const handleBookUnfavorite = (book) => {
  const bookIndex = books.value.findIndex(b => b.id === book.id)
  if (bookIndex !== -1) {
    books.value[bookIndex].isFavorite = false
  }
}

const handleBookLike = (book) => {
  console.log('Liked book:', book.title)
  // Implement like logic
}

const handleBookUnlike = (book) => {
  // Implement unlike logic
}

const handleBookShare = (shareData) => {
  // Implement share logic
  if (navigator.share) {
    navigator.share({
      title: shareData.title,
      text: shareData.description,
      url: window.location.href
    })
  }
}

const openModal = (book) => {
  selectedBook.value = book
}

const closeModal = () => {
  selectedBook.value = null
}

const toggleFavorite = (book) => {
  const bookIndex = books.value.findIndex(b => b.id === book.id)
  if (bookIndex !== -1) {
    books.value[bookIndex].isFavorite = !books.value[bookIndex].isFavorite
  }
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Books Container */
.books-container {
  margin-top: 2rem;
}

.books-container--grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.books-container--list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

/* Book Detail Modal */
.book-detail-modal {
  display: flex;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.book-cover-large {
  flex: 0 0 250px;
}

.book-cover-large img {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
}

.book-info-detail {
  flex: 1;
}

.book-info-detail h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.book-info-detail .author {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.category-badge {
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.book-info-detail .description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.book-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--background-secondary);
  border-radius: var(--border-radius);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat .label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat .value {
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 600;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Responsive design */
@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
  
  .books-container--grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .book-detail-modal {
    flex-direction: column;
    gap: 1rem;
  }
  
  .book-cover-large {
    flex: none;
    max-width: 200px;
    margin: 0 auto;
  }
  
  .book-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .page-container {
    padding: 0.5rem;
  }
  
  .book-detail-modal {
    padding: 1rem;
  }
  
  .book-info-detail h2 {
    font-size: 1.5rem;
  }
}
</style>