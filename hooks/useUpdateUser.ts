import { useState } from 'react'

interface UpdateUserData {
  firstName: string
  lastName: string
  phone: string
  street: string
  city: string
  postalCode: string
  country: string
  emoji: string
}

interface UseUpdateUserReturn {
  updateUser: (userId: string, data: UpdateUserData) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function useUpdateUser(): UseUpdateUserReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateUser = async (userId: string, data: UpdateUserData) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      const updatedUser = await response.json()
      return updatedUser
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { updateUser, isLoading, error }
} 