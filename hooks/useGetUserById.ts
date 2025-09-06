import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string | null
  firstName: string | null
  lastName: string | null
  phone: string | null
  emoji: string | null
  street: string | null
  city: string | null
  postalCode: string | null
  country: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export function useGetUserById(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`/api/users/${userId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const data = await response.json()
        // Convert string dates to Date objects and ensure all fields are properly typed
        setUser({
          ...data,
          email: data.email || null,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          phone: data.phone || null,
          emoji: data.emoji || null,
          street: data.street || null,
          city: data.city || null,
          postalCode: data.postalCode || null,
          country: data.country || null,
          createdAt: data.createdAt ? new Date(data.createdAt) : null,
          updatedAt: data.updatedAt ? new Date(data.updatedAt) : null
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  return { user, isLoading, error }
} 