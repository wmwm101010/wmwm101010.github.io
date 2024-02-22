import BlogPosts from '@/components/lists/BlogPosts'
import { getAllPosts as getAllBlogPosts } from '@/lib/blog'
import React from 'react'

import styles from './page.module.scss'

async function getBlogPosts() {
  return await getAllBlogPosts()
}

export default async function BlogPage() {
  const blogs = await getBlogPosts()

  return (
    <>
      <h1 className={styles.banner}>Blog</h1>
      <div>
        <BlogPosts blogs={blogs} pagination={true} numPerPage={4} />
      </div>
    </>
  )
}
