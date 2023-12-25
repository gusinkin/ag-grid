import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { URL, mockData } from '@/models/data'
import type { StateUpdatedEvent, FilterChangedEvent, GridState } from 'ag-grid-community'
import type { User } from '@/models/types'
import { Api } from '@/api/server'

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

  const handleFilterChanged = (event: FilterChangedEvent) => {
    gridApi.value = event.api
    const rowsNumber = gridApi.value.getDisplayedRowCount()
    if (rowsNumber === 0) {
      gridApi.value.showNoRowsOverlay()
    } else {
      gridApi.value.hideOverlay()
    }
  }

  const getUsers = async () => {
    if (users.value.length > 0) {
      return
    }

    loading.value = true
    error.value = ''
    const { data, err } = await Api.get('')
    if (data.value?.length) {
      users.value = data.value
    } else {
      error.value = err.value
    }
    loading.value = false
  }

  return {
    users,
    loading,
    error,
    gridApi,
    getUsers,
    saveTableState,
    handleFilterChanged
  }
})
