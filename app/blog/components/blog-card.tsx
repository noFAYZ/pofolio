'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons'


export default function BlogPostCard({ post }) {
  return (
    <div className="group">
      <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg">
        <Image
          src={urlFor(post.mainImage).width(800).height(450).fit('crop').auto('format').url()}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {post.categories && (
          <div className="absolute top-4 left-4 flex gap-2">
            {post.categories.slice(0, 2).map((category) => (
              <span key={category} className="px-2 py-1 text-xs font-medium bg-white/80 text-gray-800 rounded-full">
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        <Link href={`/blog/${post?.slug.current}`}>
          {post?.title}
        </Link>
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {post?.excerpt}
      </p>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
        {post.publishedAt && (
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          </div>
        )}
        <div className="flex items-center">
          <ClockIcon className="w-4 h-4 mr-1" />
          <span>{post.readingTime || '5 min read'}</span>
        </div>
      </div>
    </div>
  )
}