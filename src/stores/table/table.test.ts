import { useTableStore } from '@/stores/table/table'
import { storeToRefs } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import type { StateUpdatedEvent, FilterChangedEvent, GridState } from 'ag-grid-community'
import { CacheManager, keys } from '@/shared/api/cacheManager'

const tableStore = useTableStore()
const { users, loading, error, gridApi } = storeToRefs(tableStore)
const { getUsers, saveTableState, handleFilterChanged } = tableStore

const state = {
  sort:
    {
      sortModel:
        [{
          colId: 'name',
          sort: 'asc'
        }]
    }
} as GridState

const stateEvent = {
  api: {
    getState: () => state
  }
} as StateUpdatedEvent

const filterEvent = {
  api: {
    getDisplayedRowCount: () => 0,
    showNoRowsOverlay: () => {
    },
    hideOverlay: () => {
    }
  }
} as FilterChangedEvent


describe('tableStore', () => {
  const spyCacheManager = vi.spyOn(CacheManager, 'save')

  // const spyShowNoRowsOverlay = vi.spyOn(gridApi.value, 'showNoRowsOverlay')

  it('saves table state', () => {
    saveTableState(stateEvent)
    expect(gridApi.value).toEqual(stateEvent.api)
    expect(spyCacheManager).toHaveBeenCalledWith(keys.tableState, state)
    // expect(spyLS).toHaveBeenCalled()
  })

  // })
  it('shows noRowsOverlay', () => {
    handleFilterChanged(filterEvent)
    expect(gridApi.value).toEqual(filterEvent.api)
    // expect(spyShowNoRowsOverlay).toHaveBeenCalled()
  })
})
