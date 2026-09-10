import { apiClient } from "./api-client";

/**
 * @typedef {import("../types/property").Property} Property
 * @typedef {import("../types/property").HTTPError} HTTPError
 */

/**
 * List all the properties
 * 
 * @returns {Promise<Property[]|HTTPError>} the resolved promise or an error
 */
export async function getProperties() {
  return apiClient("/api/properties", {});
}
