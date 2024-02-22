import { ProjectPost, getAllPosts, getPostBySlug } from '@/lib/projects'
import React from 'react'

import PostContent from '../../../components/post/PostContent'
import PostHeader from '../../../components/post/PostHeader'
import PostTableOfContents from '../../../components/post/PostTableOfContents'
import NotFound from '../../not-found'
import styles from './page.module.scss'

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post: ProjectPost) => ({
    id: post.metadata.slug,
  }))
}

async function getBlogPostBySlug(id: string) {
  return await getPostBySlug(id)
}

async function page({ params }: { params: { id: string } }) {
  let post: ProjectPost
  try {
    post = await getBlogPostBySlug(params.id)
  } catch (error) {
    return <NotFound />
  }
  return (
    <div className={styles['post']}>
      <PostHeader metadata={post.metadata} />
      <PostTableOfContents headings={post.headings} />
      <PostContent>{post.content}</PostContent>
    </div>
  )
}

export default page
