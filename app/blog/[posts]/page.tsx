import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { POST_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, UserIcon } from 'lucide-react'

export default async function BlogPostPage({
  params,
}: {
  params: { posts: string }
}) {
  const postId = params.posts
  const post = await client.fetch(POST_QUERY, { slug: postId })

  const ptComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null
        }
        return (
          <Image
            alt={value.alt || ' '}
            loading="lazy"
            src={urlFor(value).width(720).height(480).fit('max').auto('format').url()}
            width={720}
            height={480}
            className="rounded-lg my-4"
          />
        )
      }
    }
  }

  if (!post) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">Post not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 ">
      <Card>
        <CardContent className="p-0">
          {post.mainImage && (
            <Image
              src={urlFor(post.mainImage).width(1200).height(630).fit('max').auto('format').url()}
              alt={post.title || 'Blog post image'}
              width={1200}
              height={630}
              className="w-full h-auto rounded-t-lg"
            />
          )}
        </CardContent>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {post.authorName && (
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={post.authorImage ? urlFor(post.authorImage).url() : '/profile/avatar.jpg'} />
                  <AvatarFallback>
                    <UserIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span>{post.authorName}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            <PortableText
              value={post.body}
              components={ptComponents}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}