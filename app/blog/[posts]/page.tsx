'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { POST_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { motion } from 'framer-motion'
import { CalendarIcon, UserIcon, ClockIcon, ShareIcon, BookmarkIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function BlogPostPage({
  params,
}: {
  params: { posts: string }
}) {
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [readingTime, setReadingTime] = useState('3 min')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postId = params.posts
        const fetchedPost = await client.fetch(POST_QUERY, { slug: postId })
        setPost(fetchedPost)
        
        // Calculate estimated reading time
        if (fetchedPost?.body) {
          const wordCount = fetchedPost.body.reduce((acc, item) => {
            if (item._type === 'block' && item.children) {
              return acc + item.children.reduce((textAcc, child) => {
                return textAcc + (child.text ? child.text.split(' ').length : 0)
              }, 0)
            }
            return acc
          }, 0)
          
          const time = Math.ceil(wordCount / 200) // Average reading speed
          setReadingTime(`${time} min read`)
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching post:", error)
        setIsLoading(false)
      }
    }
    
    fetchPost()
  }, [params.posts])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const ptComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null
        }
        return (
          <div className="my-8 overflow-hidden rounded-xl">
            <Image
              alt={value.alt || ' '}
              loading="lazy"
              src={urlFor(value).width(1200).height(800).fit('max').auto('format').url()}
              width={1200}
              height={800}
              className="w-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        )
      }
    },
    block: {
      h4: ({children}) => (
        <h4 className="text-2xl font-bold mt-10 mb-4 ">{children}</h4>
      ),
      normal: ({children}) => (
        <p className="text-lg leading-relaxed mb-6 text-foreground">{children}</p>
      )
    },
    list: {
      bullet: ({children}) => (
        <ul className="list-disc pl-6 mb-6  text-foreground">
          {children}
        </ul>
      )
    },
    listItem: {
      bullet: ({children}) => (
        <li className="text-md ">{children}</li>
      )
    },
    marks: {
      strong: ({children}) => (
        <strong className="font-bold text-primary-emphasis">{children}</strong>
      ),
      em: ({children}) => (
        <em className="italic bg-primary font-semibold px-1.5 rounded-lg">{children}</em>
      )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-96 bg-muted rounded-2xl w-full"></div>
          <div className="h-12 bg-muted rounded-lg w-3/4"></div>
          <div className="h-6 bg-muted rounded-lg w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-card rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
            <p className="mt-2 text-muted-foreground">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  pt-10 pb-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-12"
      >
        {post.mainImage && (
          <div className="h-[60vh] max-h-96 md:max-h-[70vh] w-full relative overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(1920).height(1080).fit('max').auto('format').url()}
              alt={post.title || 'Blog post image'}
              fill
              priority
              className="object-cover "
              quality={85}
            />
        
          </div>
        )}
        
        <div className="container mx-auto px-4">
          <div className="relative -mt-32 md:-mt-48 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-card rounded-2xl shadow-xl p-8 md:p-12"
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 mb-8">
                <div className="flex items-center space-x-4">
                  {post.authorName && (
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-primary">
                        {post.authorImage ? (
                          <Image 
                            src={urlFor(post.authorImage).width(100).height(100).url()} 
                            alt={post.authorName}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        ) : (
                          <UserIcon className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-foreground">{post.authorName}</p>
                        <p className="text-sm text-muted-foreground">Author</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {post.publishedAt && (
                    <div className="flex items-center bg-muted px-3 py-1 rounded-full">
                      <CalendarIcon className="h-4 w-4 mr-1 text-primary" />
                      <span className="text-sm">{formatDate(post.publishedAt)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center bg-muted px-3 py-1 rounded-full">
                    <ClockIcon className="h-4 w-4 mr-1 text-primary" />
                    <span className="text-sm">{readingTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative">
          {/* Floating action buttons */}
          <div className="hidden md:flex fixed left-[calc(50%-550px)] top-1/3 flex-col gap-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-card rounded-full shadow-lg flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Share article"
            >
              <ShareIcon className="h-5 w-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`w-12 h-12 bg-card rounded-full shadow-lg flex items-center justify-center transition-colors ${
                isBookmarked ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
              aria-label="Bookmark article"
            >
              <BookmarkIcon className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </motion.button>
          </div>
          
          {/* Main content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-card/80 rounded-2xl shadow-lg p-8 md:p-12"
          >
            {post.excerpt && (
              <div className="mb-10 italic text-xl text-muted-foreground border-l-4 border-primary pl-4">
                {post.excerpt}
              </div>  
            )}
            
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-primary prose-a:text-primary prose-img:rounded-xl">
              <PortableText
                value={post.body}
                components={ptComponents}
              />
            </div>
            
            {/* Mobile action buttons */}
            <div className="mt-12 flex justify-center gap-6 md:hidden">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-foreground"
                aria-label="Share article"
              >
                <ShareIcon className="h-5 w-5" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-12 h-12 bg-muted rounded-full flex items-center justify-center ${
                  isBookmarked ? 'text-primary' : 'text-foreground'
                }`}
                aria-label="Bookmark article"
              >
                <BookmarkIcon className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}