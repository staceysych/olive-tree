import { useState } from 'react'

interface UpdateBasketData {
  name: string
  frequency: string
  categories: Record<string, Record<string, { quantity: number; unit: string; price: number }>>
  totalPrice: number
  totalItems: number
}

interface UseUpdateBasketReturn {
  updateBasket: (userId: string, basketId: string, data: UpdateBasketData) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function useUpdateBasket(): UseUpdateBasketReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateBasket = async (userId: string, basketId: string, data: UpdateBasketData) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/users/${userId}/baskets/${basketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update basket')
      }

      const updatedBasket = await response.json()
      return updatedBasket
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { updateBasket, isLoading, error }
} 