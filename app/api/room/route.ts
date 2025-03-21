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

      const room = await prisma.room.create({
        data: {
          ...body,
        },
      })

      return NextResponse.json(room)
    }
  } catch (error) {
    console.log('ERROR at /api/room Post', error)

    return new NextResponse('Internal server error', { status: 500 })
  }
}
