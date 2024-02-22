import React from 'react'

import styles from './Paginator.module.scss'

function Paginator(props: {
  currentPage: number
  totalPages: number
  onNextPage: () => void
  onPrevPage: () => void
}) {
  const isBackDisabled = props.currentPage == 1
  const isNextDisabled = props.currentPage == props.totalPages
  return (
    <div className={styles.paginator}>
      <button disabled={isBackDisabled} onClick={() => props.onPrevPage()}>
        prev
      </button>
      <span>
        {props.currentPage}/{props.totalPages}
      </span>
      <button disabled={isNextDisabled} onClick={() => props.onNextPage()}>
        next
      </button>
    </div>
  )
}

export default Paginator
