import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'PageNotFoundView',
  render() {
    return (
      <>
        <p>Страница не найдена</p>
        <RouterLink to={'/'}>На главную</RouterLink>
      </>)
  }
})
