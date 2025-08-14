<template>
  <div class="page-header" :class="headerClasses">
    <div class="header-content">
      <div class="header-main">
        <h1 v-if="title" class="header-title">{{ title }}</h1>
        <slot name="title" />
        
        <p v-if="description" class="header-description">{{ description }}</p>
        <slot name="description" />
      </div>
      
      <div v-if="$slots.actions" class="header-actions">
        <slot name="actions" />
      </div>
    </div>
    
    <div v-if="$slots.tabs" class="header-tabs">
      <slot name="tabs" />
    </div>
    
    <div v-if="showBreadcrumbs && breadcrumbs.length" class="breadcrumbs">
      <nav aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
            <router-link 
              v-if="crumb.to && index !== breadcrumbs.length - 1" 
              :to="crumb.to"
              class="breadcrumb-link"
            >
              {{ crumb.text }}
            </router-link>
            <span v-else class="breadcrumb-current">{{ crumb.text }}</span>
            <span v-if="index !== breadcrumbs.length - 1" class="breadcrumb-separator">›</span>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  centered: {
    type: Boolean,
    default: true
  },
  background: {
    type: String,
    default: 'default',
    validator: value => ['default', 'gradient', 'image'].includes(value)
  },
  showBreadcrumbs: {
    type: Boolean,
    default: false
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  }
})

const headerClasses = computed(() => [
  'page-header',
  `page-header--${props.background}`,
  {
    'page-header--centered': props.centered
  }
])
</script>

<style scoped>
.page-header {
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.page-header--centered {
  text-align: center;
}

.page-header--gradient {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  color: white;
  padding: 4rem 0;
}

.page-header--image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: white;
  padding: 4rem 0;
}

.page-header--image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.page-header--image .header-content {
  position: relative;
  z-index: 2;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.header-main {
  flex: 1;
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.page-header--gradient .header-title,
.page-header--image .header-title {
  color: white;
}

.header-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.6;
  margin: 0;
}

.page-header--centered .header-description {
  margin: 0 auto;
}

.page-header--gradient .header-description,
.page-header--image .header-description {
  color: rgba(255, 255, 255, 0.9);
}

.header-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.header-tabs {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 0 2rem;
}

.breadcrumbs {
  max-width: 1200px;
  margin: 1rem auto 0;
  padding: 0 2rem;
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-link {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
  font-size: 0.9rem;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-current {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.breadcrumb-separator {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.page-header--gradient .breadcrumb-link,
.page-header--image .breadcrumb-link {
  color: rgba(255, 255, 255, 0.9);
}

.page-header--gradient .breadcrumb-current,
.page-header--gradient .breadcrumb-separator,
.page-header--image .breadcrumb-current,
.page-header--image .breadcrumb-separator {
  color: rgba(255, 255, 255, 0.7);
}

/* Responsive design */
@media (max-width: 768px) {
  .page-header {
    padding: 1.5rem 0;
  }
  
  .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 1rem;
  }
  
  .header-title {
    font-size: 2rem;
  }
  
  .header-description {
    font-size: 1rem;
  }
  
  .header-actions {
    justify-content: center;
    width: 100%;
  }
  
  .header-tabs,
  .breadcrumbs {
    padding: 0 1rem;
  }
  
  .breadcrumb-list {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 1.75rem;
  }
  
  .header-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .breadcrumb-list {
    flex-direction: column;
    text-align: center;
  }
  
  .breadcrumb-separator {
    display: none;
  }
}
</style>
