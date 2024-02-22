import React from 'react'

import styles from './CodeBlock.module.scss'

export default function CodeBlock(props: { children: React.ReactNode }) {
  return (
    <div className={styles['code-block']}>
      <pre>{props.children}</pre>
    </div>
  )
}
