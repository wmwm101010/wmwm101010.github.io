import { BlogPost, getAllPosts, getPostBySlug } from '@/lib/blog'
import React from 'react'

import PostContent from '../../../components/post/PostContent'
import PostHeader from '../../../components/post/PostHeader'
import PostTableOfContents from '../../../components/post/PostTableOfContents'
import NotFound from '../../not-found'

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post: BlogPost) => ({
    id: post.metadata.slug,
  }))
}

async function getBlogPostBySlug(id: string) {
  return await getPostBySlug(id)
}

export default async function Page({ params }: { params: { id: string } }) {
  let post: BlogPost

  try {
    post = await getBlogPostBySlug(params.id)
  } catch (error) {
    return <NotFound />
  }

  return (
    <>
      <PostHeader metadata={post.metadata} />
      {post.metadata.showTableOfContents && (
        <PostTableOfContents headings={post.headings} />
      )}
      <PostContent>{post.content}</PostContent>
    </>
  )
}
