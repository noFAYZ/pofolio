import {client} from '@/sanity/lib/client'
import {POSTS_QUERY} from '@/sanity/lib/queries'
import Image from 'next/image'

export default  async function PostIndex() {

  const posts = await client.fetch(POSTS_QUERY)


  return (
    <ul>
      {posts?.map((post) => (
        <li key={post._id}>
          {post?.mainImage?.asset && (<Image src={post?.mainImage?.asset} width={200} height={200} alt="hgh" />)}
          
          <a href={`/blog/${post?.slug.current}`}>{post?.title}</a>
        </li>
      ))}
    </ul>
  )
}