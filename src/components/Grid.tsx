import { defineComponent, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { AgGridVue } from 'ag-grid-vue3'
import { useTableStore } from '@/stores/table'
import LinkCellRenderer from '@/components/LinkCellRenderer'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

export default defineComponent({
  name: 'Grid',

  components: {
    AgGridVue,
    LinkCellRenderer
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
    const tableStateToParse = localStorage.getItem('tableState')
    const tableState = tableStateToParse ? JSON.parse(tableStateToParse) : {}
    const tableStore = useTableStore()
    const { users, loading, error } = storeToRefs(tableStore)
    const { getUsers, saveTableState } = tableStore

    onMounted(getUsers)
    return {
      colDefs,
      tableState,
      users,
      loading,
      error,
      getUsers,
      saveTableState
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
            style="width: 100%; height: 800px"
            class="ag-theme-quartz"
            onStateUpdated={this.saveTableState}
            initialState={this.tableState}
          ></AgGridVue>
        )}
      </>
    )
  }
})
