import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/app/App'
import { localizationInit } from '@/app/localization'
import router from '@/app/providers/router'
import '@/app/assets/main.css'

export async function appBuild() {
  const app = createApp(App)
  await localizationInit()

  app.use(createPinia())
  app.use(router)

  return app
}
