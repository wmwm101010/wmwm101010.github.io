import fs from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import rehypeHighlight from 'rehype-highlight'

import NavBar from '../components/layout/NavBar'
import components from './components'
import { Heading, extractHeadings } from './headings'

export type BlogPost = {
  metadata: {
    slug: string
    title: string
    description: string
    date: Date
    showTableOfContents: boolean
  }
  headings: Heading[]
  content: React.ReactElement
}

const rootDirectory = path.join(process.cwd(), 'content', 'blogposts')

export const getPostBySlug = async (slug: string): Promise<BlogPost> => {
  const realSlug = slug.replace('.mdx', '')
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error('No such file')
  }

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

  const { frontmatter, content } = await compileMDX({
    components: { ...components, NavBar },
    source: fileContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        //@ts-expect-error note sure
        rehypePlugins: [rehypeHighlight],
      },
    },
  })

  const metadata = {
    description: frontmatter.description as string,
    slug: realSlug,
    title: frontmatter.title as string,
    date: new Date(String(frontmatter.date)) as Date,
    showTableOfContents: (frontmatter.showTableOfContents ?? true) as boolean,
  }
  return { metadata, content, headings: extractHeadings(filePath) }
}

export const getAllPosts = async (): Promise<BlogPost[]> => {
  const files = fs.readdirSync(rootDirectory)
  const posts: BlogPost[] = []
  for (const file of files) {
    posts.push(await getPostBySlug(file))
  }
  return posts
}
