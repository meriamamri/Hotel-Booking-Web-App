'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Booking, Hotel, Room } from '@prisma/client'
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  Home,
  Loader2,
  MountainSnow,
  Pencil,
  Ship,
  Trash,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from 'lucide-react'
import Image from 'next/image'
import AmenityItem from '../AmenityItem'
import { Separator } from '../ui/separator'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import AddRoomForm from './AddRoomForm'
import axios from 'axios'
import { toast } from 'sonner'

interface RoomCardProps {
  hotel?: Hotel & {
    rooms: Room[]
  }
  room: Room
  booking?: Booking[]
}

const RoomCard = ({ hotel, room, booking = [] }: RoomCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const router = useRouter()
  const pathname = usePathname()
  const isHotelDetails = pathname.includes('hotel-details')

  const handleDialogOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleRoomDelete = (room: Room) => {
    setIsLoading(true)
    const getImageKey = (image: string | undefined) =>
      image?.substring(image?.lastIndexOf('/') + 1)
    try {
      const imageKey = getImageKey(room?.image)
      axios.post('/api/uploadthing/delete', { imageKey })
      axios.delete(`/api/room/${room.id}`)
      setIsLoading(false)
      router.refresh()
      toast('Room deleted successfully!')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast('Error while deleting room')
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{room.title}</CardTitle>
          <CardDescription>{room.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="relative aspect-square h-[200px] overflow-hidden rounded-lg">
            <Image
              fill
              src={room.image}
              alt={room.title}
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 content-start gap-4 text-sm">
            <AmenityItem>
              <Bed className="h-4 w-4" />
              {room.bedCount} Bed{'(s)'}
            </AmenityItem>
            <AmenityItem>
              <Users className="h-4 w-4" />
              {room.guestCount} Guest{'(s)'}
            </AmenityItem>
            <AmenityItem>
              <Bath className="h-4 w-4" />
              {room.bedCount} Bathroom{'(s)'}
            </AmenityItem>
            {!!room.kingBed && (
              <AmenityItem>
                <BedDouble className="h-4 w-4" />
                {room.kingBed} King Bed{'(s)'}
              </AmenityItem>
            )}
            {!!room.queenBed && (
              <AmenityItem>
                <Bed className="h-4 w-4" />
                {room.queenBed} Queen Bed{'(s)'}
              </AmenityItem>
            )}
            {!!room.roomService && (
              <AmenityItem>
                <UtensilsCrossed className="h-4 w-4" />
                {room.roomService} Room Services
              </AmenityItem>
            )}
            {!!room.TV && (
              <AmenityItem>
                <Tv className="h-4 w-4" />
                {room.TV} TV
              </AmenityItem>
            )}
            {!!room.balcony && (
              <AmenityItem>
                <Home className="h-4 w-4" />
                {room.balcony} Balcony
              </AmenityItem>
            )}
            {!!room.freeWifi && (
              <AmenityItem>
                <Wifi className="h-4 w-4" />
                {room.freeWifi} Free Wifi
              </AmenityItem>
            )}
            {!!room.cityView && (
              <AmenityItem>
                <Castle className="h-4 w-4" />
                {room.cityView} City View
              </AmenityItem>
            )}
            {!!room.oceanView && (
              <AmenityItem>
                <Ship className="h-4 w-4" />
                {room.oceanView} Ocean View
              </AmenityItem>
            )}
            {!!room.forestView && (
              <AmenityItem>
                <Trees className="h-4 w-4" />
                {room.forestView} Forest View
              </AmenityItem>
            )}
            {!!room.mountainView && (
              <AmenityItem>
                <MountainSnow className="h-4 w-4" />
                {room.mountainView} Mountain View
              </AmenityItem>
            )}
            {!!room.airCondition && (
              <AmenityItem>
                <AirVent className="h-4 w-4" />
                {room.airCondition} Air Condition
              </AmenityItem>
            )}
            {!!room.soundProofed && (
              <AmenityItem>
                <VolumeX className="h-4 w-4" />
                {room.soundProofed} Sound Proofed
              </AmenityItem>
            )}
          </div>
          <Separator />
          <div className="flex justify-between gap-4">
            <div>
              Room Price: <span className="font-bold">${room.roomPrice}</span>
              <span className="text-xs">/24hrs</span>
            </div>
            {!!room.breakFastPrice && (
              <div>
                BreakFast Price:{' '}
                <span className="font-bold">${room.breakFastPrice}</span>
              </div>
            )}
          </div>
          <Separator />
        </CardContent>
        <CardFooter>
          {isHotelDetails ? (
            <div>Hotel Details Page</div>
          ) : (
            <div className="flex w-full justify-between">
              <Button
                disabled={isLoading}
                type="button"
                variant={'ghost'}
                onClick={() => handleRoomDelete(room)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4" /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="ww-4 mr-2 h-4" /> Delete
                  </>
                )}
              </Button>
              <Dialog open={isOpen}>
                <DialogTrigger>
                  <Button
                    type="button"
                    variant={'outline'}
                    className="max-w-[150px]"
                    onClick={() => setIsOpen(true)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Update Room
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%] max-w-[900px]">
                  <DialogHeader className="px-2">
                    <DialogTitle>Update Room</DialogTitle>
                    <DialogDescription>
                      Make changes to this room.
                    </DialogDescription>
                  </DialogHeader>
                  <AddRoomForm
                    hotel={hotel}
                    handleDialogOpen={handleDialogOpen}
                    room={room}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default RoomCard
