import { createApp } from 'vue'
import App from './App.vue'
import { IEcwidApp } from '@/model/IEcwidApp'

declare var EcwidApp: IEcwidApp

EcwidApp.init({
  app_id: "cstmz-101560752-test-app",
  autoloadedflag: true,
  autoheight: true
});

createApp(App).mount('#app')
