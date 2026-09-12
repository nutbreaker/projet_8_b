/**
 * Stores and manages favorite IDs using localStorage.
 */
class FavoritesStorage {
  /**
   * Creates a favorites storage instance.
   *
   * @param {string} [storageName="kasa-favorites"] localStorage key
   */
  constructor(storageName = "kasa-favorites") {
    this.storageName = storageName;
  }

  /**
   * Adds an ID to the favorites.
   *
   * @param {string|number} id ID to add
   *
   * @returns {void}
   */
  addFavorite(id) {
    const favorites = this.getAll();

    if (favorites.includes(id)) return;

    this.save([...favorites, id]);
  }

  /**
   * Removes all favorites from localStorage.
   *
   * @returns {void}
   */
  clear() {
    try {
      localStorage.removeItem(this.storageName);
    } catch {
      // No op if the localStorage isn't available
    }
  }

  /**
   * Retrieves all favorite IDs.
   *
   * @returns {(string|number)[]} stored favorite IDs, or an empty array
   */
  getAll() {
    try {
      const favorites = localStorage.getItem(this.storageName);

      if (!favorites) return [];

      const parsedFavorites = JSON.parse(favorites);

      return Array.isArray(parsedFavorites) ? parsedFavorites : [];
    } catch {
      return [];
    }
  }

  /**
   * Checks whether an ID is in the favorites.
   *
   * @param {string|number} id ID to check
   *
   * @returns {boolean} whether the ID is a favorite
   */
  hasFavorite(id) {
    return this.getAll().includes(id);
  }

  /**
   * Removes an ID from the favorites.
   *
   * @param {string|number} id ID to remove
   *
   * @returns {void}
   */
  removeFavorite(id) {
    const favorites = this.getAll();

    this.save(favorites.filter((favoriteId) => favoriteId !== id));
  }

  /**
   * Saves favorite IDs to localStorage.
   *
   * @param {(string|number)[]} favorites favorite IDs to save
   *
   * @returns {void}
   */
  save(favorites) {
    try {
      localStorage.setItem(this.storageName, JSON.stringify(favorites));
    } catch {
      // No op if the localStorage isn't available
    }
  }

  /**
   * Adds or removes an ID from the favorites.
   *
   * @param {string|number} id ID to toggle
   *
   * @returns {boolean} whether the ID was added
   */
  toggleFavorite(id) {
    if (this.hasFavorite(id)) {
      this.removeFavorite(id);

      return false;
    }

    this.addFavorite(id);

    return true;
  }
}

export default FavoritesStorage;
