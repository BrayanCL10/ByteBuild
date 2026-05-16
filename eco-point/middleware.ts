import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/imagenes/') && pathname.endsWith('.png')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.replace(/\.png$/, '.jpg')
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/imagenes/:path*'],
}
