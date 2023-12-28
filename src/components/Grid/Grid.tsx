import type { Ref } from 'vue'
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { AgGridVue } from 'ag-grid-vue3'
import type { ValueFormatterParams } from 'ag-grid-community'
import { useTableStore } from '@/stores/table/table'
import LinkCellRenderer from '@/components/LinkCellRenderer'
import NoRowsStub from '@/components/NoRowsStub'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { keys, CacheManager } from '@/shared/api/cacheManager'
import { localization } from '@/app/localization'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

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
        headerName: localization('id'),
        filter: true,
        floatingFilter: true
      },
      {
        field: 'name',
        headerName: localization('name'),
        filter: true,
        floatingFilter: true,
        cellRenderer: LinkCellRenderer
      },
      {
        field: 'phone',
        headerName: localization('phone'),
        filter: true,
        floatingFilter: true
      },
      {
        field: 'address.geo.lng',
        headerName: localization('hemisphere'),
        filter: true,
        floatingFilter: true,
        valueFormatter: (params: ValueFormatterParams) => {
          const lng = +params.value
          return lng > 0 ? localization('eastern') : localization('western')
        }
      }
    ])
    const tableState = CacheManager.load(keys.tableState)
    const tableStore = useTableStore()
    const { users, loading, error, gridApi } = storeToRefs(tableStore)
    const { getUsers, saveTableState, handleFilterChanged } = tableStore

    const noRowsOverlayComponent: Ref<string | undefined> = ref()

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
          <Loading />
        ) : this.error ? (
          <>
            <Error />
            <button onClick={this.getUsers}>{localization('tryAgain')}</button>
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
