'use client'

import { Suspense, useEffect } from 'react'
import { Quicksand } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { IUser } from '@/models/User'
import useGlobalStore from '@/store/global'
import useUserStore, { User } from '@/store/user'

import AvatarMenu from '@/components/AvatarMenu'
import HeaderMessagesIconClientWrapper from '@/components/HeaderMessagesIconClientWrapper'
import HeaderNotificationsIconClientWrapper from '@/components/HeaderNotificationsIconClientWrapper'
import { ChatIcon, HomeIcon } from '@/components/NavIcons'
import SearchBar from '@/components/SearchBar'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true
})

const Header = ({ currentUser }: { currentUser: IUser }) => {
  const { justLoggedIn, userInitialized, setJustLoggedIn, setUserInitialized } =
    useGlobalStore()
  const { setUser } = useUserStore()

  useEffect(() => {
    if (!justLoggedIn && !userInitialized) {
      setJustLoggedIn(true)
    }

    if (justLoggedIn && !userInitialized) {
      setUser(currentUser as unknown as User)
      setUserInitialized(true)
      setJustLoggedIn(false)
    }
  }, [
    setUser,
    currentUser,
    justLoggedIn,
    userInitialized,
    setJustLoggedIn,
    setUserInitialized
  ])

  return (
    <header className="fixed z-50 flex h-[56px] w-full items-center justify-between gap-x-5 bg-[#0EA5E9] px-2.5 drop-shadow-md md:gap-x-8 lg:gap-x-10 lg:px-6">
      <div className="col-span-2 flex h-full items-center space-x-1.5">
        <Link href="/feed" className="block">
          <div className="relative h-10 w-10">
            <Image
              src={`${process.env.NEXT_PUBLIC_R2_FILES_URL}/images/logo/android-chrome-192x192.png`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Wraglet"
            />
          </div>
        </Link>
        <Link
          href={'/feed'}
          className={`${quicksand.className} hidden text-xl font-bold text-white md:block`}
        >
          wraglet
        </Link>
      </div>
      <div className="flex h-full w-full items-center lg:w-[600px]">
        <SearchBar className="w-full" />
      </div>
      <ul className="flex items-center justify-between gap-x-4 lg:gap-x-6">
        <li className="hidden cursor-pointer md:block">
          <Link href={'/feed'}>
            <HomeIcon className="text-white" />
          </Link>
        </li>
        <li className="relative cursor-pointer">
          <Suspense fallback={<ChatIcon className="text-white" />}>
            <HeaderMessagesIconClientWrapper
              userId={(currentUser as any)._id}
            />
          </Suspense>
        </li>
        <li className="relative cursor-pointer">
          <Suspense fallback={<div className="h-5 w-5" />}>
            <HeaderNotificationsIconClientWrapper
              userId={(currentUser as any)._id}
            />
          </Suspense>
        </li>
        <AvatarMenu />
      </ul>
    </header>
  )
}

export default Header
