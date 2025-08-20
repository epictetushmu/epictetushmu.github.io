<template>
  <div class="article-editor">
    <form @submit.prevent="handleSubmit" class="editor-form">
      <!-- Title -->
      <div class="form-group">
        <label for="title">Title *</label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          placeholder="Enter article title"
          required
          class="form-input"
        />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description *</label>
        <textarea
          id="description"
          v-model="formData.description"
          placeholder="Brief description of the article"
          required
          class="form-textarea"
          rows="3"
        ></textarea>
      </div>

      <!-- Content -->
      <div class="form-group">
        <label for="content">Content *</label>
        <textarea
          id="content"
          v-model="formData.content"
          placeholder="Full article content"
          required
          class="form-textarea content-editor"
          rows="10"
        ></textarea>
      </div>

      <!-- Category -->
      <div class="form-group">
        <label for="category">Category *</label>
        <select
          id="category"
          v-model="formData.category"
          required
          class="form-select"
        >
          <option value="">Select a category</option>
          <option value="academic">Academic</option>
          <option value="events">Events</option>
          <option value="announcements">Announcements</option>
          <option value="research">Research</option>
          <option value="student-life">Student Life</option>
          <option value="general">General</option>
        </select>
      </div>

      <!-- Tags -->
      <div class="form-group">
        <label for="tags">Tags</label>
        <input
          id="tags"
          v-model="tagsInput"
          type="text"
          placeholder="Enter tags separated by commas (e.g., philosophy, stoicism, ethics)"
          class="form-input"
        />
        <small class="form-help">Separate multiple tags with commas</small>
      </div>

      <!-- Image URL -->
      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          v-model="formData.imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          class="form-input"
        />
      </div>

      <!-- Author -->
      <div class="form-group">
        <label for="author">Author</label>
        <input
          id="author"
          v-model="formData.author"
          type="text"
          placeholder="Author name"
          class="form-input"
        />
      </div>

      <!-- Published Status -->
      <div class="form-group checkbox-group">
        <label class="checkbox-label">
          <input
            v-model="formData.published"
            type="checkbox"
            class="form-checkbox"
          />
          <span class="checkbox-text">Publish immediately</span>
        </label>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" @click="handleCancel" class="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
          {{ isEditing ? 'Update Article' : 'Create Article' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save', 'cancel'])

// Form data
const formData = reactive({
  title: '',
  description: '',
  content: '',
  category: '',
  tags: [],
  imageUrl: '',
  author: 'Admin',
  published: true
})

const tagsInput = ref('')

// Computed properties
const isFormValid = computed(() => {
  return formData.title.trim() && 
         formData.description.trim() && 
         formData.content.trim() && 
         formData.category
})

// Convert tags input to array
watch(tagsInput, (newValue) => {
  if (newValue) {
    formData.tags = newValue.split(',').map(tag => tag.trim()).filter(tag => tag)
  } else {
    formData.tags = []
  }
})

// Initialize form with article data if editing
onMounted(() => {
  if (props.isEditing && props.article) {
    Object.assign(formData, {
      title: props.article.title || '',
      description: props.article.description || '',
      content: props.article.content || '',
      category: props.article.category || '',
      tags: props.article.tags || [],
      imageUrl: props.article.imageUrl || '',
      author: props.article.author || 'Admin',
      published: props.article.published !== false
    })
    
    tagsInput.value = formData.tags.join(', ')
  }
})

// Methods
const handleSubmit = () => {
  if (!isFormValid.value) return

  const articleData = {
    ...formData,
    tags: formData.tags.filter(tag => tag.trim())
  }

  if (props.isEditing && props.article) {
    articleData.id = props.article.id
  }

  emit('save', articleData)
}

const handleCancel = () => {
  emit('cancel')
}

// Reset form
const resetForm = () => {
  Object.assign(formData, {
    title: '',
    description: '',
    content: '',
    category: '',
    tags: [],
    imageUrl: '',
    author: 'Admin',
    published: true
  })
  tagsInput.value = ''
}

// Expose methods for parent component
defineExpose({
  resetForm
})
</script>

<style scoped>
.article-editor {
  max-width: 800px;
  margin: 0 auto;
}

.editor-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.form-input,
.form-textarea,
.form-select {
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.content-editor {
  min-height: 200px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.form-select {
  cursor: pointer;
}

.form-help {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: normal;
}

.form-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-text {
  color: var(--text-primary);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
  border-color: var(--primary-color);
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .form-input,
  .form-textarea,
  .form-select {
    background: var(--bg-secondary);
    border-color: var(--border-dark);
  }
  
  .form-input:focus,
  .form-textarea:focus,
  .form-select:focus {
    border-color: var(--primary-light);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    justify-content: center;
  }
}
</style>
