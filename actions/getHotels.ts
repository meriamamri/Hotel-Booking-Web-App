import prisma from '@/lib/prismadb'

export const getHotels = async ({
  title,
  country,
  state,
  city,
}: {
  title: string
  country: string
  state: string
  city: string
}) => {
  try {
    const hotels = await prisma.hotel.findMany({
      include: { rooms: true },
      where: {
        title: {
          contains: title,
        },
        country,
        state,
        city,
      },
    })
    return hotels
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}
