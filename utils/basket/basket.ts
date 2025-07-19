import { BasketItem, BasketOrderCategory, BasketOrderList } from "@/types/basket"

export const transformBasketToOrderList = (items: BasketItem[], totalPrice: number, totalItems: number): BasketOrderList => {
    const categories: { [key: string]: BasketOrderCategory } = {}
    
    items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = {}
      }
      
      categories[item.category][item.id] = {
        unit: item.unit,
        quantity: item.quantity,
        price: item.price
      }
    })
  
    return {
      categories,
      totalPrice,
      totalItems
    }
  }