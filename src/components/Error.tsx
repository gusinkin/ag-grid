import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { localization } from '@/app/localization'

export default defineComponent({
  name: 'ErrorComponent',
  props: ['text'],
  setup(props) {
    const value = props.text
    return { value }
  },
  render() {
    return (
      <p>
        {`${localization('error')}: `}
        {this.value}
      </p>
    )
  }
})
