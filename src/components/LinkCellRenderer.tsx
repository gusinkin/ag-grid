import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'LinkCellRenderer',
  setup(props: any) {
    const name = props.params.value
    const id = props.params.data.id
    return { name, id }
  },
  render() {
    return <RouterLink to={`/users/${this.id}`}>{this.name}</RouterLink>
  }
})
