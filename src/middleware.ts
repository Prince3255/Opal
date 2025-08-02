import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const allowedOrigin = ['http://localhost:5173', 'http://localhost:3000']

const corsOption = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/api/payment',
    '/payment(.*)'
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const origin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigin.includes(origin)

  if (req.method === 'OPTIONS') {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOption
    }
    return NextResponse.json({}, { headers: preflightHeaders})
  }

    if (isProtectedRoute(req)) {
        auth().protect()
    }

    const response = NextResponse.next()

    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }

    Object.entries(corsOption).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // '/((?!auth/sign-in).*)'
  ],
};