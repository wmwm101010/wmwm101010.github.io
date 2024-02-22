import fs from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import React from 'react'
import rehypeHighlight from 'rehype-highlight'

import components from './components'
import { Heading, extractHeadings } from './headings'

export type ProjectPost = {
  metadata: {
    slug: string
    title: string
    description: string
    date: Date
  }
  headings: Heading[]
  content: React.ReactElement
}

const rootDirectory = path.join(process.cwd(), 'content', 'projects')

export const getPostBySlug = async (slug: string): Promise<ProjectPost> => {
  const realSlug = slug.replace('.mdx', '')
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error('No such file')
  }

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

  const { frontmatter, content } = await compileMDX({
    components,
    source: fileContent,
    options: {
      parseFrontmatter: true,
      //@ts-expect-error note sure
      mdxOptions: { rehypePlugins: [rehypeHighlight] },
    },
  })

  const metadata = {
    slug: realSlug,
    title: frontmatter.title as string,
    description: frontmatter.description as string,
    date: new Date(String(frontmatter.date)) as Date,
  }
  return { metadata, content, headings: extractHeadings(filePath) }
}

export const getAllPosts = async (): Promise<ProjectPost[]> => {
  const files = fs.readdirSync(rootDirectory)
  const posts: ProjectPost[] = []
  for (const file of files) {
    posts.push(await getPostBySlug(file))
  }
  return posts
}
