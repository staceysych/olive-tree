import { useState } from 'react'

interface BasketData {
  categories: any
  totalPrice: number
  totalItems: number
  name?: string
  frequency?: string
}

interface Basket {
  id: string
  name: string
  frequency: string
  categories: any
  totalPrice: number
  totalItems: number
  createdAt: string
  updatedAt: string
}

export function useCreateBasket() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBasket = async (userId: string, basketData: BasketData): Promise<Basket | null> => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/users/${userId}/baskets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(basketData),
      })

      if (!response.ok) {
        throw new Error('Failed to create basket')
      }

      const data = await response.json()
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { createBasket, isLoading, error }
} 