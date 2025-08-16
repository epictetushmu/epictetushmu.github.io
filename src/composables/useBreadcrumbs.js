import { ref, computed } from 'vue'

// Simple slugify function: lowercases, trims, replaces spaces and non-alphanumerics with hyphens
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\_]+/g, '-')         // Replace spaces and underscores with -
    .replace(/[^\w\-]+/g, '')         // Remove all non-word chars except hyphens
    .replace(/\-\-+/g, '-')           // Replace multiple - with single -
    .replace(/^-+/, '')               // Trim - from start
    .replace(/-+$/, '');              // Trim - from end
}


/**
 * Composable for managing navigation breadcrumbs
 * @param {string} basePage - The base page name (e.g., 'Home', 'Library', 'News')
 * @param {Array} additionalCrumbs - Additional breadcrumb items
 * @returns {Object} Reactive breadcrumbs and utility functions
 */
export function useBreadcrumbs(basePage, additionalCrumbs = []) {
  const breadcrumbs = ref([
    { text: 'Home', to: '/' },
    ...(basePage !== 'Home' ? [{ text: basePage, to: `/${slugify(basePage)}` }] : []),
    ...additionalCrumbs
  ])

  const addBreadcrumb = (crumb) => {
    breadcrumbs.value.push(crumb)
  }

  const removeBreadcrumb = (index) => {
    breadcrumbs.value.splice(index, 1)
  }

  const clearAdditionalBreadcrumbs = () => {
    const homeIndex = breadcrumbs.value.findIndex(crumb => crumb.text === 'Home')
    const baseIndex = breadcrumbs.value.findIndex(crumb => crumb.text === basePage)
    
    if (baseIndex > -1) {
      breadcrumbs.value = breadcrumbs.value.slice(0, baseIndex + 1)
    } else if (homeIndex > -1) {
      breadcrumbs.value = breadcrumbs.value.slice(0, homeIndex + 1)
    }
  }

  const currentPage = computed(() => {
    return breadcrumbs.value[breadcrumbs.value.length - 1]?.text || 'Page'
  })

  return {
    breadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    clearAdditionalBreadcrumbs,
    currentPage
  }
}
