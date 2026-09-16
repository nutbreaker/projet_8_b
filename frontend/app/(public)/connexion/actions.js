"use server";

import { redirect } from "next/navigation";
import { login } from "@/services/auth-service";
import { setSessionCookie } from "@/services/session";
import { getRedirectCookiValue } from "@/utils/redirect-to";

/**
 * @typedef {Object} SignInState
 * @property {string} [error] error message if authentication fails
 * @property {string} [email] submitted email address to restore
 */

/**
 * Backend error messages translations.
 *
 * @see https://github.com/OpenClassrooms-Student-Center/dev-react-P12/blob/ae91fa4bc2acb304fb26760e28f1e033b46a52a3/services/authService.js#L52-L55
 */
const errorMessagesTranslation = {
  "email and password are required": "L'e-mail et mot de passe requis",
  "invalid credentials": "Identifiants non valides",
};

/**
 * Server action to authenticate a user and create a session cookie.
 *
 * @param {SignInState} _initialState previous state provided by useActionState
 * @param {FormData} formData submitted form data containing email and password
 *
 * @returns {Promise<SignInState|never>} error state on failure, or redirects to home page on success
 */
export async function signIn(_initialState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await login(email, password);
  const { error } = response;

  if (response.error) {
    return {
      ...response,
      error: errorMessagesTranslation[error] || error,
      email,
    };
  }

  await setSessionCookie(response?.token);

  const redirectTo = await getRedirectCookiValue();

  redirect(redirectTo);
}
