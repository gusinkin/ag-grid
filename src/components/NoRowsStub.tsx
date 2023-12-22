import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NoRowsStub',
  setup() {

  },
  render() {
    return (
      <div class="ag-overlay-loading-center">
        <p>Нет результатов, удовлетворяющих заданным условиям</p>
      </div>)
  }
})
