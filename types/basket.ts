export enum BasketType {
  TRIAL = "trial",
  STANDARD = "standard",
  FAMILY = "family",
  CUSTOM = "custom"
} 

export interface BasketItem {
  id: string
  name: string
  price: number
  unit: string
  quantity: number
  image: string
  category: string
}

export type BasketOrderItem = {
  unit: string
  quantity: number
  price: number
}

export type BasketOrderCategory = {
  [itemName: string]: BasketOrderItem
}

export type BasketOrderList = {
  categories: {
    [categoryName: string]: BasketOrderCategory
  }
  totalPrice: number
  totalItems: number
}