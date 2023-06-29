import { verifyJwtToken } from "@/libs/auth";
import { NextResponse } from "next/server";

const AUTH_PAGE = ["/login", "/register"];

const isAuthPage = (url) => AUTH_PAGE.some((p) => p.startsWith(url));

export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPage(nextUrl.pathname);

  if (isAuthPageRequested) {
    console.log(hasVerifiedToken);
    if (!hasVerifiedToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", url));
    }
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);
    console.log(nextUrl.pathname);
    return NextResponse.redirect(new URL(`/login?${searchParams}`, url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/login", "/blog"] };
