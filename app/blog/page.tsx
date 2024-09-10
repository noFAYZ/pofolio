import {client} from '@/sanity/lib/client'
import {POSTS_QUERY} from '@/sanity/lib/queries'

export default async function page() {
  const posts = await client.fetch(POSTS_QUERY)

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <a href={`/blog/${post?.slug.current}`}>{post?.title}</a>
        </li>
      ))}
    </ul>
  )
}