"use server";

import { redirect } from "next/navigation";
import { register } from "@/services/auth-service";
import { setSessionCookie } from "@/services/session";

/**
 * Backend error messages translations.
 *
 * @see https://github.com/OpenClassrooms-Student-Center/dev-react-P12/blob/ae91fa4bc2acb304fb26760e28f1e033b46a52a3/services/authService.js#L30-L46
 */
const errorMessagesTranslation = {
  "name is required": "Le nom est requis",
  "email is required": "L'e-mail est requis",
  "password must be at least 6 characters":
    "Le mot de passe doit contenir au moins 6 caractères",
  "email already registered": "Adresse e-mail déjà enregistrée",
};

export async function signUp(_initialState, formData) {
  const name = formData.get("name");
  const firstName = formData.get("first_name");
  const email = formData.get("email");
  const password = formData.get("password");
  const cgu = formData.get("cgu") === "1";

  const response = await register(name, firstName, email, password);
  const { error } = response;

  if (response.error) {
    return {
      ...response,
      error: errorMessagesTranslation[error] || error,
      name,
      firstName,
      email,
      cgu,
    };
  }

  await setSessionCookie(response?.token);

  redirect("/");
}
