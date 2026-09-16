import { cookies } from "next/headers";

const COOKIE_NAME = "kasa_redirect_to";

/**
 * Store pathname and query parameters in an HTTP only cookie.
 *
 * @param {import("next/dist/compiled/@edge-runtime/cookies").ResponseCookies} cookies response cookies object
 * @param {import("next/server").NextRequest} request Next.js request
 */
export function setRedirectCookieValue(cookies, request) {
  const path = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  cookies.set(COOKIE_NAME, `${path}${search}`, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 5,
  });
}

/**
 * Get the target redirection path from the cookie store.
 *
 * Validates that the path is a safe internal relative path.
 *
 * Deletes the cookie after reading.
 *
 * @param {string} [defaultValue="/"] fallback if no valid value is found
 *
 * @returns {Promise<string>} safe internal redirection path, default to "/"
 */
export async function getRedirectCookiValue(defaultValue = "/") {
  const cookieStore = await cookies();
  const redirectTo = cookieStore.get(COOKIE_NAME)?.value;
  const pathToRedirectTo =
    typeof redirectTo === "string" &&
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//")
      ? redirectTo
      : defaultValue;

  cookieStore.delete(COOKIE_NAME);

  return pathToRedirectTo;
}
