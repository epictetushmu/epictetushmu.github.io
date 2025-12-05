<template>
  <div class="admin-panel page-container">
    <!-- Header -->
    <PageHeader
      title="Admin Panel"
      description="Manage news articles and system settings"
      :breadcrumbs="breadcrumbs"
      :showBreadcrumbs="true"
    />

    <!-- Admin Navigation -->
    <div class="admin-nav">
      <router-link
        v-for="tab in adminTabs"
        :key="tab.id"
        :to="tab.route"
        class="admin-nav-btn"
        :class="{ 'active': $route.path === tab.route }"
      >
        <span class="nav-icon">{{ tab.icon }}</span>
        <span class="nav-text">{{ tab.name }}</span>
      </router-link>
    </div>

    <div class="admin-content">
      <router-view />
    </div>

    <!-- Add/Edit Article Modal -->
    <AppModal 
      :show="showAddArticleModal || showEditArticleModal" 
      @close="closeArticleModal"
      title="Article Editor"
      size="large"
    >
      <ArticleEditor
        :article="selectedArticle"
        :isEditing="showEditArticleModal"
        @save="handleArticleSave"
        @cancel="closeArticleModal"
      />
    </AppModal>

    <!-- Error/Success Messages -->
    <div v-if="statusMessage.text" :class="['message', statusMessage.type]">
      {{ statusMessage.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import PageHeader from '@/components/common/PageHeader.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import ArticleEditor from '@/components/admin/ArticleEditor.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs.js'
import { useStatusMessage } from '@/composables/useStatusMessage.js'

// Stores
const authStore = useAuthStore()
const router = useRouter()

// Check admin access
if (!authStore.isAdmin) {
  router.push('/')
}

// Reactive data
const showAddArticleModal = ref(false)
const showEditArticleModal = ref(false)
const selectedArticle = ref(null)
const deletingArticleId = ref(null)
const resetting = ref(false)
const fileInput = ref(null)

// Breadcrumbs
const { breadcrumbs } = useBreadcrumbs('Admin')

// Status messages
const { statusMessage, showMessage } = useStatusMessage()

// Admin tabs
const adminTabs = [
  { id: 'news', name: 'News Management', icon: '📰', route: '/admin/news' },
  { id: 'stats', name: 'Statistics', icon: '📊', route: '/admin/stats' },
  { id: 'settings', name: 'Settings', icon: '⚙️', route: '/admin/settings' },
  { id: 'pull', name: 'Pull & Build', icon: '⚙️', route: '/admin/pull' }
]

// Methods for modal and data operations (moved from AdminNewsManagement.vue where applicable)
const closeArticleModal = () => {
  showAddArticleModal.value = false
  showEditArticleModal.value = false
  selectedArticle.value = null
}

// Lifecycle
onMounted(() => {
  // Initial logic for AdminView if any (e.g., redirect)
})
</script>

<style scoped>
.admin-panel {
  min-height: 100vh;
  background-color: var(--background-secondary);
}

.admin-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: var(--background-primary);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
}

.admin-nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-secondary);
}

.admin-nav-btn:hover {
  background-color: var(--background-secondary);
  color: var(--text-primary);
}

.admin-nav-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.admin-section {
  background-color: var(--background-primary);
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: var(--shadow);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.section-header h2 {
  color: var(--text-primary);
  margin: 0;
}

/* Articles Management */
.articles-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}

.article-card {
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: var(--background-primary);
  transition: all 0.3s ease;
}

.article-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.article-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

.article-badges {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.featured {
  background-color: var(--warning-color);
  color: white;
}

.badge.category {
  background-color: var(--primary-color);
  color: white;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.article-excerpt {
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-actions {
  display: flex;
  gap: 0.5rem;
}

/* Statistics */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--background-secondary);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
}

.stat-icon {
  font-size: 2rem;
}

.stat-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.stat-content p {
  color: var(--text-secondary);
  margin: 0;
}

.categories-overview {
  margin-top: 2rem;
}

.categories-overview h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.category-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.category-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--background-secondary);
  border-radius: 0.375rem;
  border: 1px solid var(--border-color);
}

.category-name {
  font-weight: 500;
  color: var(--text-primary);
}

.category-count {
  font-weight: 600;
  color: var(--primary-color);
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
}

/* Settings */
.settings-grid {
  display: grid;
  gap: 1.5rem;
}

.setting-card {
  padding: 1.5rem;
  background-color: var(--background-secondary);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
}

.setting-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.setting-card p {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
}

.setting-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Loading and Empty States */
.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: var(--text-secondary);
}

/* Messages */
.message {
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-md);
  z-index: 1000;
  max-width: 400px;
  font-weight: 500;
}

.message.success {
  background-color: var(--success-color);
  color: white;
}

.message.error {
  background-color: var(--error-color);
  color: white;
}

.message.info {
  background-color: var(--primary-color);
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-nav {
    flex-direction: column;
    gap: 0.5rem;
  }

  .admin-nav-btn {
    justify-content: center;
  }

  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .article-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .setting-actions {
    flex-direction: column;
  }
}
</style>
