'use client'

import { usePathname, useRouter } from 'next/navigation'
import { HotelWithRooms } from './AddHotelForm'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import useLocation from '@/hooks/useLocation'
import AmenityItem from '../AmenityItem'
import { Dumbbell, MapPin, Waves } from 'lucide-react'
import { Button } from '../ui/button'

const HotelCard = ({ hotel }: { hotel: HotelWithRooms }) => {
  const pathname = usePathname()
  const isMyHotels = pathname.includes('my-hotels')
  const router = useRouter()

  const { getCountryByCode } = useLocation()
  const country = getCountryByCode(hotel.country)

  return (
    <div
      onClick={() => !isMyHotels && router.push(`/hotel-deatils/${hotel.id}`)}
      className={cn(
        'col-span-1 cursor-pointer transition hover:scale-105',
        isMyHotels && 'cursor-default'
      )}
    >
      <div className="bg-background/50 border-primary/10 flex gap-2 rounded-lg border">
        <div className="relative aspect-square h-[210px] w-full flex-1 overflow-hidden rounded-s-lg">
          <Image
            fill
            src={hotel.image}
            alt={hotel.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex h-[210px] flex-1 flex-col justify-between gap-1 p-1 py-2 text-sm">
          <h3 className="text-xl font-semibold">{hotel.title}</h3>
          <div className="text-primary/90">
            {hotel.description.substring(0, 45)}...
          </div>
          <div className="text-primary/90">
            <AmenityItem>
              <MapPin className="h-4 w-4" />
              {country?.name}.{hotel.city}
            </AmenityItem>
            {hotel.swimmingPool && (
              <AmenityItem>
                <Waves className="h-4 w-4" />
                Pool
              </AmenityItem>
            )}
            {hotel.gym && (
              <AmenityItem>
                <Dumbbell className="h-4 w-4" />
                Gym
              </AmenityItem>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {hotel?.rooms[0]?.roomPrice && (
                <>
                  <div className="text-base font-semibold">
                    ${hotel?.rooms[0]?.roomPrice}
                  </div>
                  <div className="text-xs">/24 hrs</div>
                </>
              )}
            </div>
            {isMyHotels && (
              <Button
                onClick={() => router.push(`/hotel/${hotel.id}`)}
                variant={'outline'}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelCard
