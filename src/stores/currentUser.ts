import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { URL, mockData } from '@/models/data'
import type { User } from '@/models/types'

export const useCurrentUserStore = defineStore('currentUser', () => {
  const currentUser: Ref<User | null> = ref(null)
  const loading = ref(false)
  const error = ref('')

  const getCurrentUser = async (id: number) => {
    if (currentUser.value != null && id === currentUser.value.id) {
      return
    }

    loading.value = true
    error.value = ''
    try {
      const response = await fetch(`${URL}/${id}`)
      const models: User = await response.json()
      currentUser.value = models
      // currentUser.value = mockData[id - 1]
    } catch (e) {
      // @ts-ignore
      error.value = e.message
    }
    loading.value = false
  }

  return {
    currentUser,
    loading,
    error,
    getCurrentUser
  }
})
