import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { mockData } from '@/models/data'
import type { User } from '@/models/types'
import { Server } from '@/api/server'

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
    const { data, err } = await Server.get(id.toString())
    if (data.value && Object.keys(data.value).length) {
      currentUser.value = data.value
    } else {
      error.value = err.value
    }

    // currentUser.value = mockData[id - 1]
    loading.value = false
  }

  return {
    currentUser,
    loading,
    error,
    getCurrentUser
  }
})
