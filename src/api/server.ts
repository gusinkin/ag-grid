import { ref } from 'vue'

export class Api {
  private static readonly BASE_URL = 'https://jsonplaceholder.typicode.com/users'

  constructor() {}

  static async get(path: string) {
    const data = ref()
    const err = ref('')
    try {
      const response = await fetch(`${this.BASE_URL}/${path}`)
      data.value = await response.json()
    } catch (e) {
      // @ts-ignore
      err.value = e.message
    }

    return { data, err }
  }
}
