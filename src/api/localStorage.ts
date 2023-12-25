export class LS {
  constructor() {}

  static save(key: string, data: any) {
    const value = JSON.stringify(data)
    localStorage.setItem(key, value)
  }

  static load(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
}
