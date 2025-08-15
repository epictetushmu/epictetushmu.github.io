<template>
  <div class="filter-section" :class="filterClasses">
    <div class="filter-content">
      <!-- Filter Tabs -->
      <div v-if="showTabs && categories.length" class="filter-tabs">
        <button
          v-for="category in categories"
          :key="category.value || category"
          :class="['filter-tab', { active: activeCategory === (category.value || category) }]"
          @click="updateCategory(category.value || category)"
        >
          <span v-if="category.icon" class="tab-icon">{{ category.icon }}</span>
          <span class="tab-text">{{ category.label || category }}</span>
          <span v-if="category.count !== undefined" class="tab-count">{{ category.count }}</span>
        </button>
      </div>
      
      <!-- Search and Filters -->
      <div class="filter-controls">
        <!-- Search Box -->
        <div v-if="showSearch" class="search-container">
          <div class="search-box">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="searchPlaceholder"
              class="search-input"
              @input="updateSearch"
            >
            <span class="search-icon">🔍</span>
            <button
              v-if="searchQuery"
              class="search-clear"
              @click="clearSearch"
              aria-label="Clear search"
            >
              ✕
            </button>
          </div>
        </div>
        
        <!-- Additional Filters -->
        <div v-if="$slots.filters" class="additional-filters">
          <slot name="filters" />
        </div>
        
        <!-- Sort Options -->
        <div v-if="showSort && sortOptions.length" class="sort-container">
          <select v-model="activeSortOption" @change="updateSort" class="sort-select">
            <option value="">Sort by...</option>
            <option
              v-for="option in sortOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        
        <!-- View Toggle -->
        <div v-if="showViewToggle" class="view-toggle">
          <button
            v-for="view in viewOptions"
            :key="view.value"
            :class="['view-btn', { active: activeView === view.value }]"
            @click="updateView(view.value)"
            :aria-label="view.label"
          >
            {{ view.icon }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Active Filters Display -->
    <div v-if="showActiveFilters && hasActiveFilters" class="active-filters">
      <span class="active-filters-label">Active filters:</span>
      <div class="active-filters-list">
        <span v-if="searchQuery" class="filter-tag">
          Search: "{{ searchQuery }}"
          <button @click="clearSearch" class="filter-remove">✕</button>
        </span>
        <span v-if="activeCategory && activeCategory !== defaultCategory" class="filter-tag">
          Category: {{ getCategoryLabel(activeCategory) }}
          <button @click="updateCategory(defaultCategory)" class="filter-remove">✕</button>
        </span>
        <span v-if="activeSortOption" class="filter-tag">
          Sort: {{ getSortLabel(activeSortOption) }}
          <button @click="updateSort('')" class="filter-remove">✕</button>
        </span>
      </div>
      <button @click="clearAllFilters" class="clear-all-btn">Clear all</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  defaultCategory: {
    type: String,
    default: 'all'
  },
  showTabs: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...'
  },
  showSort: {
    type: Boolean,
    default: false
  },
  sortOptions: {
    type: Array,
    default: () => []
  },
  showViewToggle: {
    type: Boolean,
    default: false
  },
  viewOptions: {
    type: Array,
    default: () => [
      { value: 'grid', icon: '⊞', label: 'Grid view' },
      { value: 'list', icon: '☰', label: 'List view' }
    ]
  },
  showActiveFilters: {
    type: Boolean,
    default: true
  },
  layout: {
    type: String,
    default: 'horizontal',
    validator: value => ['horizontal', 'vertical'].includes(value)
  }
})

const emit = defineEmits(['update:category', 'update:search', 'update:sort', 'update:view', 'filter-change'])

// Reactive state
const searchQuery = ref('')
const activeCategory = ref(props.defaultCategory)
const activeSortOption = ref('')
const activeView = ref('grid')

// Computed properties
const filterClasses = computed(() => [
  'filter-section',
  `filter-section--${props.layout}`
])

const hasActiveFilters = computed(() => {
  return searchQuery.value || 
         (activeCategory.value && activeCategory.value !== props.defaultCategory) ||
         activeSortOption.value
})

// Methods
const updateCategory = (category) => {
  activeCategory.value = category
  emit('update:category', category)
  emitFilterChange()
}

const updateSearch = () => {
  emit('update:search', searchQuery.value)
  emitFilterChange()
}

const clearSearch = () => {
  searchQuery.value = ''
  updateSearch()
}

const updateSort = (sortValue = '') => {
  activeSortOption.value = sortValue || activeSortOption.value
  emit('update:sort', activeSortOption.value)
  emitFilterChange()
}

const updateView = (view) => {
  activeView.value = view
  emit('update:view', view)
}

const getCategoryLabel = (categoryValue) => {
  const category = props.categories.find(cat => 
    (cat.value || cat) === categoryValue
  )
  return category ? (category.label || category) : categoryValue
}

const getSortLabel = (sortValue) => {
  const option = props.sortOptions.find(opt => opt.value === sortValue)
  return option ? option.label : sortValue
}

const clearAllFilters = () => {
  searchQuery.value = ''
  activeCategory.value = props.defaultCategory
  activeSortOption.value = ''
  
  emit('update:search', '')
  emit('update:category', props.defaultCategory)
  emit('update:sort', '')
  emitFilterChange()
}

const emitFilterChange = () => {
  emit('filter-change', {
    search: searchQuery.value,
    category: activeCategory.value,
    sort: activeSortOption.value,
    view: activeView.value
  })
}

// Watch for external prop changes
watch(() => props.defaultCategory, (newValue) => {
  if (!activeCategory.value || activeCategory.value === props.defaultCategory) {
    activeCategory.value = newValue
  }
})
</script>

<style scoped>
.filter-section {
  background-color: var(--background-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  margin-bottom: 2rem;
  overflow: hidden;
}

.filter-content {
  padding: 1.5rem;
}

.filter-section--vertical .filter-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-section--horizontal .filter-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--border-color);
  background-color: transparent;
  color: var(--text-secondary);
  border-radius: 50px;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;
  font-weight: 500;
}

.filter-tab:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-tab.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.tab-icon {
  font-size: 1.1rem;
}

.tab-count {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.375rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
}

.filter-tab.active .tab-count {
  background-color: rgba(255, 255, 255, 0.3);
}

/* Filter Controls */
.filter-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-container {
  flex: 1;
  min-width: 250px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 50px;
  font-size: 0.9rem;
  transition: var(--transition);
  background-color: var(--background-primary);
  color: var(--text-primary);
}

.search-input:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.search-icon {
  position: absolute;
  right: 2.5rem;
  color: var(--text-secondary);
  pointer-events: none;
}

.search-clear {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: var(--text-secondary);
  border-radius: 50%;
  transition: var(--transition);
}

.search-clear:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}

.additional-filters {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.sort-container {
  min-width: 150px;
}

.sort-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--background-primary);
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: var(--transition);
}

.sort-select:focus {
  border-color: var(--primary-color);
  outline: none;
}

/* View Toggle */
.view-toggle {
  display: flex;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.view-btn {
  padding: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-secondary);
  border-right: 1px solid var(--border-color);
  font-size: 1.1rem;
}

.view-btn:last-child {
  border-right: none;
}

.view-btn:hover {
  background-color: var(--background-secondary);
  color: var(--text-primary);
}

.view-btn.active {
  background-color: var(--primary-color);
  color: white;
}

/* Active Filters */
.active-filters {
  background-color: var(--background-secondary);
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.active-filters-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.active-filters-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex: 1;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50px;
  font-size: 0.875rem;
}

.filter-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
  opacity: 0.8;
  transition: var(--transition);
}

.filter-remove:hover {
  opacity: 1;
}

.clear-all-btn {
  padding: 0.25rem 0.75rem;
  background: none;
  border: 1px solid var(--error-color);
  color: var(--error-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.875rem;
  transition: var(--transition);
}

.clear-all-btn:hover {
  background-color: var(--error-color);
  color: white;
}

/* Responsive design */
@media (max-width: 768px) {
  .filter-section--horizontal .filter-content {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .filter-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .search-container {
    flex: 1;
    min-width: auto;
  }
  
  .sort-container {
    min-width: 120px;
  }
  
  .active-filters {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .active-filters-list {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .filter-tabs {
    justify-content: center;
  }
  
  .filter-tab {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .sort-container,
  .view-toggle {
    width: 100%;
  }
}
</style>
