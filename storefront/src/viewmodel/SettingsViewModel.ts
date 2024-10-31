import { IProduct } from "../model/IProduct"
import IProductsResponse from "../model/IProductsResponse"
import { Settings } from "../model/Settings"

export default class SettingsViewModel {
  response?: Promise<IProductsResponse>
  settings: Settings = new Settings()

  //@ts-ignore
  private readonly ecwid = Ecwid
  private readonly storeKey?: String
  private readonly publicKey?: String

  constructor() {
    this.storeKey = this.ecwid.getOwnerId()
    this.publicKey = this.ecwid.getAppPublicToken('cstmz-101560752-test-app')

    const publicConfig = this.ecwid.getAppPublicConfig('cstmz-101560752-test-app')
    this.settings = JSON.parse(publicConfig)

    this.storeKey ?? console.error('[test-app] store id load error')
    this.publicKey ?? console.error('[test-app] public key load error')
    this.settings ?? console.error('[test-app] settings load error')
  }

  validate(): boolean
  {
    return !(this.storeKey == undefined ||
      this.publicKey == undefined ||
      this.settings == undefined ||
      this.settings.enabled == false)
  }

  async getProducts(): Promise<IProductsResponse> {
    if (!this.validate())
      return { total: 0, count: 0, items: [] }

    try {
      const response = await fetch(`https://app.ecwid.com/api/v3/${this.storeKey}/products?sortBy=UPDATED_TIME_DESC&limit=${this.settings?.suggestionCount ?? 0}`, {
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

  async addInCart(product: IProduct) {
    if (!this.validate())
      return

    const data = {
      id: product.id,
      quantity: 1,
      // callback: function(success, product, cart) {
        
      // }
    }

    this.ecwid.Cart.addProduct(data)
  }
}