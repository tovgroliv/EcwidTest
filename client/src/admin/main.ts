import { createApp } from 'vue'
import App from './App.vue'

//@ts-ignore
EcwidApp.init({
  app_id: "cstmz-101560752-test-app",
  autoloadedflag: true,
  autoheight: true
});

createApp(App).mount('#app')
