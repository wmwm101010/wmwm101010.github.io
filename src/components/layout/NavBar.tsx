'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './NavBar.module.scss'

function NavBar() {
  const pathname = usePathname()
  const [theme, setTheme] = useState('light') // default theme

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  useEffect(() => {
    // Check for saved theme in localStorage and set it
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.body.className = savedTheme
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.body.className = newTheme
    localStorage.setItem('theme', newTheme)
  }

  return (
    <nav className={styles.navbar}>
      <Link href='/' className={styles['navbar-logo']}>
        <Image width='10' height='10' alt='favicon' src='/favicon.svg' />
        <span>WM</span>
      </Link>
      <Link
        href='/blog'
        className={
          styles['navbar-link'] + ' ' + (isActive('/blog') ? styles.active : '')
        }
      >
        Blog
      </Link>
      <Link
        href='/projects'
        className={
          styles['navbar-link'] +
          ' ' +
          (isActive('/projects') ? styles.active : '')
        }
      >
        Projects
      </Link>
      <button onClick={toggleTheme} className={styles['theme-toggle']}>
        <Image
          width='10'
          height='10'
          alt='toggle theme'
          src={theme === 'light' ? '/moon.svg' : '/sun.svg'}
        />
      </button>
    </nav>
  )
}

export default NavBar
