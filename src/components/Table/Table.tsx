import { defineComponent, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { AgGridVue } from 'ag-grid-vue3'
import { useTableStore } from '@/stores/table/table'
import LinkCellRenderer from '@/components/LinkCellRenderer'
import NoRowsStub from '@/components/NoRowsStub'
import { colDefs } from '@/models/data'
import { localization } from '@/app/localization'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

export default defineComponent({
  name: 'TableComponent',

  components: {
    AgGridVue,
    LinkCellRenderer,
    NoRowsStub
  },

  setup() {
    const tableStore = useTableStore()
    onMounted(tableStore.getUsers)

    return {
      tableStore
    }
  },

  render() {
    return (
      <>
        {this.tableStore.loading ? (
          <Loading />
        ) : this.tableStore.error ? (
          <>
            <Error />
            <button onClick={this.tableStore.getUsers}>{localization('tryAgain')}</button>
          </>
        ) : (
          <AgGridVue
            //@ts-ignore
            rowData={this.tableStore.users}
            columnDefs={colDefs}
            pagination={true}
            style="width: 100%; height: 600px"
            class="ag-theme-quartz"
            onStateUpdated={this.tableStore.saveTableState}
            onFilterChanged={this.tableStore.handleFilterChanged}
            initialState={this.tableStore.getInitialTableState()}
            noRowsOverlayComponent={NoRowsStub}
          ></AgGridVue>
        )}
      </>
    )
  }
})
