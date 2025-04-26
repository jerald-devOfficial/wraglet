'use client'

import Link from 'next/link'
import { UserInterface } from '@/interfaces'
import { useFollow } from '@/lib/hooks/useFollow'
import { IoPersonAddSharp } from 'react-icons/io5'

import Avatar from '@/components/Avatar'

const UserSuggestion = ({ user }: { user: UserInterface }) => {
  const { isFollowing, follow, loading, followersCount, followingCount } =
    useFollow(user._id)
  return (
    <div
      key={user._id}
      className="group relative flex items-center justify-between rounded-lg p-2.5 transition-all duration-200 hover:bg-sky-50/50"
    >
      <div className="flex items-center gap-3">
        <Link
          href={`/${user.username}`}
          className="block overflow-hidden rounded-full transition-transform duration-200 hover:scale-105"
        >
          <Avatar
            gender={user.gender}
            className="h-11 w-11 ring-2 ring-white"
            alt={`${user.firstName}'s Profile`}
            src={user.profilePicture?.url!}
          />
        </Link>
        <div className="flex flex-col gap-0.5">
          <Link
            href={`/${user.username}`}
            className="text-sm font-semibold text-gray-900 hover:text-sky-500"
          >
            {user.firstName} {user.lastName}
          </Link>
          <p className="text-xs font-medium text-gray-500">
            {followersCount} followers · {followingCount} following
          </p>
          <button
            className="mt-1 flex w-fit items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-600 transition-all duration-200 hover:bg-sky-500 hover:text-white disabled:opacity-60"
            onClick={() => follow()}
            disabled={isFollowing || loading}
          >
            <IoPersonAddSharp className="h-4 w-4" aria-hidden="true" />
            {isFollowing ? 'Following' : loading ? 'Following...' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  )
}

const RightNav = ({
  otherUsers,
  currentUserId
}: {
  otherUsers: UserInterface[]
  currentUserId: string
}) => {
  return (
    <aside className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[280px] flex-shrink-0 overflow-y-auto md:block xl:w-[320px]">
      <div className="flex h-full flex-col gap-4 py-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="mb-5 text-base font-semibold text-gray-900">
            Discover People
          </h2>

          <div className="flex flex-col gap-4">
            {otherUsers.map((user) => (
              <UserSuggestion key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default RightNav
