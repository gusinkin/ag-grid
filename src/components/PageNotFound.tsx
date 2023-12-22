import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'PageNotFound',
  setup() {

  },
  render() {
    return (
      <div class="ag-overlay-loading-center">
        <p>Страница не найдена</p>
        <RouterLink to={'/'}>На главную</RouterLink>
      </div>)
  }
})
