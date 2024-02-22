'use client'

import Link from 'next/link'
import React from 'react'

import { Heading } from '../../lib/headings'
import style from './PostTableOfContents.module.scss'

function PostTableOfContents({ headings }: { headings: Heading[] }) {
  return (
    <div className={style['table-of-contents']}>
      {headings.map(heading => (
        <TableOfContentItem heading={heading} key={heading.slug} />
      ))}
    </div>
  )
}

function TableOfContentItem({ heading }: { heading: Heading }) {
  return (
    <Link
      style={{ marginLeft: `${heading.level - 1}rem` }}
      href={`#${heading.slug}`}
    >
      {heading.title}
    </Link>
  )
}

export default PostTableOfContents
