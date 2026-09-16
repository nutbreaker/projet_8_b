/**
 * Extract the json object from a JWT token.
 *
 * @param token the token to decode
 *
 * @returns the json object extracted from the token
 */
export default function decodeJWT(token = "") {
  // JWT header.payload.signature
  const parts = token.split(".");

  if (parts.length !== 3) {
    return;
  }

  const [, payload] = parts;
  const decoded = atob(payload);
  const json = JSON.parse(decoded);

  return json;
}
