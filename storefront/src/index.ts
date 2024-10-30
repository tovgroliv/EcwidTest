import './styles.css';
import SettingsViewModel from './viewmodel/SettingsViewModel';

import { createApp } from 'vue';
import App from './App.vue';

let viewModel = new SettingsViewModel()
let loaded: Boolean = false

if (viewModel.validate()) {
  //@ts-ignore
  const ecwid = Ecwid;
  ecwid.OnAPILoaded.add(function () {
    //@ts-ignore
    ecwid.OnPageLoaded.add(function (page) {
      if (page.type == "CART") {
        if (loaded) {
          viewModel.getProducts()
            .then(value => {
              console.log(value)
            })

          var footer = document.getElementsByClassName("ec-store__content-wrapper")[0]
          const textNode = document.createElement("div")
          textNode.classList.add("widget_under_cart")
          textNode.id = "test-app"
          footer?.appendChild(textNode)

          createApp(App).mount('#test-app')
        }
        loaded = true
      }
    })
  })
}
