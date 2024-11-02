'use client'

import { PostDocument } from '@/models/Post'
import * as Ably from 'ably'
import { AblyProvider, ChannelProvider } from 'ably/react'

import Body from '@/app/[username]/_components/Body'

type Props = {
  initialPosts: PostDocument[]
}

const ProfileParent = ({ initialPosts }: Props) => {
  const client = new Ably.Realtime({ authUrl: '/api/token' })
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="post-channel">
        <Body initialPosts={initialPosts} />
      </ChannelProvider>
    </AblyProvider>
  )
}

export default ProfileParent
