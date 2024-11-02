'use client'

import React, { FormEvent, useReducer } from 'react'
import Image from 'next/image'
import useUserStore from '@/store/user'
import deJSONify from '@/utils/deJSONify'
import axios from 'axios'
import { FaCamera, FaPencil, FaUserPen } from 'react-icons/fa6'

import Avatar from '@/components/Avatar'

import UploadProfilePicture from '@/app/[username]/_components/UploadProfilePicture'

const ProfileHeader = () => {
  const { user, setUser } = useUserStore()
  const reducer = (state: any, action: any) => ({ ...state, ...action })

  const initialState = {
    openUploadProfilePictureModal: false,
    profilePicture: user?.profilePicture?.url,
    isLoading: false
  }

  const [
    { openUploadProfilePictureModal, profilePicture, isLoading },
    dispatchState
  ] = useReducer(reducer, initialState)

  const handleUpdateProfilePicture = async (
    e: FormEvent<HTMLFormElement>,
    profilePicture: string
  ) => {
    e.preventDefault()
    dispatchState({
      isLoading: true
    })

    try {
      const jsonUpdatedUser = await axios.patch('/api/update-profile-picture', {
        profilePicture
      })

      const updatedUser = deJSONify(jsonUpdatedUser.data)

      setUser(updatedUser)
    } catch (error) {
      console.error(error)
    } finally {
      dispatchState({
        isLoading: false,
        openUploadProfilePictureModal: false
      })
    }
  }

  return (
    <>
      <UploadProfilePicture
        isLoading={isLoading}
        profilePicture={profilePicture}
        show={openUploadProfilePictureModal}
        close={() => dispatchState({ openUploadProfilePictureModal: false })}
        setProfilePicture={(profilePicture: string, e) =>
          handleUpdateProfilePicture(e, profilePicture)
        }
      />
      <section className="mt-14 flex h-auto w-full flex-col items-center bg-white shadow-md lg:rounded-md xl:w-[1250px]">
        <div className="relative block h-[114px] w-full md:h-[284px] lg:h-[360px]">
          <div className="group relative block h-[114px] w-full md:h-[284px] lg:h-[360px]">
            <Image
              fill
              src={
                user?.coverPhoto
                  ? user.coverPhoto.url
                  : '/images/placeholder/cover-photo-default.jpg'
              }
              alt={
                user?.coverPhoto
                  ? `${user.firstName}'s cover photo`
                  : `User's default cover photo`
              }
            />
            <div className="absolute bottom-2.5 right-2.5 hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#D9D9D9] shadow-md group-hover:flex md:h-9 md:w-9">
              <FaCamera className="text-[8px] text-black md:text-sm" />
            </div>
          </div>

          <div className="absolute -bottom-[50px] left-4 z-10 overflow-hidden md:-bottom-[80px] lg:-bottom-[90px] lg:left-16">
            <div className="group relative block">
              <Avatar
                src={user?.profilePicture?.url}
                gender={user?.gender}
                alt={`${user?.firstName}'s avatar`}
                size="shadow-md h-[100px] w-[100px] md:h-[160px] md:w-[160px]"
              />
              <button
                onClick={() =>
                  dispatchState({ openUploadProfilePictureModal: true })
                }
                className="absolute bottom-2.5 right-2.5 hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#D9D9D9] shadow-md group-hover:flex md:h-9 md:w-9"
              >
                <FaCamera className="text-[8px] text-black md:text-sm" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative flex h-[90px] w-full flex-col justify-between md:h-[120px] lg:h-[140px]">
          <div className="ml-[132px] mr-4 mt-1 flex items-center justify-between md:ml-[180px] md:mt-5 lg:ml-[242px] lg:mt-10">
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold -tracking-[0.4px] text-black">
                {user?.firstName} {user?.lastName}
              </h1>
              <div className="flex items-center gap-x-2 text-[10px] font-semibold -tracking-[0.2px] text-zinc-500">
                <span>500 friends</span> <span>3k following</span>
              </div>
            </div>
            <span className="self-end text-xl text-slate-700">
              <FaUserPen />
            </span>
          </div>
          <div className="ml-[35px] pb-4 md:ml-[180px] md:pb-7 lg:ml-[242px] lg:pb-[30px]">
            <div className="flex gap-x-4">
              <p className="text-xs font-medium italic text-slate-700">
                &quot;{user?.bio ?? 'Set you bio here'}&quot;
              </p>
              <FaPencil className="text-slate-600" size={10} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfileHeader
