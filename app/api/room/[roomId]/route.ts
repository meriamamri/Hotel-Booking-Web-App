import prisma from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const userId = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.roomId) {
      return new NextResponse('Room Id is required', { status: 400 })
    }

    const body = await req.json()

    const room = await prisma.room.update({
      where: {
        id: params.roomId,
      },
      data: { ...body },
    })

    return NextResponse.json(room)
  } catch (error) {
    console.log('ERROR at /api/room/roomId Post', error)

    return new NextResponse('Internal server error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const userId = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.roomId) {
      return new NextResponse('Room Id is required', { status: 400 })
    }

    const room = await prisma.room.delete({
      where: {
        id: params.roomId,
      },
    })

    return NextResponse.json(room)
  } catch (error) {
    console.log('ERROR at /api/room/roomId Delete', error)

    return new NextResponse('Internal server error', { status: 500 })
  }
}
