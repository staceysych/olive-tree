import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/route'

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

    // Fetch user baskets from the database
    const baskets = await prisma.basket.findMany({
      where: {
        userId: userId
      },
      select: {
        id: true,
        name: true,
        frequency: true,
        categories: true,
        totalPrice: true,
        totalItems: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(baskets)
  } catch (error) {
    console.error('Error fetching user baskets:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(
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
    const { categories, totalPrice, totalItems, name = "Basket", frequency = "Once" } = body

    // Create new basket for the user
    const basket = await prisma.basket.create({
      data: {
        userId: userId,
        name,
        frequency,
        categories,
        totalPrice,
        totalItems,
      },
      select: {
        id: true,
        name: true,
        frequency: true,
        categories: true,
        totalPrice: true,
        totalItems: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    return NextResponse.json(basket)
  } catch (error) {
    console.error('Error creating basket:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 