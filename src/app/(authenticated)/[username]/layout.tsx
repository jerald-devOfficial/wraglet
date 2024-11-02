import React from 'react'
import getCurrentUser from '@/actions/getCurrentUser'
import deJSONify from '@/utils/deJSONify'

import Header from '@/components/Header'

export const dynamic = 'force-dynamic'

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const jsonCurrentUser = await getCurrentUser().catch((err: any) => {
    console.error(
      'Error happened while getting getCurrentUser() on Feed component: ',
      err
    )
  })

  const currentUser = deJSONify(jsonCurrentUser)

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[rgba(110,201,247,0.15)]">
      <Header currentUser={currentUser} />
      {children}
    </div>
  )
}

export default ProfileLayout
