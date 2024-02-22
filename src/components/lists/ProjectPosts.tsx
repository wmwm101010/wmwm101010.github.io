'use client'

import { ProjectPost } from '@/lib/projects'
import Link from 'next/link'
import React, { useState } from 'react'

import Paginator from './Paginator'
import styles from './ProjectPosts.module.scss'

function ProjectPosts({
  projects,
  numPerPage,
  pagination,
  fullWidth = false,
}: {
  projects: ProjectPost[]
  numPerPage: number
  pagination: boolean
  fullWidth?: boolean
}) {
  projects = projects.sort(
    (a, b) => b.metadata.date.getTime() - a.metadata.date.getTime(),
  )

  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts: ProjectPost[] = projects.slice(
    (currentPage - 1) * numPerPage,
    numPerPage * currentPage,
  )

  const maxPage = Math.max(1, Math.ceil(projects.length / numPerPage))

  const onNextPage = () => setCurrentPage(page => Math.min(page + 1, maxPage))
  const onPrevPage = () => setCurrentPage(page => Math.max(page - 1, 1))
  return (
    <div
      className={`${styles['project-posts']} ${fullWidth ? styles['project-posts-full-width'] : null}`}
    >
      {filteredPosts.length === 0 && (
        <div className={styles['no-posts-message']}>
          <p>🚧 Work in progress 🚧</p>
        </div>
      )}
      {filteredPosts.map(post => (
        <div key={post.metadata.slug} className={styles['project-post']}>
          <Link href={`projects/${post.metadata.slug}`}>
            <h3>{post.metadata.title}</h3>
            <p>{post.metadata.description}</p>
          </Link>
        </div>
      ))}

      {pagination && (
        <Paginator
          totalPages={maxPage}
          currentPage={currentPage}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
      )}
    </div>
  )
}

export default ProjectPosts
