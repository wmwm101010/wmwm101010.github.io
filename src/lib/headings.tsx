import fs from 'fs'
import React, { HTMLAttributes } from 'react'

export interface Heading {
  slug: string
  title: string
  level: number
}

export function extractHeadings(filePath: string): Array<Heading> {
  const content = fs.readFileSync(filePath, 'utf-8')
  const headings: Array<Heading> = []

  // match the `#` syntax for headings
  const headingMatcher = /^(#+)\s(.+)$/gm

  let match = headingMatcher.exec(content)
  while (match !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const slug = generateHeadingSlug(title)
    headings.push({ slug, title, level })
    match = headingMatcher.exec(content)
  }

  return headings
}

function generateHeadingSlug(heading: string) {
  return heading
    ?.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export const headingComponentMapping = {
  h1: ({ children }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 id={generateHeadingSlug(children as string)}>{children} </h1>
  ),
  h2: ({ children }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={generateHeadingSlug(children as string)}>{children} </h2>
  ),
  h3: ({ children }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={generateHeadingSlug(children as string)}>{children} </h3>
  ),
  h4: ({ children }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 id={generateHeadingSlug(children as string)}>{children} </h4>
  ),
  h5: ({ children }: HTMLAttributes<HTMLHeadingElement>) => (
    <h5 id={generateHeadingSlug(children as string)}>{children} </h5>
  ),
  h6: ({ children }: HTMLAttributes<HTMLHeadingElement>) => (
    <h6 id={generateHeadingSlug(children as string)}>{children} </h6>
  ),
}
