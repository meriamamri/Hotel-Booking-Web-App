import { HotelWithRooms } from './AddHotelForm'
import HotelCard from './HotelCard'

const HotelList = ({ hotels }: { hotels: HotelWithRooms[] }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel: HotelWithRooms) => (
        <div key={hotel.id}>
          <HotelCard hotel={hotel} />
        </div>
      ))}
    </div>
  )
}

export default HotelList
