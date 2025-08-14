<template>
  <article class="content-card" :class="cardClasses">
    <!-- Card Header -->
    <header v-if="showHeader" class="card-header">
      <!-- Title Section -->
      <div class="card-title-section">
        <div v-if="category || date" class="card-meta">
          <span v-if="category" class="card-category" :style="categoryStyle">
            {{ category }}
          </span>
          <span v-if="date" class="card-date">
            {{ formattedDate }}
          </span>
        </div>
        
        <h3 v-if="title" class="card-title">
          <component
            :is="linkTo ? 'router-link' : 'span'"
            :to="linkTo"
            class="title-link"
          >
            {{ title }}
          </component>
        </h3>
        
        <p v-if="subtitle" class="card-subtitle">
          {{ subtitle }}
        </p>
      </div>
      
      <!-- Actions -->
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions" />
      </div>
    </header>
    
    <!-- Card Media -->
    <div v-if="imageSrc || $slots.media" class="card-media" :class="mediaClasses">
      <slot name="media">
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="imageAlt || title || 'Card image'"
          class="card-image"
          :loading="imageLoading"
        >
      </slot>
      
      <!-- Media Overlay -->
      <div v-if="$slots.overlay" class="media-overlay">
        <slot name="overlay" />
      </div>
    </div>
    
    <!-- Card Content -->
    <div class="card-content" :class="contentClasses">
      <!-- Badge/Status -->
      <div v-if="badge || status" class="card-badges">
        <span v-if="badge" class="card-badge" :class="`card-badge--${badgeVariant}`">
          {{ badge }}
        </span>
        <span v-if="status" class="card-status" :class="`card-status--${status}`">
          {{ statusText || status }}
        </span>
      </div>
      
      <!-- Main Content -->
      <div class="card-body">
        <!-- Title (if not in header) -->
        <h3 v-if="title && !showHeader" class="card-title card-title--inline">
          <component
            :is="linkTo ? 'router-link' : 'span'"
            :to="linkTo"
            class="title-link"
          >
            {{ title }}
          </component>
        </h3>
        
        <!-- Description -->
        <p v-if="description" class="card-description">
          {{ truncatedDescription }}
          <button
            v-if="showExpandToggle"
            @click="toggleExpanded"
            class="expand-toggle"
          >
            {{ isExpanded ? 'Show less' : 'Show more' }}
          </button>
        </p>
        
        <!-- Custom Content -->
        <div v-if="$slots.default" class="card-custom-content">
          <slot />
        </div>
        
        <!-- Tags -->
        <div v-if="tags && tags.length" class="card-tags">
          <span
            v-for="tag in tags"
            :key="tag"
            class="card-tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      
      <!-- Card Footer -->
      <footer v-if="showFooter" class="card-footer">
        <!-- Author/Source -->
        <div v-if="author || source" class="card-author">
          <img
            v-if="authorAvatar"
            :src="authorAvatar"
            :alt="author"
            class="author-avatar"
          >
          <div class="author-info">
            <span v-if="author" class="author-name">{{ author }}</span>
            <span v-if="source" class="author-source">{{ source }}</span>
          </div>
        </div>
        
        <!-- Footer Actions -->
        <div v-if="$slots.footer || showDefaultActions" class="footer-actions">
          <slot name="footer">
            <!-- Default Actions -->
            <div v-if="showDefaultActions" class="default-actions">
              <button
                v-if="likeable"
                @click="toggleLike"
                class="action-btn"
                :class="{ 'action-btn--active': isLiked }"
                :aria-label="isLiked ? 'Unlike' : 'Like'"
              >
                ❤️ {{ likeCount }}
              </button>
              
              <button
                v-if="shareable"
                @click="handleShare"
                class="action-btn"
                aria-label="Share"
              >
                📤 Share
              </button>
              
              <router-link
                v-if="linkTo"
                :to="linkTo"
                class="action-btn action-btn--primary"
              >
                {{ linkText || 'Read More' }}
              </router-link>
            </div>
          </slot>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  imageSrc: {
    type: String,
    default: ''
  },
  imageAlt: {
    type: String,
    default: ''
  },
  imageLoading: {
    type: String,
    default: 'lazy',
    validator: value => ['lazy', 'eager'].includes(value)
  },
  category: {
    type: String,
    default: ''
  },
  categoryColor: {
    type: String,
    default: ''
  },
  date: {
    type: [String, Date],
    default: null
  },
  author: {
    type: String,
    default: ''
  },
  authorAvatar: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    default: ''
  },
  tags: {
    type: Array,
    default: () => []
  },
  badge: {
    type: String,
    default: ''
  },
  badgeVariant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value)
  },
  status: {
    type: String,
    default: ''
  },
  statusText: {
    type: String,
    default: ''
  },
  linkTo: {
    type: [String, Object],
    default: null
  },
  linkText: {
    type: String,
    default: 'Read More'
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
    default: 1,
    validator: value => value >= 0 && value <= 5
  },
  expandable: {
    type: Boolean,
    default: false
  },
  maxDescriptionLength: {
    type: Number,
    default: 150
  },
  likeable: {
    type: Boolean,
    default: false
  },
  likeCount: {
    type: Number,
    default: 0
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  shareable: {
    type: Boolean,
    default: false
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showDefaultActions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['like', 'unlike', 'share'])

// Reactive state
const isExpanded = ref(false)

// Computed properties
const cardClasses = computed(() => [
  'content-card',
  `content-card--${props.variant}`,
  `content-card--${props.layout}`,
  `content-card--elevation-${props.elevation}`,
  {
    'content-card--clickable': props.linkTo,
    'content-card--expanded': isExpanded.value
  }
])

const mediaClasses = computed(() => [
  'card-media',
  `card-media--${props.layout}`
])

const contentClasses = computed(() => [
  'card-content',
  `card-content--${props.variant}`
])

const formattedDate = computed(() => {
  if (!props.date) return ''
  
  // Handle string dates that might not be valid Date objects
  let date
  if (props.date instanceof Date) {
    date = props.date
  } else {
    // Try to parse the date, but handle cases like "180 AD" or other non-standard formats
    const dateStr = String(props.date)
    
    // If it's just a year (like "2014" or "180 AD"), return it as-is
    if (dateStr.match(/^\d{1,4}(\s*(AD|BC|CE|BCE))?$/i)) {
      return dateStr
    }
    
    // Try to create a Date object
    date = new Date(dateStr)
    
    // If the date is invalid, return the original string
    if (isNaN(date.getTime())) {
      return dateStr
    }
  }
  
  // Format valid dates
  if (isNaN(date.getTime())) {
    return String(props.date)
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
})

const categoryStyle = computed(() => {
  if (!props.categoryColor) return {}
  return {
    backgroundColor: props.categoryColor,
    color: 'white'
  }
})

const truncatedDescription = computed(() => {
  if (!props.description) return ''
  
  if (!props.expandable || isExpanded.value) {
    return props.description
  }
  
  if (props.description.length <= props.maxDescriptionLength) {
    return props.description
  }
  
  return props.description.substring(0, props.maxDescriptionLength) + '...'
})

const showExpandToggle = computed(() => {
  return props.expandable && 
         props.description && 
         props.description.length > props.maxDescriptionLength
})

// Methods
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const toggleLike = () => {
  if (props.isLiked) {
    emit('unlike')
  } else {
    emit('like')
  }
}

const handleShare = () => {
  emit('share', {
    title: props.title,
    description: props.description,
    url: window.location.href
  })
}
</script>

<style scoped>
.content-card {
  background-color: var(--background-primary);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: var(--transition);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

/* Elevation levels */
.content-card--elevation-0 {
  box-shadow: none;
}

.content-card--elevation-1 {
  box-shadow: var(--shadow);
}

.content-card--elevation-2 {
  box-shadow: var(--shadow-md);
}

.content-card--elevation-3 {
  box-shadow: var(--shadow-lg);
}

.content-card--elevation-4 {
  box-shadow: var(--shadow-xl);
}

.content-card--elevation-5 {
  box-shadow: var(--shadow-2xl);
}

.content-card--clickable {
  cursor: pointer;
}

.content-card--clickable:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Layout variants */
.content-card--horizontal {
  flex-direction: row;
}

.content-card--horizontal .card-media {
  flex: 0 0 40%;
  max-width: 40%;
}

.content-card--horizontal .card-content {
  flex: 1;
}

/* Card variants */
.content-card--compact {
  border-radius: var(--border-radius);
}

.content-card--compact .card-content {
  padding: 1rem;
}

.content-card--featured {
  border: 2px solid var(--primary-color);
  position: relative;
}

.content-card--featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
}

.content-card--minimal {
  border: none;
  box-shadow: none;
  background: transparent;
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 0;
  gap: 1rem;
}

.card-title-section {
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.card-category {
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-date {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.card-title--inline {
  margin-bottom: 0.75rem;
}

.title-link {
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}

.title-link:hover {
  color: var(--primary-color);
}

.card-subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.4;
}

.card-actions {
  flex-shrink: 0;
}

/* Card Media */
.card-media {
  position: relative;
  overflow: hidden;
}

.card-media--horizontal {
  height: 100%;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: var(--transition);
}

.content-card--featured .card-image {
  height: 250px;
}

.content-card--compact .card-image {
  height: 150px;
}

.content-card--clickable:hover .card-image {
  transform: scale(1.05);
}

.media-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  color: white;
}

/* Card Content */
.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-content--compact {
  padding: 1rem;
}

.card-content--minimal {
  padding: 1rem 0;
}

.card-badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-badge--primary {
  background-color: var(--primary-color);
  color: white;
}

.card-badge--secondary {
  background-color: var(--secondary-color);
  color: white;
}

.card-badge--success {
  background-color: var(--success-color);
  color: white;
}

.card-badge--warning {
  background-color: var(--warning-color);
  color: white;
}

.card-badge--error {
  background-color: var(--error-color);
  color: white;
}

.card-status {
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid;
}

.card-status--published {
  color: var(--success-color);
  border-color: var(--success-color);
  background-color: rgba(76, 175, 80, 0.1);
}

.card-status--draft {
  color: var(--warning-color);
  border-color: var(--warning-color);
  background-color: rgba(255, 193, 7, 0.1);
}

.card-status--archived {
  color: var(--text-secondary);
  border-color: var(--border-color);
  background-color: var(--background-secondary);
}

.card-body {
  flex: 1;
}

.card-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.expand-toggle {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 500;
  margin-left: 0.5rem;
  transition: var(--transition);
}

.expand-toggle:hover {
  text-decoration: underline;
}

.card-custom-content {
  margin-bottom: 1rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.card-tag {
  background-color: var(--background-secondary);
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  transition: var(--transition);
}

.card-tag:hover {
  background-color: var(--primary-color);
  color: white;
}

/* Card Footer */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  background-color: var(--background-secondary);
  margin-top: auto;
}

.content-card--compact .card-footer {
  padding: 0.75rem 1rem;
}

.content-card--minimal .card-footer {
  background: transparent;
  border-top: none;
  padding: 1rem 0 0;
}

.card-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.author-source {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.footer-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.default-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.action-btn {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.875rem;
  transition: var(--transition);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.action-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.action-btn--active {
  background-color: var(--error-color);
  border-color: var(--error-color);
  color: white;
}

.action-btn--primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.action-btn--primary:hover {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
  color: white;
}

/* Responsive design */
@media (max-width: 768px) {
  .content-card--horizontal {
    flex-direction: column;
  }
  
  .content-card--horizontal .card-media {
    flex: none;
    max-width: none;
  }
  
  .card-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .card-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .card-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .default-actions {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .card-content {
    padding: 1rem;
  }
  
  .card-header {
    padding: 1rem 1rem 0;
  }
  
  .card-footer {
    padding: 1rem;
  }
  
  .card-title {
    font-size: 1.125rem;
  }
}
</style>
