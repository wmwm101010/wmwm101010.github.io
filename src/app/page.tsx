import { getAllPosts as getAllBlogPosts } from '@/lib/blog'
import { getAllPosts as getAllProjectPosts } from '@/lib/projects'

import BlogPosts from '../components/lists/BlogPosts'
import ProjectPosts from '../components/lists/ProjectPosts'
import '../styles/highlight-js/github-dark-dimmed.css'
import styles from './page.module.scss'

async function getBlogPosts() {
  return await getAllBlogPosts()
}
async function getProjectPosts() {
  return await getAllProjectPosts()
}
export default async function Home() {
  const blogs = await getBlogPosts()
  const projects = await getProjectPosts()

  return (
    <>
      <div className={styles['main-banner']}>
        <h1>Hi !</h1>
        <p>I enjoy software development and figuring out how things work</p>
      </div>
      <div className={styles.banner}>
        <h2>Projects</h2>
        <ProjectPosts projects={projects} numPerPage={5} pagination={false} />
      </div>
      <div className={styles.banner}>
        <h2>Blog</h2>
        <BlogPosts blogs={blogs} numPerPage={5} pagination={false} />
      </div>
    </>
  )
}
