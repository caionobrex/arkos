import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      authorize: async (credentials, _req) => {
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })
        const user = await res.json()

        if (res.ok && user) return user

        return null
      }
    })
  ],
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      user && (token.id = user._id)
      return token
    },
    session: async (session, token) => {
      session.user.id = token.id
      return session
    }
  }
})