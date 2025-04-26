'use client'

import getUserByUsername from '@/actions/getUserByUsername'
import { useQuery } from '@tanstack/react-query'

import Avatar from '@/components/Avatar'

import ProfilePictureHover from '@/app/(authenticated)/[username]/_components/ProfilePictureHover'

interface ProfilePictureProps {
  username: string
  userGender: string
  userProfilePictureUrl: string | null
  isCurrentUser: boolean
}

const ProfilePicture = ({
  username,
  userGender,
  userProfilePictureUrl,
  isCurrentUser
}: ProfilePictureProps) => {
  // Get latest user data from React Query
  const { data: userData } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserByUsername(username),
    initialData: {
      profilePicture: { url: userProfilePictureUrl },
      gender: userGender
    }
  })

  const defaultProfilePictureUrl =
    userGender === 'Male'
      ? `${process.env.NEXT_PUBLIC_R2_FILES_URL}/images/placeholder/male-placeholder.png`
      : `${process.env.NEXT_PUBLIC_R2_FILES_URL}/images/placeholder/female-placeholder.png`

  // Use profile picture if it exists, otherwise fallback to default
  const finalProfilePictureUrl =
    userData?.profilePicture?.url && userData.profilePicture.url !== ''
      ? userData.profilePicture.url
      : defaultProfilePictureUrl

  return (
    <div className="group relative block">
      <Avatar
        src={finalProfilePictureUrl}
        gender={userGender}
        alt={`${username}'s avatar`}
        size="shadow-md h-[100px] w-[100px] md:h-[160px] md:w-[160px]"
      />
      {isCurrentUser && (
        <ProfilePictureHover profilePicture={finalProfilePictureUrl} />
      )}
    </div>
  )
}

export default ProfilePicture
