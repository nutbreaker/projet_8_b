"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "session_token";
const ONE_WEEK = 60 * 60 * 24 * 7;

/**
 * Set the session token in a HTTP only cookie.
 *
 * @param {string} token
 */
export async function setSessionCookie(token) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_WEEK,
    path: "/",
    sameSite: "lax",
  });
}

/**
 * Delete the session cookie.
 */
export async function deleteSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get the session token from the cookie.
 *
 * @returns {string|undefined} the JWT token
 */
export async function getSessionToken() {
  const cookieStore = await cookies();

  return cookieStore.get(COOKIE_NAME)?.value;
}
