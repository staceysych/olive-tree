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

export function useGetUserBaskets(userId: string) {
  const [baskets, setBaskets] = useState<Basket[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBaskets = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`/api/users/${userId}/baskets`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch baskets')
        }

        const data = await response.json()
        setBaskets(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchBaskets()
    }
  }, [userId])

  return { baskets, isLoading, error }
} 