import { defineComponent } from 'vue'
import { localization } from '@/app/localization'

export default defineComponent({
  name: 'ErrorComponent',
  props: {
    text: {
      type: String,
      default: 'Error'
    }
  },
  render() {
    return (
      <p>
        {`${localization('error')}: `}
        {this.$props.text}
      </p>
    )
  }
})
