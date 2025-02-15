// cognitium/src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Skip middleware execution for the auth callback route
export function shouldRunMiddleware(pathname: string): boolean {
  return !pathname.startsWith('/auth/callback')
}

export async function middleware(request: NextRequest) {
  // Skip middleware for auth callback routes
  if (shouldRunMiddleware(request.nextUrl.pathname) === false) {
    return NextResponse.next()
  }

  try {
    // Create response and supabase client
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })

    // Refresh the session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Handle auth state and redirections
    const isAuthPage = request.nextUrl.pathname === '/'
    const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard')

    if (session) {
      // If logged in and on auth page, redirect to dashboard
      if (isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } else {
      // If not logged in and trying to access protected route, redirect to login
      if (isDashboardPage) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    return res
  } catch (e) {
    // If there's an error, redirect to login page
    console.error('Middleware error:', e)
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/', '/dashboard', '/auth/callback']
}
