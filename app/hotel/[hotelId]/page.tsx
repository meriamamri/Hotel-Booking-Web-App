import getHotelById from '@/actions/getHotelById'
import AddHotelForm from '@/components/hotel/AddHotelForm'
import { auth } from '@clerk/nextjs/server'

interface Props {
  params: {
    hotelId: string
  }
}

const Hotel = async ({ params }: Props) => {
  const hotel = await getHotelById(params.hotelId)
  const { userId } = await auth()

  if (!userId) return <div>Not Authenticated</div>
  if (hotel && hotel.userId !== userId) return <div>Access denied</div>

  return (
    <div>
      <AddHotelForm hotel={hotel} />
    </div>
  )
}

export default Hotel
