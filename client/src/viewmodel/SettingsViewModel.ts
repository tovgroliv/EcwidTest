import { IProduct } from "@/model/IProduct"
import Papa from "papaparse"
import IProductsResponse from "@/model/IProductsResponse"
import { Settings } from "@/model/Settings"

export default class SettingsViewModel {
  response?: Promise<IProductsResponse>
  selected: Set<IProduct> = new Set<IProduct>()
  
  settingsResponse?: Promise<Settings>
  settings: Settings = new Settings()

  private readonly storeKey = '101560752'
  private readonly publicKey = 'public_eaBDuVmrse1hKZun4qaPF3LewugrnEgq'
  private readonly secretKey = ''

  constructor() {
    this.settingsResponse = this.LoadLocal()
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
      console.error('products load error', error);
      return { total: 0, count: 0, items: [] }
    }
  }

  ExportCsv() {
    var csv = Papa.unparse(Array.from(this.selected), {
      columns: [
        "id", "name", "price", "thumbnailUrl"
      ]
    })
    const blob = new Blob([csv], { type: 'text/plain' });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'exported.csv';
    link.click();

    window.URL.revokeObjectURL(url);
  }

  UpdateSuggestionCount() {
    this.UpdateLocal()
  }

  TurnOnOff() {
    this.UpdateLocal()
  }

  private async Update() {
    try {
      await fetch(`https://app.ecwid.com/api/v3/${this.storeKey}/storage/settings`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.secretKey}`
        },
        body: JSON.stringify(this.settings)
      })
    } catch (error) {
      console.error('update settings error', error);
      return { total: 0, count: 0, items: [] }
    }
  }

  private async Load(): Promise<Settings> {
    try {
      const response = await fetch(`https://app.ecwid.com/api/v3/${this.storeKey}/storage/settings`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.secretKey}`
        }
      })
      return (await response.json()) as Settings
    } catch (error) {
      console.error('update settings error', error);
      return { enabled: false, suggestionCount: 0 }
    }
  }

  private UpdateLocal() {
    try {
      fetch(`http://localhost:3000/settings`, {
        method: "POST",
        body: JSON.stringify(this.settings)
      })
    } catch (error) {
      console.error('update settings error', error);
    }
  }

  private async LoadLocal(): Promise<Settings> {
    try {
      const response = await fetch(`http://localhost:3000/settings`, {
        method: "GET",
      })
      return (await response.json()) as Settings
    } catch (error) {
      console.error('load settings error', error);
      return { enabled: false, suggestionCount: 0 }
    }
  }
}