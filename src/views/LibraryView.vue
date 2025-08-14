<template>
  <div class="page-container">
    <!-- Header Section -->
    <div class="library-header">
      <h1>Philosophy Library</h1>
      <p class="library-description">
        Explore our curated collection of Stoic philosophy texts, modern interpretations, and philosophical works
      </p>
    </div>

    <!-- Filter Section -->
    <div class="library-filters">
      <div class="filter-tabs">
        <button 
          v-for="category in categories" 
          :key="category"
          :class="['filter-tab', { active: selectedCategory === category }]"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search books..."
          class="search-input"
        >
        <span class="search-icon">🔍</span>
      </div>
    </div>

    <!-- Books Grid -->
    <div class="book-grid">
      <div 
        v-for="book in filteredBooks" 
        :key="book.id"
        class="book-card"
        @click="openModal(book)"
      >
        <div class="book-cover">
          <img :src="book.cover" :alt="book.title" />
        </div>
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <p class="author">{{ book.author }}</p>
          <span class="category">{{ book.category }}</span>
          <p class="book-excerpt">{{ book.description }}</p>
          <div class="book-meta">
            <span class="book-year">{{ book.year }}</span>
            <div class="book-rating">
              <span class="stars">★★★★★</span>
              <span>{{ book.rating }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredBooks.length === 0" class="empty-state">
      <div class="empty-icon">📚</div>
      <h3>No books found</h3>
      <p>Try adjusting your search or filter criteria</p>
    </div>

    <!-- Modal -->
    <div v-if="selectedBook" class="book-modal" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ selectedBook.title }}</h2>
          <button class="close" @click="closeModal">&times;</button>
        </div>
        <div class="book-detail">
          <div class="book-cover">
            <img :src="selectedBook.cover" :alt="selectedBook.title" />
          </div>
          <div class="book-info-detail">
            <p class="author">{{ selectedBook.author }}</p>
            <span class="category">{{ selectedBook.category }}</span>
            <p class="description">{{ selectedBook.description }}</p>
            <div class="action-buttons">
              <a :href="selectedBook.downloadUrl" class="download-btn">
                📥 Download
              </a>
              <button class="favorite-btn" @click="toggleFavorite(selectedBook)">
                ❤️ {{ selectedBook.isFavorite ? 'Remove from' : 'Add to' }} Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedBook = ref(null)

// Categories for filtering
const categories = ref(['All', 'Stoicism', 'Philosophy', 'Self-Help', 'Ancient Texts', 'Modern'])

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
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(book => book.category === selectedCategory.value)
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

  return filtered
})

// Methods
const openModal = (book) => {
  selectedBook.value = book
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedBook.value = null
  // Restore body scroll
  document.body.style.overflow = 'auto'
}

const toggleFavorite = (book) => {
  book.isFavorite = !book.isFavorite
  // In a real app, this would make an API call to update the favorite status
  console.log(`${book.title} ${book.isFavorite ? 'added to' : 'removed from'} favorites`)
}

// Lifecycle hooks
onMounted(() => {
  console.log('LibraryView mounted with', books.value.length, 'books')
})

// Clean up when component is unmounted
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.library {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.filter-bar {
  margin-bottom: 20px;
}

.filter-bar select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.book-card {
  background-color: var(--background-primary);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  cursor: pointer;
  border: 1px solid var(--border-color);
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.book-cover {
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.book-card:hover .book-cover img {
  transform: scale(1.05);
}

.book-info {
  padding: 1.5rem;
}

.book-info h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.author {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-style: italic;
  font-size: 0.9rem;
}

.category {
  background-color: var(--accent-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
}

/* Book excerpt with line clamping */
.book-excerpt {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Book metadata */
.book-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.book-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stars {
  color: #ffa726;
}

/* Modal Styles */
.book-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: var(--background-primary);
  border-radius: var(--border-radius);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
  margin: 0;
  color: var(--text-primary);
}

.close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition);
}

.close:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}

.book-detail {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
}

.book-info-detail {
  flex: 1;
}

.book-info-detail h2 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.book-info-detail .author {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.book-info-detail .category {
  margin-bottom: 1.5rem;
}

.description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.download-btn,
.favorite-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: var(--transition);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.download-btn {
  background-color: var(--primary-color);
  color: white;
}

.download-btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

.favorite-btn {
  background-color: var(--error-color);
  color: white;
}

.favorite-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .book-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .book-detail {
    flex-direction: column;
    gap: 1rem;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .modal-content {
    margin: 0.5rem;
    max-height: calc(100vh - 1rem);
  }
}

@media (max-width: 480px) {
  .book-info {
    padding: 1rem;
  }
  
  .book-detail {
    padding: 1rem;
  }
  
  .modal-header {
    padding: 1rem;
  }
}
</style>