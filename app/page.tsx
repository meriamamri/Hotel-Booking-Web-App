import { getHotels } from '@/actions/getHotels'
import HotelList from '@/components/hotel/HotelList'

interface HomeProps {
  searchParams: {
    title: string
    country: string
    state: string
    city: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const hotelList = await getHotels({ ...searchParams })
  if (!hotelList) return <div>No hotels found...</div>

  return (
    <div>
      <HotelList hotels={hotelList} />
    </div>
  )
}
