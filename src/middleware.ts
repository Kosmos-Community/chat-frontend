import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const username = request.cookies.get("username");

  if (username) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return;
}

export const config = {
  matcher: "/:path*",
};
