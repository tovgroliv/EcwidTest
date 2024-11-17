import './styles.css';
import SettingsViewModel from './viewmodel/SettingsViewModel';

import { IEcwid } from "./model/IEcwid"
import { createApp } from 'vue';
import App from './App.vue';

declare var Ecwid: IEcwid
let loaded: Boolean = false

console.log("TEST")

Ecwid.OnAPILoaded.add(function () {
  Ecwid.OnPageLoaded.add(function (page) {
    if (page.type == "CART") {
      let viewModel = new SettingsViewModel()
      if (!loaded && viewModel.validate()) {
        viewModel.getProducts()
          .then(value => {
            var footer = document.getElementsByClassName("ec-store__content-wrapper")[0]
            const textNode = document.createElement("div")
            textNode.classList.add("widget_under_cart")
            textNode.id = "test-app"
            footer?.appendChild(textNode)

            createApp(App, {
              "products": value,
              "viewModel": viewModel
            }).mount(textNode)
          })
        loaded = true
      }
    }
  })
})
