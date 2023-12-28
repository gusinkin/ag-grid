import { defineComponent } from 'vue'
import User from '@/components/User/User'

export default defineComponent({
  name: 'UserView',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  render() {
    if (!this.id) return null
    return <User id={this.id} />
  }
})
