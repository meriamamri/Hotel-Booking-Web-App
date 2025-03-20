import prisma from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const userId = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.hotelId) {
      return new NextResponse('Hotel Id is required', { status: 400 })
    }

    const body = await req.json()

    const hotel = await prisma.hotel.update({
      where: {
        id: params.hotelId,
      },
      data: { ...body },
    })

    return NextResponse.json(hotel)
  } catch (error) {
    console.log('ERROR at /api/hotel Post', error)

    return new NextResponse('Internal server error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const userId = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.hotelId) {
      return new NextResponse('Hotel Id is required', { status: 400 })
    }

    const hotel = await prisma.hotel.delete({
      where: {
        id: params.hotelId,
      },
    })

    return NextResponse.json(hotel)
  } catch (error) {
    console.log('ERROR at /api/hotel/hotelId Delete', error)

    return new NextResponse('Internal server error', { status: 500 })
  }
}
