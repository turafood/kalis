'use client'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import SessionContext from './SessionContext'

const AuthProvider = (props) => {
    const { session, children } = props

    return (
        /** since the next auth useSession hook was triggering mutliple re-renders, hence we are using the our custom session provider and we still included the next auth session provider, incase we need to use any client hooks from next auth */
        <NextAuthSessionProvider session={session} refetchOnWindowFocus={false}>
            <SessionContext.Provider value={session}>
                {children}
            </SessionContext.Provider>
        </NextAuthSessionProvider>
    )
}

export default AuthProvider
