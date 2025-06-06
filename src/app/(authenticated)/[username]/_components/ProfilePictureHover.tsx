'use client'

import { Fragment, useReducer } from 'react'
import useUserStore from '@/store/user'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaCamera } from 'react-icons/fa'

import UploadProfilePicture from '@/app/(authenticated)/[username]/_components/UploadProfilePicture'

type ProfilePictureHoverProps = {
  profilePicture: string
}

const ProfilePictureHover = ({ profilePicture }: ProfilePictureHoverProps) => {
  const reducer = (state: any, action: any) => ({ ...state, ...action })
  const setUser = useUserStore((state) => state.setUser)
  const queryClient = useQueryClient()

  const initialState = {
    openUploadProfilePictureModal: false
  }

  const [{ openUploadProfilePictureModal }, dispatchState] = useReducer(
    reducer,
    initialState
  )

  const handleUpdateProfilePicture = async (e: any, profilePicture: string) => {
    try {
      const { status, data } = await axios.patch(
        '/api/update-profile-picture',
        {
          profilePicture
        }
      )

      if (status === 200) {
        // Update the user state in Zustand store
        setUser(data)

        // Invalidate and refetch user and posts queries
        await queryClient.invalidateQueries({ queryKey: ['user'] })
        const username =
          data?.username || useUserStore.getState().user?.username
        if (username) {
          await queryClient.invalidateQueries({ queryKey: ['user', username] })
          await queryClient.invalidateQueries({
            queryKey: ['profileUser', username]
          })
        }
        await queryClient.invalidateQueries({ queryKey: ['posts'] })

        toast.success('Profile picture updated successfully')
        dispatchState({ openUploadProfilePictureModal: false })
      }
    } catch (error) {
      console.error('Error updating profile picture:', error)
      toast.error('Failed to update profile picture')
    }
  }

  return (
    <Fragment>
      <UploadProfilePicture
        profilePicture={profilePicture}
        show={openUploadProfilePictureModal}
        close={() => dispatchState({ openUploadProfilePictureModal: false })}
        setProfilePicture={(profilePicture: string, e) =>
          handleUpdateProfilePicture(e, profilePicture)
        }
      />

      <button
        onClick={() => dispatchState({ openUploadProfilePictureModal: true })}
        className="absolute right-2.5 bottom-2.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#D9D9D9] shadow-md md:hidden md:h-9 md:w-9 lg:hidden lg:group-hover:flex"
      >
        <FaCamera className="text-[8px] text-black md:text-sm" />
      </button>
    </Fragment>
  )
}

export default ProfilePictureHover
