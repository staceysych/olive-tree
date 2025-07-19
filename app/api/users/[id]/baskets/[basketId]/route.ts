import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../auth/[...nextauth]/route'

type RouteParams = {
  params: {
    id: string
    basketId: string
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

    const { id: userId, basketId } = await context.params

    // Fetch specific basket for the user
    const basket = await prisma.basket.findFirst({
      where: {
        id: basketId,
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
      }
    })

    if (!basket) {
      return new NextResponse('Basket not found', { status: 404 })
    }

    return NextResponse.json(basket)
  } catch (error) {
    console.error('Error fetching basket:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PUT(
  request: Request,
  context: RouteParams
) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id: userId, basketId } = await context.params
    const body = await request.json()
    const { name, frequency, categories, totalPrice, totalItems } = body

    // Update the basket
    const basket = await prisma.basket.update({
      where: {
        id: basketId,
        userId: userId
      },
      data: {
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
    console.error('Error updating basket:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: RouteParams
) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id: userId, basketId } = await context.params

    // Delete the basket
    await prisma.basket.delete({
      where: {
        id: basketId,
        userId: userId
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting basket:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 