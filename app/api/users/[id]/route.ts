import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

type RouteParams = {
  params: {
    id: string
  }
}

export async function GET(
  request: Request,
  context: RouteParams
) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id: userId } = await context.params

    // Fetch user from the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        emoji: true,
        street: true,
        city: true,
        postalCode: true,
        country: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password field for security
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  context: RouteParams
) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id: userId } = await context.params
    const body = await request.json()
    const { firstName, lastName, phone, street, city, postalCode, country, emoji } = body

    // Update user in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        firstName,
        lastName,
        phone,
        street,
        city,
        postalCode,
        country,
        emoji,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        street: true,
        city: true,
        postalCode: true,
        country: true,
        emoji: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 