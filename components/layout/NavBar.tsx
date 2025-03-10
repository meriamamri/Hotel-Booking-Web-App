'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Image from 'next/image'
import Container from '../Container'
import { useRouter } from 'next/navigation'
import SearchInput from '../SearchInput'
import ModeToggle from '../ModeToggle'
import { NavMenu } from './NavMenu'

const NavBar = () => {
  const router = useRouter()

  return (
    <div className="border-b-primary/10 sticky top-0 border">
      <Container>
        <div className="flex w-full flex-row items-center justify-between">
          <div
            className="flex cursor-pointer flex-row items-center gap-2"
            onClick={() => router.push('/')}
          >
            <Image src="/logo.png" alt="logo" width={30} height={30} />
            <div className="text-xl font-bold">Booking Hotel</div>
          </div>
          <SearchInput />
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row gap-3">
              <ModeToggle />
              <NavMenu />
            </div>
            <header className="flex h-16 items-center justify-end gap-4 p-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default NavBar
