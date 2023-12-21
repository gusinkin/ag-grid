import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { URL, mockData } from '@/models/data'
import type { StateUpdatedEvent, GridState } from 'ag-grid-community'
import type { User } from '@/models/types'

export const useTableStore = defineStore('table', () => {
  const users: Ref<User[]> = ref([])
  const loading = ref(false)
  const error = ref('')

  const gridApi = ref()

  const saveTableState = (event: StateUpdatedEvent) => {
    gridApi.value = event.api
    const state: GridState = gridApi.value.getState()
    localStorage.setItem('tableState', JSON.stringify(state))
  }

  const getUsers = async () => {
    if (users.value.length > 0) {
      return
    }

    loading.value = true
    error.value = ''
    try {
      // const response = await fetch(URL)
      // const models: User[] = await response.json()
      // users.value = models
      users.value = mockData
    } catch (e) {
      // @ts-ignore
      error.value = e.message
    }
    loading.value = false
  }

  return {
    users,
    loading,
    error,
    getUsers,
    saveTableState
  }
})
