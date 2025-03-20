import prisma from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const userId = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    } else {
      const body = await req.json()

      const hotel = await prisma.hotel.create({
        data: {
          ...body,
          userId: userId.userId,
        },
      })

      return NextResponse.json(hotel)
    }
  } catch (error) {
    console.log('ERROR at /api/hotel Post', error)

    return new NextResponse('Internal server error', { status: 500 })
  }
}
