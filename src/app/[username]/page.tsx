import React from 'react'
import getPostsByUsername from '@/actions/getPostsByUsername'
import deJSONify from '@/utils/deJSONify'

import Header from '@/app/[username]/_components/Header'
import ProfileParent from '@/app/[username]/_components/ProfileParent'

const ProfilePage = async ({
  params
}: {
  params: Promise<{ slug: string }>
}) => {
  const slug = (await params).slug
  const decodedUsername = decodeURIComponent(slug)

  const jsonInitialPosts = await getPostsByUsername(decodedUsername)
  const initialPosts = deJSONify(jsonInitialPosts)
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-y-6 overflow-hidden">
      <Header />
      <ProfileParent initialPosts={initialPosts} />
    </main>
  )
}

export default ProfilePage
