import ProjectPosts from '@/components/lists/ProjectPosts'
import { getAllPosts as getAllProjectPosts } from '@/lib/projects'
import React from 'react'

import styles from './page.module.scss'

async function getProjectPosts() {
  return await getAllProjectPosts()
}

const Page = async () => {
  const posts = await getProjectPosts()
  return (
    <>
      <h1 className={styles.banner}>Projects</h1>
      <ProjectPosts
        projects={posts}
        pagination={true}
        numPerPage={6}
        fullWidth={true}
      />
    </>
  )
}

export default Page
