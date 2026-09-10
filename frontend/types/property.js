/**
 * Options used to make an HTTP request.
 *
 * @typedef {Object} Options
 * @property {Object} [headers] HTTP request headers
 * @property {"GET"|"POST"|"PUT"|"DELETE"} method HTTP method to use
 * @property {string} [body] request body
 * @property {string} token authentication token
 */

/**
 * Represent the error object when an HTTP request fails.
 * 
 * @typedef {Object} HTTPError
 * @property {string} message the error message
 */

/**
 * Represents a host associated with a property.
 *
 * @typedef {Object} PropertyHost
 * @property {number|string} id host identifier
 * @property {string} name host name
 * @property {string} [picture] URL of the host's profile picture
 */

/**
 * Represents a property.
 *
 * @typedef {Object} Property
 * @property {number|string} id property identifier
 * @property {string} slug slug used in the URL
 * @property {string} title property title
 * @property {string} description property description
 * @property {string} cover URL of the property's cover image
 * @property {string} location property location
 * @property {number} price_per_night price per night
 * @property {number} rating_avg average property rating
 * @property {number} ratings_count total number of ratings
 * @property {PropertyHost} [host] host information, if available
 */

export {};

