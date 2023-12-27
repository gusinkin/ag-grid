import { useTableStore } from '@/stores/table/table'
import { storeToRefs } from 'pinia'
import { describe, expect, it } from 'vitest'
import type { StateUpdatedEvent, FilterChangedEvent, GridState } from 'ag-grid-community'

const tableStore = useTableStore()
const { users, loading, error, gridApi } = storeToRefs(tableStore)
const { getUsers, saveTableState, handleFilterChanged } = tableStore

const event = {
  api: {}
} as StateUpdatedEvent

describe('tableStore', () => {
  it('saves table state', () => {
    saveTableState(event)
    expect(gridApi.value).toEqual(event.api)
  })
})
