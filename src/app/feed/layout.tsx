import { Suspense } from 'react'
import type { Metadata } from 'next'
import getCurrentUser from '@/actions/getCurrentUser'
import deJSONify from '@/utils/deJSONify'

import Header from '@/components/Header'

import Loading from '@/app/loading'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Wraglet Feed - Explore Impactful Connections',
  description:
    'Explore the Wraglet Feed, where impactful connections unfold. Join us for brevity, resonance, and a future where every voice matters.',
  twitter: {
    images: {
      url: 'https://wraglet.com/images/logo/logo.png',
      alt: 'Wraglet - Redefining Social Connection',
      type: 'image/png',
      width: 300,
      height: 300
    }
  },
  openGraph: {
    title: 'Wraglet Feed - Explore Impactful Connections',
    images: {
      url: 'https://wraglet.com/images/logo/logo.png',
      alt: 'Wraglet - Redefining Social Connection',
      type: 'image/png',
      width: 300,
      height: 300
    },
    siteName: 'Wraglet Feed',
    description:
      'Discover impactful connections on the Wraglet Feed. Redefining social media with brevity and resonance. Join us for a future where every voice matters.'
  }
}

const FeedLayout = async ({ children }: { children: React.ReactNode }) => {
  const jsonUser = await getCurrentUser().catch((err) => {
    console.error(
      'Error happened while getting getCurrentUser() on Feed component: ',
      err
    )
  })

  const currentUser = deJSONify(jsonUser)

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[rgba(110,201,247,0.15)]">
      <Header currentUser={currentUser} />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  )
}

export default FeedLayout
