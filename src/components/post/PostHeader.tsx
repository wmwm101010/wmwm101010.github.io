import React from 'react'

import style from './PostHeader.module.scss'

function PostHeader({
  metadata,
}: {
  metadata: {
    slug: string
    title: string
    description: string
    date: Date
  }
}) {
  return (
    <div className={style['post-header']}>
      <h1>{metadata.title}</h1>
      <p>{metadata.description}</p>
    </div>
  )
}

export default PostHeader
