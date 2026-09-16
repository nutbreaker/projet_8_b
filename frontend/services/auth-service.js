import { apiClient } from "./api-client";

/**
 * @typedef {import("../types/property").HTTPError} HTTPError
 * @typedef {import("../types/user").User} User
 * @typedef {import("../types/user").AuthResponse} AuthResponse
 */

/**
 * Authenticates a user with their email and password.
 *
 * @param {string} email email address
 * @param {string} password password
 *
 * @returns {Promise<AuthResponse|HTTPError>} resolved with token and user, or error
 */
export async function login(email, password) {
  return apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Registers a new user.
 *
 * @param {string} name last name
 * @param {string} firstName first name
 * @param {string} email email address
 * @param {string} password password
 *
 * @returns {Promise<AuthResponse|HTTPError>} resolved with token and user, or error
 */
export async function register(name, firstName, email, password) {
  return apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: `${name} ${firstName}`.trim(),
      email,
      password,
    }),
  });
}
