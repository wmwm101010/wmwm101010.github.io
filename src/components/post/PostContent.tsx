import React from 'react'

import styles from './PostContent.module.scss'

function PostContent({ children }: { children: React.ReactNode }) {
  return <div className={styles['post-content']}>{children}</div>
}

export default PostContent
