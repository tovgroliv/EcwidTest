import { IProduct } from "@/model/IProduct"
import Papa from "papaparse"
import IProductsResponse from "@/model/IProductsResponse"
import { Settings } from "@/model/Settings"

export default class SettingsViewModel {
  response?: Promise<IProductsResponse>
  selected: Set<IProduct> = new Set<IProduct>()

  settings: Settings = new Settings()

  constructor() {
    this.response = this.getProducts()
  }

  getProducts = async function (): Promise<IProductsResponse> {
    try {
      const response = await fetch('https://app.ecwid.com/api/v3/101560752/products', {
        method: "GET",
        headers: {
          "Authorization": "Bearer public_eaBDuVmrse1hKZun4qaPF3LewugrnEgq"
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
    console.log(this.settings.suggestionCount)
  }

  TurnOnOff() {
    console.log(this.settings.enabled)
  }
}