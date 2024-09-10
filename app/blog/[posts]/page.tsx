import {client} from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image';
import {POSTS_QUERY, POST_QUERY} from '@/sanity/lib/queries'
import {PortableText} from '@portabletext/react'

export default async function page({
  params,
}: {
  params: { posts: string;};
}) {

  const postId = params.posts

  const post = await client.fetch(POST_QUERY,{slug:postId})
  console.log(urlFor(post?.mainImage))

  const ptComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null
        }
        return (
          <img
            alt={value.alt || ' '}
            loading="lazy"
            src={urlFor(value).width(320).height(240).fit('max').auto('format')}
          />
        )
      }
    }
  }


  return (
   <>
      <div>
      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(1000).height(400).fit('max').auto('format').url()}
          alt={post.title}
          style={{ width: '100%', height: 'auto' }}
        />
      )}

      <h1>{post?.title}</h1>
      <p>By {post?.authorName}</p>
      <p>Published on {new Date(post?.publishedAt).toLocaleDateString()}</p>
      <PortableText
        value={post?.body}
        components={ptComponents}
      />
    </div>
   </>
  )
}