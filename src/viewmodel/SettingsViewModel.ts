import IProductsResponse from "@/model/IProductsResponse"

export default class SettingsViewModel {
  response?: Promise<IProductsResponse>//IProductsResponse

  constructor() {
    // this.getProducts()
    //   .then(response => {
    //     console.log(response)
    //     this.response = response
    //   })
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
}