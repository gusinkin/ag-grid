export enum keys {
  tableState = 'tableState'
}

export class LS {
  constructor() {}

  static save(key: keys, data: any) {
    const value = JSON.stringify(data)
    localStorage.setItem(key, value)
  }

  static load(key: keys) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
}
