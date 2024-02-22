import React from 'react'

import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <>
      <div className={styles['error-dialog']}>
        <span className={styles['error-code']}>404</span>
        <span className={styles['error-message']}>Page not found</span>
      </div>
    </>
  )
}
