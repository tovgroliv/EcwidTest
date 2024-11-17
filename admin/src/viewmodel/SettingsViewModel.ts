import { IProduct } from "@/model/IProduct"
import Papa from "papaparse"
import IProductsResponse from "@/model/IProductsResponse"
import { Settings } from "@/model/Settings"
import { IEcwidApp } from "@/model/IEcwidApp"

declare var EcwidApp: IEcwidApp

export default class SettingsViewModel {
  response?: Promise<IProductsResponse>
  selected: Set<IProduct> = new Set<IProduct>()

  settingsResponse?: Promise<Settings>
  settings: Settings = new Settings()

  readonly ecwid:IEcwidApp = EcwidApp
  private readonly storeKey = '101560752'
  private readonly publicKey = 'public_eaBDuVmrse1hKZun4qaPF3LewugrnEgq'

  constructor() {
    this.settingsResponse = this.Load()
    this.settingsResponse
      .then(value => {
        this.settings.enabled = value.enabled
        this.settings.suggestionCount = value.suggestionCount
      })

    this.response = this.getProducts()
  }

  private async getProducts(): Promise<IProductsResponse> {
    try {
      const response = await fetch(`https://app.ecwid.com/api/v3/${this.storeKey}/products`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.publicKey}`
        }
      })
      return (await response.json()) as IProductsResponse
    } catch (error) {
      console.error('products load error', error)
      return { total: 0, count: 0, items: [] }
    }
  }

  ExportCsv() {
    var csv = Papa.unparse(Array.from(this.selected), {
      columns: [
        "id", "name", "price", "imageUrl"
      ]
    })
    const blob = new Blob([csv], { type: 'text/plain' })

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'exported.csv'
    link.click()

    window.URL.revokeObjectURL(url)
  }

  Update() {
    try {
      this.ecwid.setAppStorage({
        public: JSON.stringify(this.settings)
      }, () => {
        console.log("saved alright")
      }, (e: unknown) => {
        console.error(e)
      });
    } catch (error) {
      console.error('update settings error', error);
    }
  }

  private async Load(): Promise<Settings> {
    try {
      return new Promise((resolve, reject) => {
        this.ecwid.getAppPublicConfig((value: string | null) => {
          if (value) {
            this.settings = JSON.parse(value)
            resolve(this.settings)
          }
        })
      })
    } catch (error) {
      console.error('load settings error', error);
      this.Update()
      return { enabled: false, suggestionCount: 0 }
    }
  }
}