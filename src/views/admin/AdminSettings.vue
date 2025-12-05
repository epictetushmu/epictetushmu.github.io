<template>
  <div class="admin-section">
    <div class="section-header">
      <h2>Settings</h2>
    </div>
    
    <div class="settings-grid">
      <div class="setting-card">
        <h3>Data Management</h3>
        <p>Export or import news data</p>
        <div class="setting-actions">
          <AppButton @click="exportData" variant="outline">
            📤 Export Data
          </AppButton>
          <AppButton @click="triggerImport" variant="outline">
            📥 Import Data
          </AppButton>
          <AppButton @click="resetData" variant="outline" :loading="resetting">
            🔄 Reset to Default
          </AppButton>
        </div>
      </div>
    </div>
    
    <input 
      ref="fileInput" 
      type="file" 
      accept=".json" 
      @change="handleFileImport" 
      style="display: none"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNewsStore } from '@/stores/news.js'
import AppButton from '@/components/ui/AppButton.vue'
import { useStatusMessage } from '@/composables/useStatusMessage.js'

const newsStore = useNewsStore()
const { showMessage } = useStatusMessage()

const resetting = ref(false)
const fileInput = ref(null)

const exportData = () => {
  try {
    const data = newsStore.exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `epictetus-news-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    showMessage('Data exported successfully', 'success')
  } catch (error) {
    showMessage('Failed to export data', 'error')
  }
}

const triggerImport = () => {
  fileInput.value?.click()
}

const handleFileImport = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const text = await file.text()
    const result = await newsStore.importData(text)
    if (result.success) {
      showMessage('Data imported successfully', 'success')
    } else {
      showMessage(result.error || 'Failed to import data', 'error')
    }
  } catch (error) {
    showMessage('Invalid file format', 'error')
  }
  
  // Reset file input
  event.target.value = ''
}

const resetData = async () => {
  if (!confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
    return
  }

  resetting.value = true
  try {
    const result = await newsStore.resetToDefault()
    if (result.success) {
      showMessage('Data reset to default successfully', 'success')
    } else {
      showMessage(result.error || 'Failed to reset data', 'error')
    }
  } catch (error) {
    showMessage('An error occurred while resetting data', 'error')
  } finally {
    resetting.value = false
  }
}
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
</style>
