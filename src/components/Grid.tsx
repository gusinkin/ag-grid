import type { Ref } from 'vue'
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { AgGridVue } from 'ag-grid-vue3'
import { useTableStore } from '@/stores/table'
import LinkCellRenderer from '@/components/LinkCellRenderer'
import NoRowsStub from '@/components/NoRowsStub'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { keys, CacheManager } from '@/api/cacheManager'

export default defineComponent({
  name: 'GridComponent',

  components: {
    AgGridVue,
    LinkCellRenderer,
    NoRowsStub
  },

  setup() {
    const colDefs = ref([
      {
        field: 'id',
        filter: true,
        floatingFilter: true
      },
      {
        field: 'name',
        filter: true,
        floatingFilter: true,
        cellRenderer: LinkCellRenderer
      },
      { field: 'phone', filter: true, floatingFilter: true },
      {
        field: 'address.geo.lng',
        headerName: 'Полушарие',
        filter: true,
        floatingFilter: true,
        valueFormatter: (params: any) => {
          const lng = +params.value
          return lng > 0 ? 'Восточное' : 'Западное'
        }
      }
    ])
    const tableState = CacheManager.load(keys.tableState)
    const tableStore = useTableStore()
    const { users, loading, error, gridApi } = storeToRefs(tableStore)
    const { getUsers, saveTableState, handleFilterChanged } = tableStore

    const noRowsOverlayComponent: Ref<any> = ref(null)

    onMounted(getUsers)
    onBeforeMount(() => {
      noRowsOverlayComponent.value = 'NoRowsStub'
    })

    return {
      colDefs,
      tableState,
      users,
      loading,
      error,
      gridApi,
      getUsers,
      saveTableState,
      handleFilterChanged
    }
  },

  render() {
    return (
      <>
        {this.loading ? (
          <p>loading...</p>
        ) : this.error ? (
          <>
            <p>{this.error}</p>
            <button onClick={this.getUsers}>попробовать еще раз</button>
          </>
        ) : (
          <AgGridVue
            //@ts-ignore
            rowData={this.users}
            columnDefs={this.colDefs}
            pagination={true}
            style="width: 100%; height: 600px"
            class="ag-theme-quartz"
            onStateUpdated={this.saveTableState}
            onFilterChanged={this.handleFilterChanged}
            initialState={this.tableState}
            noRowsOverlayComponent={NoRowsStub}
          ></AgGridVue>
        )}
      </>
    )
  }
})
