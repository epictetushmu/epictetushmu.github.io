<template>
  <ContentCard
    :title="book.title"
    :description="book.description"
    :imageSrc="book.coverUrl"
    :imageAlt="`Cover of ${book.title}`"
    :author="book.author"
    :category="book.category"
    :categoryColor="getCategoryColor(book.category)"
    :date="book.publishedDate"
    :tags="book.tags"
    :linkTo="bookLink"
    :variant="variant"
    :layout="layout"
    :elevation="elevation"
    :likeable="true"
    :likeCount="book.likes || 0"
    :isLiked="isBookLiked"
    :shareable="true"
    :showDefaultActions="showActions"
    @like="handleLike"
    @unlike="handleUnlike"
    @share="handleShare"
    class="book-card"
  >
    <!-- Custom book-specific content -->
    <template #actions>
      <div class="book-actions">
        <AppButton
          v-if="showReadButton"
          size="small"
          variant="outline"
          @click="handleRead"
          class="read-btn"
        >
          📖 Read
        </AppButton>
        
        <AppButton
          v-if="showDownloadButton"
          size="small"
          variant="outline"
          @click="handleDownload"
          class="download-btn"
        >
          📥 Download
        </AppButton>
        
        <AppButton
          v-if="showFavoriteButton"
          size="small"
          :variant="isFavorite ? 'solid' : 'outline'"
          @click="toggleFavorite"
          class="favorite-btn"
        >
          {{ isFavorite ? '⭐' : '☆' }}
        </AppButton>
      </div>
    </template>
    
    <!-- Book-specific metadata -->
    <div class="book-metadata">
      <div class="book-stats">
        <span v-if="book.pageCount" class="stat-item">
          <span class="stat-icon">📄</span>
          <span class="stat-text">{{ book.pageCount }} pages</span>
        </span>
        
        <span v-if="book.rating" class="stat-item">
          <span class="stat-icon">⭐</span>
          <span class="stat-text">{{ book.rating }}/5</span>
        </span>
        
        <span v-if="book.language" class="stat-item">
          <span class="stat-icon">🌐</span>
          <span class="stat-text">{{ book.language }}</span>
        </span>
        
        <span v-if="book.readingTime" class="stat-item">
          <span class="stat-icon">⏱️</span>
          <span class="stat-text">{{ book.readingTime }}</span>
        </span>
      </div>
      
      <!-- Reading Progress -->
      <div v-if="readingProgress !== null" class="reading-progress">
        <div class="progress-header">
          <span class="progress-label">Reading Progress</span>
          <span class="progress-percentage">{{ Math.round(readingProgress) }}%</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${readingProgress}%` }"
          ></div>
        </div>
      </div>
      
      <!-- Book Status -->
      <div v-if="book.status" class="book-status">
        <span :class="['status-badge', `status-badge--${book.status}`]">
          {{ getStatusText(book.status) }}
        </span>
      </div>
    </div>
    
    <!-- Genre tags (different styling from regular tags) -->
    <template #footer v-if="book.genres && book.genres.length">
      <div class="book-genres">
        <span class="genres-label">Genres:</span>
        <div class="genre-list">
          <span
            v-for="genre in book.genres"
            :key="genre"
            class="genre-tag"
          >
            {{ genre }}
          </span>
        </div>
      </div>
    </template>
  </ContentCard>
</template>

<script setup>
import { computed } from 'vue'
import ContentCard from '../common/ContentCard.vue'
import AppButton from '../ui/AppButton.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: value => ['default', 'compact', 'featured', 'minimal'].includes(value)
  },
  layout: {
    type: String,
    default: 'vertical',
    validator: value => ['vertical', 'horizontal', 'grid'].includes(value)
  },
  elevation: {
    type: Number,
    default: 1
  },
  showActions: {
    type: Boolean,
    default: true
  },
  showReadButton: {
    type: Boolean,
    default: true
  },
  showDownloadButton: {
    type: Boolean,
    default: true
  },
  showFavoriteButton: {
    type: Boolean,
    default: true
  },
  isBookLiked: {
    type: Boolean,
    default: false
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  readingProgress: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['like', 'unlike', 'share', 'read', 'download', 'favorite', 'unfavorite'])

// Computed properties
const bookLink = computed(() => {
  return `/library/book/${props.book.id || props.book.slug}`
})

// Methods
const getCategoryColor = (category) => {
  const colors = {
    'Philosophy': '#9C27B0',
    'Fiction': '#2196F3',
    'Non-Fiction': '#4CAF50',
    'Science': '#FF9800',
    'History': '#795548',
    'Biography': '#E91E63',
    'Technology': '#607D8B',
    'Arts': '#FF5722'
  }
  return colors[category] || '#2196F3'
}

const getStatusText = (status) => {
  const statusMap = {
    'available': 'Available',
    'reading': 'Currently Reading',
    'finished': 'Finished',
    'wishlist': 'On Wishlist',
    'borrowed': 'Borrowed',
    'reserved': 'Reserved'
  }
  return statusMap[status] || status
}

const handleLike = () => {
  emit('like', props.book)
}

const handleUnlike = () => {
  emit('unlike', props.book)
}

const handleShare = (shareData) => {
  emit('share', {
    ...shareData,
    book: props.book
  })
}

const handleRead = () => {
  emit('read', props.book)
}

const handleDownload = () => {
  emit('download', props.book)
}

const toggleFavorite = () => {
  if (props.isFavorite) {
    emit('unfavorite', props.book)
  } else {
    emit('favorite', props.book)
  }
}
</script>

<style scoped>
.book-card {
  --primary-color: #2196F3;
  position: relative;
}

.book-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.book-metadata {
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--background-secondary);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.book-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.stat-icon {
  font-size: 1rem;
}

.stat-text {
  font-weight: 500;
}

/* Reading Progress */
.reading-progress {
  margin-bottom: 1rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.progress-percentage {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-color);
}

.progress-bar {
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transition: width 0.3s ease;
  border-radius: 4px;
}

/* Book Status */
.book-status {
  margin-top: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge--available {
  background-color: var(--success-color);
  color: white;
}

.status-badge--reading {
  background-color: var(--primary-color);
  color: white;
}

.status-badge--finished {
  background-color: var(--secondary-color);
  color: white;
}

.status-badge--wishlist {
  background-color: var(--warning-color);
  color: white;
}

.status-badge--borrowed {
  background-color: var(--info-color);
  color: white;
}

.status-badge--reserved {
  background-color: var(--text-secondary);
  color: white;
}

/* Book Genres */
.book-genres {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.genres-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.genre-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.genre-tag {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: var(--transition);
  cursor: pointer;
}

.genre-tag:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

/* Responsive design */
@media (max-width: 768px) {
  .book-actions {
    flex-direction: column;
    gap: 0.25rem;
    align-items: stretch;
  }
  
  .book-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .book-genres {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .book-metadata {
    margin: 0.75rem 0;
    padding: 0.75rem;
  }
  
  .stat-item {
    font-size: 0.8rem;
  }
  
  .progress-label,
  .progress-percentage {
    font-size: 0.8rem;
  }
}

/* Enhanced hover effects for book cards */
.book-card:hover {
  --shadow-color: rgba(33, 150, 243, 0.2);
}

.book-card:hover .genre-tag {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

/* Featured book styling */
.book-card--featured {
  border: 2px solid var(--primary-color);
  background: linear-gradient(
    135deg,
    var(--background-primary) 0%,
    rgba(33, 150, 243, 0.05) 100%
  );
}

.book-card--featured::after {
  content: '⭐ Featured';
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
}
</style>
