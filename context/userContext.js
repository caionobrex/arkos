import { createContext, useContext, useEffect, useState } from 'react'
import { useSession, signOut as logOut } from 'next-auth/client'

const userContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signIn = (user) => setUser(user)

  const signOut = () => {
    logOut({ callbackUrl: process.env.NEXTAUTH_URL })
    setUser(null)
  }

  useEffect(() => {
    fetch('/api/users/me')
    .then(res => res.json())
    .then(user => {
      if (user.email) setUser(user)
      setLoading(false)
    })
  }, [])

  return (
    <userContext.Provider value={{ user, setUser, signIn, signOut, loading }}>
      {children}
    </userContext.Provider>
  )
}

export function useUser() { return useContext(userContext) }