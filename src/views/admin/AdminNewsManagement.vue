<template>
  <div class="admin-section">
    <div class="section-header">
      <h2>News Management</h2>
      <AppButton @click="showAddArticleModal = true" variant="primary">
        <span class="icon">📝</span>
        Add New Article
      </AppButton>
    </div>

    <!-- Articles List -->
    <div class="articles-list">
      <div v-if="newsStore.isLoading" class="loading-state">
        <LoadingSpinner size="large" />
        <p>Loading articles...</p>
      </div>
      
      <div v-else-if="articles.length === 0" class="empty-state">
        <div class="empty-icon">📰</div>
        <h3>No articles found</h3>
        <p>Start by creating your first news article</p>
      </div>

      <div v-else class="articles-grid">
        <div 
          v-for="article in articles" 
          :key="article.id" 
          class="article-card"
        >
          <div class="article-header">
            <h3 class="article-title">{{ article.title }}</h3>
            <div class="article-badges">
              <span v-if="article.featured" class="badge featured">Featured</span>
              <span class="badge category">{{ article.category }}</span>
            </div>
          </div>
          
          <div class="article-meta">
            <span class="author">By {{ article.author }}</span>
            <span class="date">{{ formatDate(article.publishedDate) }}</span>
            <span class="stats">
              👁️ {{ article.views }} | ❤️ {{ article.likes }}
            </span>
          </div>
          
          <p class="article-excerpt">{{ article.description }}</p>
          
          <div class="article-actions">
            <AppButton 
              @click="editArticle(article)" 
              variant="outline" 
              size="small"
            >
              ✏️ Edit
            </AppButton>
            <AppButton 
              @click="deleteArticle(article)" 
              variant="outline" 
              size="small"
              :loading="deletingArticleId === article.id"
            >
              🗑️ Delete
            </AppButton>
          </div>
        </div>
      </div>
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
import { useNewsStore } from '@/stores/news.js'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import ArticleEditor from '@/components/admin/ArticleEditor.vue'
import { useStatusMessage } from '@/composables/useStatusMessage.js'

const newsStore = useNewsStore()
const { statusMessage, showMessage } = useStatusMessage()

const showAddArticleModal = ref(false)
const showEditArticleModal = ref(false)
const selectedArticle = ref(null)
const deletingArticleId = ref(null)

const articles = computed(() => newsStore.articles)

const editArticle = (article) => {
  selectedArticle.value = { ...article }
  showEditArticleModal.value = true
}

const deleteArticle = async (article) => {
  if (!confirm(`Are you sure you want to delete "${article.title}"?`)) {
    return
  }

  deletingArticleId.value = article.id
  try {
    const result = await newsStore.deleteArticle(article.id)
    if (result.success) {
      showMessage('Article deleted successfully', 'success')
    } else {
      showMessage(result.error || 'Failed to delete article', 'error')
    }
  } catch (error) {
    showMessage('An error occurred while deleting the article', 'error')
  } finally {
    deletingArticleId.value = null
  }
}

const handleArticleSave = async (articleData) => {
  try {
    let result
    if (showEditArticleModal.value) {
      result = await newsStore.updateArticle(selectedArticle.value.id, articleData)
    } else {
      result = await newsStore.addArticle(articleData)
    }

    if (result.success) {
      closeArticleModal()
      const action = showEditArticleModal.value ? 'updated' : 'created'
      showMessage(`Article ${action} successfully`, 'success')
    } else {
      showMessage(result.error || 'Failed to save article', 'error')
    }
  } catch (error) {
    showMessage('An error occurred while saving the article', 'error')
  }
}

const closeArticleModal = () => {
  showAddArticleModal.value = false
  showEditArticleModal.value = false
  selectedArticle.value = null
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  newsStore.clearError()
})
</script>

<style scoped>
/* Re-use styles from AdminView or define new ones if necessary */
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
</style>
