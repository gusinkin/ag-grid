import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { mockData } from '@/models/data'
import type { StateUpdatedEvent, FilterChangedEvent, GridState } from 'ag-grid-community'
import type { User } from '@/models/types'
import { Server } from '@/shared/api/server'
import { keys, CacheManager } from '@/shared/api/cacheManager'

export const useTableStore = defineStore('table', () => {
  const users: Ref<User[]> = ref([])
  const loading = ref(false)
  const error = ref('')

  const gridApi = ref()

  const saveTableState = (event: StateUpdatedEvent) => {
    console.log('event', event)
    console.log('gridApi', gridApi)
    console.log('gridApi.value', gridApi.value)
    gridApi.value = event.api
    const state: GridState = gridApi.value.getState()
    CacheManager.save(keys.tableState, state)
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
    // error.value = ''
    // const { data, err } = await Server.get('')
    // if (data.value?.length) {
    //   users.value = data.value
    // } else {
    //   error.value = err.value
    // }

    users.value = mockData
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
