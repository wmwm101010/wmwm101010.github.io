import { HTMLAttributes } from 'react'

import CodeBlock from '../components/post/CodeBlock'
import { headingComponentMapping } from './headings'

const components = {
  pre: ({ children, ...props }: HTMLAttributes<HTMLPreElement>) => {
    return <CodeBlock {...props}>{children}</CodeBlock>
  },

  ...headingComponentMapping,
}

export default components
