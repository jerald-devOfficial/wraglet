'use client'

import React, { Fragment } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import useFeedPostsStore from '@/store/feedPosts'
import useGlobalStore from '@/store/global'
import useUserStore from '@/store/user'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react'
import { FaCircleUser, FaRegCircleUser } from 'react-icons/fa6'
import {
  HiArrowRightOnRectangle,
  HiCog,
  HiOutlineArrowRightOnRectangle,
  HiOutlineCog
} from 'react-icons/hi2'

import Avatar from './Avatar'

const AvatarMenu = () => {
  const { user, clearUser } = useUserStore()
  const { clearGlobalState } = useGlobalStore()
  const { clearFeedPosts } = useFeedPostsStore()

  const handleLogout = () => {
    signOut()
    clearUser()
    clearGlobalState()
    clearFeedPosts()
  }
  return (
    <Menu as="li" className="inline-flex">
      <MenuButton className="relative h-8 w-8 cursor-pointer rounded-full border border-solid border-white">
        <Avatar
          gender={user?.gender}
          size="h-8 w-8"
          src={user?.profilePicture?.url}
          alt={'Avatar'}
        />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-6 mt-12 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1">
            <MenuItem>
              {({ active }) => (
                <Link
                  href={`/profile/${user?.username}`}
                  className={`${
                    active ? 'bg-[#1B87EA] text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <FaCircleUser className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <FaRegCircleUser
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  {user?.firstName}
                </Link>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? 'bg-[#1B87EA] text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <HiCog className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <HiOutlineCog className="mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  Account Settings
                </button>
              )}
            </MenuItem>
          </div>
          <div className="px-1 py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-[#1B87EA] text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <HiArrowRightOnRectangle
                      className="mr-2 h-5 w-5 text-[#bg-[#1B87EA]]"
                      aria-hidden="true"
                    />
                  ) : (
                    <HiOutlineArrowRightOnRectangle
                      className="mr-2 h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  )}
                  Logout
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default AvatarMenu
