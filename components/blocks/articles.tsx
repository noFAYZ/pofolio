"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { client } from '@/sanity/lib/client';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { SanityImageAsset } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: SanityImageAsset;
  };
  excerpt?: string;
}

interface ArticlesProps {
  limit?: number;
}

export default function Articles({ limit }: ArticlesProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [active, setActive] = useState<Post | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await client.fetch<Post[]>(POSTS_QUERY);
      setPosts(limit ? fetchedPosts.slice(0, limit) : fetchedPosts);
    }
    fetchPosts();
  }, [limit]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-800 bg-opacity-75 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-gray-800 sm:rounded-3xl overflow-hidden shadow-lg"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                {active.mainImage?.asset && (
                  <Image
                    priority
                    width={500}
                    height={300}
                    src={urlFor(active.mainImage).width(1000).height(400).fit('max').auto('format').url()}
                    alt={active.title}
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                )}
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-gray-800 dark:text-gray-200"
                    >
                      {active.title}
                    </motion.h3>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={`/blog/${active.slug.current}`}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-primary text-white hover:bg-background/90 transition-colors"
                  >
                    Read More
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-600 dark:text-gray-300 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {active.excerpt}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="max-w-full mx-auto w-full gap-4">
        {posts.map((post) => (
          <motion.div
            layoutId={`card-${post.title}-${id}`}
            key={`card-${post.title}-${id}`}
            onClick={() => setActive(post)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer transition-colors "
          >
            <div className="flex gap-4 flex-col md:flex-row items-center">
              <motion.div layoutId={`image-${post.title}-${id}`}>
                {post.mainImage?.asset && (
                  <Image
                    width={100}
                    height={100}
                    src={urlFor(post.mainImage).width(1000).height(400).fit('max').auto('format').url()}
                    alt={post.title}
                    className=" h-40 w-full  md:h-16 md:w-16 rounded-lg object-cover object-top"
                  />
                )}
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${post.title}-${id}`}
                  className="font-medium text-gray-800 dark:text-gray-200 text-center md:text-left"
                >
                  {post.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${post.excerpt}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {shortenExcerpt(post.excerpt || "")}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${post.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-200 hover:bg-background/90 hover:text-white text-gray-800 mt-4 md:mt-0 transition-colors"
            >
              Read More
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

const CloseIcon: React.FC = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
const shortenExcerpt = (excerpt: string): string => {
  if (!excerpt) return "";
  
  if (excerpt.length <= 60) return excerpt;

  let shortened = excerpt.slice(0, 60);

  const lastSentenceEnd = Math.max(
    shortened.lastIndexOf('.'),
    shortened.lastIndexOf('!'),
    shortened.lastIndexOf('?')
  );

  if (lastSentenceEnd > 0) {
    shortened = shortened.slice(0, lastSentenceEnd + 1);
  } else {
    shortened = shortened.trim() + '...';
  }

  return shortened;
};