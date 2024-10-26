import { IProduct } from "./IProduct"

export default interface IProductsResponse {
  total: number
  count: number
  items: IProduct[]
}