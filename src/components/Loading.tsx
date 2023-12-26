import { defineComponent } from 'vue'
import { localization } from '@/app/localization'

export default defineComponent({
  name: 'LoadingComponent',

  render() {
    return <p>{`${localization('loading')}...`}</p>
  }
})
