import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true) // Siempre en dark mode

  useEffect(() => {
    // Siempre aplicar dark mode
    document.documentElement.classList.add('dark')
  }, [])

  const toggleTheme = () => {
    // Función vacía para mantener compatibilidad, pero no hace nada
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}