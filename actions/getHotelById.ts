import prisma from '@/lib/prismadb'

const getHotelById = async (hotelId: string) => {
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      include: { rooms: true },
    })
    if (!hotel) return null
    return hotel
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getHotelById
