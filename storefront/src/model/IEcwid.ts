import { ICartAddData } from './ICartAddData';

export interface IEcwid {
  getOwnerId(): number
  getAppPublicToken(app: string): string
  getAppPublicConfig(app: string): string | undefined

  Cart: ICart

  OnAPILoaded: {
    add: (callback: () => void) => void;
  }
  OnPageLoaded: {
    add: (callback: (page: IPage) => void) => void;
  }
}

interface ICart {
  addProduct(data: ICartAddData): void
}

interface IPage {
  type: string
}