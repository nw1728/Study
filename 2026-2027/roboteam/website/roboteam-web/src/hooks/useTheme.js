import { useState } from 'react'

// Returns [theme, toggleTheme]. The starting theme is set in index.html before React loads.
export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage blocked (private mode): the theme still switches, it just isn't remembered
    }
    setTheme(next)
  }

  return [theme, toggleTheme]
}
