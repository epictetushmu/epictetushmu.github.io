<template>
  <ContentCard
    :title="article.title"
    :description="article.excerpt || article.summary"
    :imageSrc="article.imageUrl || article.featuredImage"
    :imageAlt="`${article.title} cover image`"
    :author="article.author"
    :source="article.source"
    :category="article.category"
    :categoryColor="getCategoryColor(article.category)"
    :date="article.publishedDate || article.createdAt"
    :tags="article.tags"
    :linkTo="articleLink"
    :variant="variant"
    :layout="layout"
    :elevation="elevation"
    :expandable="true"
    :maxDescriptionLength="maxDescriptionLength"
    :likeable="true"
    :likeCount="article.likes || 0"
    :isLiked="isArticleLiked"
    :shareable="true"
    :showDefaultActions="showActions"
    @like="handleLike"
    @unlike="handleUnlike"
    @share="handleShare"
    class="news-card"
  >
    <!-- News-specific actions -->
    <template #actions>
      <div class="news-actions">
        <AppButton
          v-if="showSaveButton"
          size="small"
          :variant="isSaved ? 'solid' : 'outline'"
          @click="toggleSave"
          class="save-btn"
        >
          {{ isSaved ? '🔖' : '📌' }} {{ isSaved ? 'Saved' : 'Save' }}
        </AppButton>
        
        <AppButton
          v-if="showSourceButton"
          size="small"
          variant="outline"
          @click="handleViewSource"
          class="source-btn"
        >
          🔗 Source
        </AppButton>
      </div>
    </template>
    
    <!-- News-specific metadata -->
    <div class="news-metadata">
      <!-- Reading time and engagement -->
      <div class="news-stats">
        <span v-if="article.readingTime" class="stat-item">
          <span class="stat-icon">⏱️</span>
          <span class="stat-text">{{ article.readingTime }} read</span>
        </span>
        
        <span v-if="article.views" class="stat-item">
          <span class="stat-icon">👁️</span>
          <span class="stat-text">{{ formatNumber(article.views) }} views</span>
        </span>
        
        <span v-if="article.comments" class="stat-item">
          <span class="stat-icon">💬</span>
          <span class="stat-text">{{ formatNumber(article.comments) }} comments</span>
        </span>
        
        <span v-if="article.shares" class="stat-item">
          <span class="stat-icon">📤</span>
          <span class="stat-text">{{ formatNumber(article.shares) }} shares</span>
        </span>
      </div>
      
      <!-- Article status and priority -->
      <div class="news-indicators">
        <span v-if="article.isBreaking" class="breaking-news">
          🚨 Breaking News
        </span>
        
        <span v-if="article.isSponsored" class="sponsored-tag">
          💼 Sponsored
        </span>
        
        <span v-if="article.isTrending" class="trending-tag">
          📈 Trending
        </span>
        
        <span v-if="article.priority === 'high'" class="priority-tag">
          ⚡ Priority
        </span>
      </div>
      
      <!-- Content type indicators -->
      <div v-if="article.contentTypes && article.contentTypes.length" class="content-types">
        <span
          v-for="type in article.contentTypes"
          :key="type"
          :class="['content-type', `content-type--${type}`]"
        >
          {{ getContentTypeIcon(type) }} {{ getContentTypeLabel(type) }}
        </span>
      </div>
    </div>
    
    <!-- Related topics -->
    <template #footer v-if="article.topics && article.topics.length">
      <div class="news-topics">
        <span class="topics-label">Related Topics:</span>
        <div class="topic-list">
          <button
            v-for="topic in article.topics"
            :key="topic"
            class="topic-tag"
            @click="handleTopicClick(topic)"
          >
            {{ topic }}
          </button>
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
  article: {
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
  showSaveButton: {
    type: Boolean,
    default: true
  },
  showSourceButton: {
    type: Boolean,
    default: true
  },
  isArticleLiked: {
    type: Boolean,
    default: false
  },
  isSaved: {
    type: Boolean,
    default: false
  },
  maxDescriptionLength: {
    type: Number,
    default: 200
  }
})

const emit = defineEmits(['like', 'unlike', 'share', 'save', 'unsave', 'view-source', 'topic-click'])

// Computed properties
const articleLink = computed(() => {
  return `/news/article/${props.article.id || props.article.slug}`
})

// Methods
const getCategoryColor = (category) => {
  const colors = {
    'Breaking': '#F44336',
    'Politics': '#3F51B5',
    'Technology': '#2196F3',
    'Science': '#4CAF50',
    'Business': '#FF9800',
    'Sports': '#9C27B0',
    'Entertainment': '#E91E63',
    'Health': '#00BCD4',
    'Environment': '#8BC34A',
    'Education': '#795548'
  }
  return colors[category] || '#2196F3'
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num?.toString() || '0'
}

const getContentTypeIcon = (type) => {
  const icons = {
    'video': '🎥',
    'audio': '🎵',
    'gallery': '🖼️',
    'live': '🔴',
    'interactive': '🎮',
    'opinion': '💭',
    'analysis': '📊',
    'interview': '🎤'
  }
  return icons[type] || '📄'
}

const getContentTypeLabel = (type) => {
  const labels = {
    'video': 'Video',
    'audio': 'Audio',
    'gallery': 'Photo Gallery',
    'live': 'Live Coverage',
    'interactive': 'Interactive',
    'opinion': 'Opinion',
    'analysis': 'Analysis',
    'interview': 'Interview'
  }
  return labels[type] || type
}

const handleLike = () => {
  emit('like', props.article)
}

const handleUnlike = () => {
  emit('unlike', props.article)
}

const handleShare = (shareData) => {
  emit('share', {
    ...shareData,
    article: props.article
  })
}

const toggleSave = () => {
  if (props.isSaved) {
    emit('unsave', props.article)
  } else {
    emit('save', props.article)
  }
}

const handleViewSource = () => {
  emit('view-source', props.article)
}

const handleTopicClick = (topic) => {
  emit('topic-click', topic)
}
</script>

<style scoped>
.news-card {
  --primary-color: #2196F3;
  position: relative;
}

.news-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.news-metadata {
  margin: 1rem 0;
  padding: 1rem;
  background-color: var(--background-secondary);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
}

.news-stats {
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

/* News Indicators */
.news-indicators {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.breaking-news {
  background: linear-gradient(135deg, #F44336, #E53935);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: pulse 2s infinite;
}

.sponsored-tag {
  background-color: #FF9800;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
}

.trending-tag {
  background: linear-gradient(135deg, #E91E63, #AD1457);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
}

.priority-tag {
  background: linear-gradient(135deg, #9C27B0, #7B1FA2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Content Types */
.content-types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.content-type {
  background-color: var(--background-primary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.content-type--video {
  border-color: #F44336;
  color: #F44336;
}

.content-type--audio {
  border-color: #9C27B0;
  color: #9C27B0;
}

.content-type--gallery {
  border-color: #FF9800;
  color: #FF9800;
}

.content-type--live {
  border-color: #F44336;
  color: #F44336;
  animation: blink 1s infinite;
}

.content-type--interactive {
  border-color: #4CAF50;
  color: #4CAF50;
}

.content-type--opinion {
  border-color: #2196F3;
  color: #2196F3;
}

.content-type--analysis {
  border-color: #795548;
  color: #795548;
}

.content-type--interview {
  border-color: #607D8B;
  color: #607D8B;
}

/* News Topics */
.news-topics {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.topics-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.topic-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.topic-tag:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-1px);
}

/* Responsive design */
@media (max-width: 768px) {
  .news-actions {
    flex-direction: column;
    gap: 0.25rem;
    align-items: stretch;
  }
  
  .news-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .news-indicators {
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
  }
  
  .news-topics {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .news-metadata {
    margin: 0.75rem 0;
    padding: 0.75rem;
  }
  
  .stat-item {
    font-size: 0.8rem;
  }
  
  .breaking-news,
  .sponsored-tag,
  .trending-tag,
  .priority-tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
}

/* Animations */
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0.5;
  }
}

/* Enhanced styling for breaking news */
.news-card:has(.breaking-news) {
  border: 2px solid #F44336;
  box-shadow: 0 0 10px rgba(244, 67, 54, 0.3);
}

.news-card:has(.breaking-news)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #F44336, #E53935, #F44336);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Enhanced hover effects for news cards */
.news-card:hover {
  --shadow-color: rgba(33, 150, 243, 0.2);
}

.news-card:hover .topic-tag {
  border-color: var(--secondary-color);
  color: var(--secondary-color);
}

/* Featured news styling */
.news-card--featured {
  background: linear-gradient(
    135deg,
    var(--background-primary) 0%,
    rgba(33, 150, 243, 0.05) 100%
  );
}

.news-card--featured .breaking-news {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #333;
}
</style>
