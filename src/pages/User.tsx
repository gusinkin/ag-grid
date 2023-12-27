import { defineComponent } from 'vue'
import User from '@/components/User/User'

export default defineComponent({
  name: 'UserView',
  render() {
    const id = +this.$route.params.id
    return <User id={id} />
  }
})
