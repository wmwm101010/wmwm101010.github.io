import type { Metadata } from 'next'

import Footer from '../components/layout/Footer'
import NavBar from '../components/layout/NavBar'
import '../styles/globals.scss'
import styles from './layout.module.scss'

export const metadata: Metadata = {
  title: 'WM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body className='light'>
        <header className={styles.header}>
          <NavBar />
        </header>
        <main className={styles.container}>{children}</main>
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
