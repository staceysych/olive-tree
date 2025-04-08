"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { BasketType } from "@/types/basket"

interface BasketContextType {
  selectedBasketType: BasketType | null
  setSelectedBasketType: (type: BasketType | null) => void
}

const BasketContext = createContext<BasketContextType | undefined>(undefined)

export function BasketProvider({ children }: { children: ReactNode }) {
  const [selectedBasketType, setSelectedBasketType] = useState<BasketType | null>(null)

  return (
    <BasketContext.Provider value={{ selectedBasketType, setSelectedBasketType }}>
      {children}
    </BasketContext.Provider>
  )
}

export function useBasket() {
  const context = useContext(BasketContext)
  if (context === undefined) {
    throw new Error("useBasket must be used within a BasketProvider")
  }
  return context
} 