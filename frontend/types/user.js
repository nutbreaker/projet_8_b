/**
 * Represents an authenticated or registered user.
 *
 * @typedef {Object} User
 *
 * @property {number|string} id user ID
 * @property {string} name user full name
 * @property {string} email user email address
 * @property {string|null} [picture] profile picture URL
 * @property {"client"|"owner"|string} role user role
 */

/**
 * Represents the response object returned by authentication endpoints.
 *
 * @typedef {Object} AuthResponse
 *
 * @property {string} token JWT session token
 * @property {User} user authenticated user details
 */

export {};
