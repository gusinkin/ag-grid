import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import type { ICellRendererParams } from 'ag-grid-community'

interface LinkCellRendererProps {
  params: ICellRendererParams
}

export default defineComponent({
  name: 'LinkCellRenderer',
  setup(props: LinkCellRendererProps) {
    const name = props.params.value
    const id = props.params.data.id
    return { name, id }
  },
  render() {
    return <RouterLink to={`/users/${this.id}`}>{this.name}</RouterLink>
  }
})
