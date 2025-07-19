import { useState } from 'react'

interface UseDeleteBasketReturn {
  deleteBasket: (userId: string, basketId: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function useDeleteBasket(): UseDeleteBasketReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteBasket = async (userId: string, basketId: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/users/${userId}/baskets/${basketId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete basket')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { deleteBasket, isLoading, error }
} 