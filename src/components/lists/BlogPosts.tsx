'use client'

import { BlogPost } from '@/lib/blog'
import Link from 'next/link'
import React, { useState } from 'react'

import styles from './BlogPosts.module.scss'
import Paginator from './Paginator'

function LatestBlogPosts(props: {
  blogs: BlogPost[]
  numPerPage: number
  pagination: boolean
}) {
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBlogs: BlogPost[] = props.blogs.slice(
    (currentPage - 1) * props.numPerPage,
    props.numPerPage * currentPage,
  )

  const maxPage = Math.max(1, Math.ceil(props.blogs.length / props.numPerPage))

  const onNextPage = () => setCurrentPage(page => Math.min(page + 1, maxPage))
  const onPrevPage = () => setCurrentPage(page => Math.max(page - 1, 1))

  return (
    <>
      <div className={styles['blog-posts']}>
        {props.blogs.length === 0 && (
          <div>
            <p>🚧 Work in progress 🚧</p>
          </div>
        )}
        {filteredBlogs.map(post => (
          <div key={post.metadata.slug} className={styles['blog-post']}>
            <Link href={`blog/${post.metadata.slug}`}>
              <span>{post.metadata.title}</span>
              <span>{post.metadata.date.toLocaleDateString()}</span>
            </Link>
          </div>
        ))}
      </div>

      {props.pagination && (
        <Paginator
          totalPages={maxPage}
          currentPage={currentPage}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
      )}
    </>
  )
}

export default LatestBlogPosts
