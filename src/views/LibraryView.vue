<template>
  <div class="library">
    <h1>E-Library</h1>
    
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search books by title, author or keyword..."
        @input="searchBooks"
      >
    </div>
    
    <div class="filter-bar">
      <select v-model="categoryFilter" @change="filterBooks">
        <option value="">All Categories</option>
        <option value="programming">Programming</option>
        <option value="electronics">Electronics</option>
        <option value="physics">Physics</option>
        <option value="math">Mathematics</option>
      </select>
    </div>
    
    <div class="books-container">
      <div v-if="loading" class="loading">
        <p>Loading books...</p>
      </div>
      
      <div v-else-if="filteredBooks.length === 0" class="no-results">
        <p>No books found. Try a different search term.</p>
      </div>
      
      <div v-else class="book-grid">
        <div 
          v-for="book in filteredBooks" 
          :key="book.id" 
          class="book-card"
          @click="selectBook(book)"
        >
          <div class="book-cover">
            <img :src="book.coverUrl" :alt="book.title">
          </div>
          <div class="book-info">
            <h3>{{ book.title }}</h3>
            <p class="author">{{ book.author }}</p>
            <p class="category">{{ book.category }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Book Detail Modal -->
    <div v-if="selectedBook" class="book-modal">
      <div class="modal-content">
        <span class="close" @click="selectedBook = null">&times;</span>
        
        <div class="book-detail">
          <div class="book-cover">
            <img :src="selectedBook.coverUrl" :alt="selectedBook.title">
          </div>
          
          <div class="book-info-detail">
            <h2>{{ selectedBook.title }}</h2>
            <p><strong>Author:</strong> {{ selectedBook.author }}</p>
            <p><strong>Category:</strong> {{ selectedBook.category }}</p>
            <p><strong>Published:</strong> {{ selectedBook.publishedYear }}</p>
            <p><strong>Pages:</strong> {{ selectedBook.pages }}</p>
            <p class="description">{{ selectedBook.description }}</p>
            
            <div class="action-buttons">
              <a :href="selectedBook.downloadUrl" class="download-btn" target="_blank" rel="noopener">
                Download PDF
              </a>
              <button @click="addToFavorites(selectedBook)" class="favorite-btn">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const books = ref([
  {
    id: 1,
    title: 'Introduction to Electronics',
    author: 'John Smith',
    category: 'electronics',
    publishedYear: 2021,
    pages: 324,
    description: 'A comprehensive introduction to the world of electronics, covering basic components and circuit design principles.',
    coverUrl: 'https://via.placeholder.com/150x200?text=Electronics',
    downloadUrl: '#'
  },
  {
    id: 2,
    title: 'Modern Physics',
    author: 'Richard Feynman',
    category: 'physics',
    publishedYear: 2019,
    pages: 456,
    description: 'An in-depth exploration of modern physics principles, including quantum mechanics and relativity.',
    coverUrl: 'https://via.placeholder.com/150x200?text=Physics',
    downloadUrl: '#'
  },
  {
    id: 3,
    title: 'Advanced Circuit Design',
    author: 'Michael Johnson',
    category: 'electronics',
    publishedYear: 2020,
    pages: 512,
    description: 'This book covers advanced circuit design techniques for electronic engineers.',
    coverUrl: 'https://via.placeholder.com/150x200?text=Circuits',
    downloadUrl: '#'
  },
  {
    id: 4,
    title: 'Calculus for Engineers',
    author: 'Emily Chen',
    category: 'math',
    publishedYear: 2022,
    pages: 378,
    description: 'A practical guide to calculus applications in engineering problems.',
    coverUrl: 'https://via.placeholder.com/150x200?text=Calculus',
    downloadUrl: '#'
  },
  {
    id: 5,
    title: 'Python Programming',
    author: 'David Williams',
    category: 'programming',
    publishedYear: 2021,
    pages: 412,
    description: 'Learn Python programming from basics to advanced concepts with practical examples.',
    coverUrl: 'https://via.placeholder.com/150x200?text=Python',
    downloadUrl: '#'
  }
])

const searchQuery = ref('')
const categoryFilter = ref('')
const loading = ref(true)
const selectedBook = ref(null)
const favorites = ref([])

// Simulate loading data from API
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
  
  // Load favorites from localStorage if available
  const savedFavorites = localStorage.getItem('e-library-favorites')
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }
})

// Filter books based on search query and category
const filteredBooks = computed(() => {
  let result = books.value
  
  if (categoryFilter.value) {
    result = result.filter(book => book.category === categoryFilter.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(book => 
      book.title.toLowerCase().includes(query) || 
      book.author.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    )
  }
  
  return result
})

// Search books (can be debounced in real implementation)
const searchBooks = () => {
  // Real implementation would call an API endpoint
  console.log('Searching for:', searchQuery.value)
}

// Filter books by category
const filterBooks = () => {
  console.log('Filtering by category:', categoryFilter.value)
}

// Display book details
const selectBook = (book) => {
  selectedBook.value = book
}

// Add book to favorites
const addToFavorites = (book) => {
  const existingIndex = favorites.value.findIndex(fav => fav.id === book.id)
  
  if (existingIndex === -1) {
    favorites.value.push(book)
    localStorage.setItem('e-library-favorites', JSON.stringify(favorites.value))
    alert(`"${book.title}" added to favorites!`)
  } else {
    alert(`"${book.title}" is already in your favorites!`)
  }
}
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.book-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  cursor: pointer;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.book-cover {
  height: 200px;
  overflow: hidden;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-info {
  padding: 15px;
}

.book-info h3 {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 18px;
}

.author {
  color: #666;
  margin-bottom: 5px;
}

.category {
  background-color: #f0f0f0;
  color: #555;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  display: inline-block;
}

/* Modal styles */
.book-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 800px;
  border-radius: 5px;
  position: relative;
}

.close {
  color: #aaa;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.book-detail {
  display: flex;
  gap: 20px;
}

.book-info-detail {
  flex: 1;
}

.description {
  margin-top: 15px;
  line-height: 1.5;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.download-btn, .favorite-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.download-btn {
  background-color: #2196F3;
  color: white;
  text-decoration: none;
}

.favorite-btn {
  background-color: #f44336;
  color: white;
}

@media (max-width: 768px) {
  .book-detail {
    flex-direction: column;
  }
  
  .book-cover {
    height: auto;
  }
}
</style>