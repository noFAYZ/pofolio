"use client";

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { ArrowRightIcon, CalendarIcon, ClockIcon } from '@sanity/icons';
import Link from 'next/link';

const POSTS_PER_PAGE = 6;

const categoryColors = {
  'Technology': 'bg-blue-500',
  'Design': 'bg-pink-500',
  'Business': 'bg-green-500',
  'Lifestyle': 'bg-yellow-500',
  'Health': 'bg-red-500',
  'Travel': 'bg-purple-500'
};

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await client.fetch(POSTS_QUERY);
      setPosts(fetchedPosts);
    }
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const loadMore = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className="max-w-7xl mx-auto">

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
             <Link href={`/blog/${post.slug.current}`} className="block h-full">
            <Card 
              className="w-full h-full bg-white dark:bg-muted shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            
            >
              <CardBody className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(800).height(450).fit('crop').auto('format').url()}
                    alt={post.title}
                    classNames={{
                      img: "object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories?.slice(0, 2).map((category) => (
                      <span key={category} className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[category] || 'bg-gray-500'} text-white`}>
                        {category}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </time>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      <span>{post.readingTime || '5 min read'}</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {currentPage < totalPages && (
        <div className="mt-12 flex justify-center">
          <Button
            auto
            className="bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            endContent={<ArrowRightIcon className="w-4 h-4" />}
            onPress={loadMore}
          >
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  );
}