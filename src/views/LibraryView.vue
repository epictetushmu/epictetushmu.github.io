<template>
  <div class="page-container">
    <!-- Page Title Section -->
    <div class="section-title">
      <h2>E-Library</h2>
      <p>Explore our curated collection of electronic engineering resources from Epictetus - Lab of Experimental Ideas</p>
    </div>

    <!-- Books Grid -->
    <div v-if="filteredBooks.length > 0" class="books-grid">
      <div v-for="book in filteredBooks" :key="book.id" class="book-card">
        <div class="book-cover">
          <!-- Using placeholder image as book.cover paths are not valid -->
          <img :src="getPlaceholderCover(book.id)" :alt="book.title">
        </div>
        <div class="book-info">
          <span class="book-category">{{ book.category }}</span>
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">By {{ book.author }}</p>
          <div class="book-actions">
            <a :href="book.downloadUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Download</a>
            <button class="btn btn-outline" @click="viewDetails(book)">Details</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <h3>No books found</h3>
      <p>The library is currently empty or your search returned no results.</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- DATA ---
// Using the same local data structure for consistency.
// In a real app, this would come from a store or API.
const books = ref([
  {
    id: 1,
    title: 'Fundamentals of Electric Circuits',
    author: 'Charles K. Alexander, Matthew N. O. Sadiku',
    category: 'Circuit Theory',
    year: '2016',
    rating: 4.7,
    description: 'A comprehensive text that covers the fundamentals of circuit theory.',
    downloadUrl: '#',
    isFavorite: false
  },
  {
    id: 2,
    title: 'Microelectronic Circuits',
    author: 'Adel S. Sedra, Kenneth C. Smith',
    category: 'Electronics',
    year: '2014',
    rating: 4.8,
    description: 'Known for its clear explanations and extensive problem sets.',
    downloadUrl: '#',
    isFavorite: true
  },
  {
    id: 3,
    title: 'Signals and Systems',
    author: 'Alan V. Oppenheim, Alan S. Willsky',
    category: 'Signal Processing',
    year: '1996',
    rating: 4.6,
    description: 'A classic textbook for understanding signals, systems, and signal processing.',
    downloadUrl: '#',
    isFavorite: false
  },
  {
    id: 4,
    title: 'Digital Design',
    author: 'M. Morris Mano',
    category: 'Digital Logic',
    year: '2012',
    rating: 4.5,
    description: 'Provides a clear and accessible approach to the basic tools for the design of digital circuits.',
    downloadUrl: '#',
    isFavorite: false
  }
]);

// --- COMPUTED ---
// A simplified filter, can be expanded later
const filteredBooks = computed(() => {
  return books.value;
});

// --- METHODS ---
const viewDetails = (book) => {
  alert(`Showing details for: ${book.title}\n\nDescription: ${book.description}`);
};

const getPlaceholderCover = (id) => {
  // Simple function to get different placeholder colors
  const colors = ['1e40af', '0ea5e9', '8b5cf6', 'f59e0b', '10b981'];
  const color = colors[id % colors.length];
  return `https://placehold.co/400x600/${color}/white?text=Book`;
};

</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

/* Books Grid Styles */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-top: 3.5rem;
}

.book-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.book-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.book-cover {
  height: 380px;
  background-color: var(--light-gray);
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.book-category {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.book-title {
  font-size: 1.35rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
  line-height: 1.3;
  flex-grow: 1;
}

.book-author {
  color: var(--gray);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.book-actions {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.book-actions .btn {
  flex-grow: 1;
  font-size: 0.9rem;
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