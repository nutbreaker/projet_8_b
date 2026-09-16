import { NextResponse } from "next/server";
import { getSessionToken } from "./services/session";
import decodeJWT from "./utils/jwt-decoder";

// https://nextjs.org/docs/pages/guides/authentication#optimistic-checks-with-proxy-optional

const privateRoutes = ["/ajouter-un-logement", "/messagerie"];

export default async function proxy(req) {
  const path = req.nextUrl.pathname;

  const isRoutePrivate = privateRoutes.includes(path);
  const cookie = await getSessionToken();
  const userInfo = await decodeJWT(cookie);

  if (isRoutePrivate && !userInfo?.id) {
    return NextResponse.redirect(new URL("/connexion", req.nextUrl));
  }

  // if (userInfo?.id  && (isRoutePrivate || path === '/')) {
  //     return NextResponse.redirect(new URL('/', req.nextUrl))
  // }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\.png$).*)",
  ],
};
