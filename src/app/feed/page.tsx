import getPosts from '../actions/getPosts';
import dynamic from 'next/dynamic';

const FeedClient = dynamic(() => import('./FeedClient'), {
  ssr: false
});

const Feed = async () => {
  const initialPosts = await getPosts().catch((err) => {
    console.error(
      'Error happened while getting getPosts() on Feed component: ',
      err
    );
  });

  return (
    <div className='flex flex-col min-h-screen overflow-hidden relative bg-[rgba(110,201,247,0.15)]'>
      <main className='flex-grow grid grid-cols-10 mx-6 gap-x-5 mt-14'>
        <FeedClient initialPosts={initialPosts!} />
      </main>
    </div>
  );
};

export default Feed;
