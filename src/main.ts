import { appBuild } from '@/app'

;(async function () {
  const app = await appBuild()
  app.mount('#app')
})()
