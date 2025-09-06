import { useState, useEffect } from 'react'

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

export function useGetBasketById(userId: string, basketId: string) {
  const [basket, setBasket] = useState<Basket | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`/api/users/${userId}/baskets/${basketId}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Basket not found')
          }
          throw new Error('Failed to fetch basket')
        }

        const data = await response.json()
        setBasket(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    if (userId && basketId) {
      fetchBasket()
    }
  }, [userId, basketId])

  return { basket, isLoading, error }
} 