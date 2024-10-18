import dynamic from 'next/dynamic'
import getOtherUsers from '@/actions/getOtherUsers'
import getPosts from '@/actions/getPosts'
import deJSONify from '@/utils/deJSONify'

const FeedParent = dynamic(() => import('./_components/Feed/FeedParent'), {
  ssr: false
})

const LeftNav = dynamic(() => import('./_components/LeftNav'), {
  ssr: false
})

const RightNav = dynamic(() => import('./_components/RightNav'), {
  ssr: false
})

const Page = async () => {
  const jsonOtherUsers = await getOtherUsers().catch((err: any) => {
    console.error(
      'Error happened while getting getOtherUsers() on Feed component: ',
      err
    )
  })

  const jsonInitialPosts = await getPosts().catch((err: any) => {
    console.error(
      'Error happened while getting getPosts() on Feed component: ',
      err
    )
  })

  const otherUsers = deJSONify(jsonOtherUsers)
  const initialPosts = deJSONify(jsonInitialPosts)

  return (
    <main className="mx-6 mt-14 flex w-full flex-grow items-start gap-x-5 3xl:max-w-screen-2xl">
      <LeftNav />
      <div className="flex flex-grow items-start gap-x-5 sm:mx-10 tablet:ml-10 xl:mx-auto xl:ml-20 2xl:ml-auto">
        <FeedParent initialPosts={initialPosts} />

        {/* <RightNav otherUsers={otherUsers!} /> */}
      </div>
    </main>
  )
}

export default Page
