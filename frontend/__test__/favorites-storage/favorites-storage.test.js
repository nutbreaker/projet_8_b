import FavoritesStorage from "@/utils/favorites-storage";

describe("FavoritesStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with default storage name 'kasa-favorites'", () => {
      const storage = new FavoritesStorage();

      expect(storage.storageName).toBe("kasa-favorites");
    });

    it("should initialize with a custom storage name when provided", () => {
      const storage = new FavoritesStorage("custom-favorites");

      expect(storage.storageName).toBe("custom-favorites");
    });
  });

  describe("getAll", () => {
    it("should return an empty array when localStorage has no item", () => {
      const storage = new FavoritesStorage();

      expect(storage.getAll()).toEqual([]);
    });

    it("should return parsed array of favorites when valid JSON array is stored", () => {
      const storage = new FavoritesStorage();

      localStorage.setItem(
        "kasa-favorites",
        JSON.stringify(["fav-1", "fav-2"]),
      );

      expect(storage.getAll()).toEqual(["fav-1", "fav-2"]);
    });

    it("should return an empty array if stored data is not an array", () => {
      const storage = new FavoritesStorage();

      localStorage.setItem("kasa-favorites", JSON.stringify({ id: "fav-1" }));

      expect(storage.getAll()).toEqual([]);
    });

    it("should return an empty array if stored data is invalid JSON", () => {
      const storage = new FavoritesStorage();

      localStorage.setItem("kasa-favorites", "invalid-json");

      expect(storage.getAll()).toEqual([]);
    });

    it("should return an empty array if localStorage.getItem throws an error", () => {
      const storage = new FavoritesStorage();

      jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("Storage unavailable");
      });

      expect(storage.getAll()).toEqual([]);
    });
  });

  describe("save", () => {
    it("should serialize and save favorites array in localStorage", () => {
      const storage = new FavoritesStorage();

      storage.save(["id-1", "id-2"]);

      expect(localStorage.getItem("kasa-favorites")).toBe(
        JSON.stringify(["id-1", "id-2"]),
      );
    });

    it("should save under the custom storage name if configured", () => {
      const storage = new FavoritesStorage("my-custom-key");

      storage.save(["id-1"]);

      expect(localStorage.getItem("my-custom-key")).toBe(
        JSON.stringify(["id-1"]),
      );
    });

    it("should handle errors gracefully when localStorage.setItem throws", () => {
      const storage = new FavoritesStorage();

      jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Quota exceeded");
      });

      expect(() => storage.save(["id-1"])).not.toThrow();
    });
  });

  describe("addFavorite", () => {
    it("should add a new ID to favorites and persist it", () => {
      const storage = new FavoritesStorage();

      storage.addFavorite("id-1");

      expect(storage.getAll()).toEqual(["id-1"]);
      expect(localStorage.getItem("kasa-favorites")).toBe(
        JSON.stringify(["id-1"]),
      );
    });

    it("should append a new ID to existing favorites", () => {
      const storage = new FavoritesStorage();

      storage.save(["id-1"]);
      storage.addFavorite("id-2");

      expect(storage.getAll()).toEqual(["id-1", "id-2"]);
    });

    it("should not add duplicate IDs if the ID is already present", () => {
      const storage = new FavoritesStorage();

      storage.save(["id-1"]);
      storage.addFavorite("id-1");

      expect(storage.getAll()).toEqual(["id-1"]);
    });

    it("should support numeric IDs", () => {
      const storage = new FavoritesStorage();

      storage.addFavorite(42);

      expect(storage.getAll()).toEqual([42]);
    });
  });

  describe("hasFavorite", () => {
    it("should return true when the ID is in favorites", () => {
      const storage = new FavoritesStorage();

      storage.save(["id-1", "id-2"]);

      expect(storage.hasFavorite("id-1")).toBe(true);
    });

    it("should return false when the ID is not in favorites", () => {
      const storage = new FavoritesStorage();

      storage.save(["id-1"]);

      expect(storage.hasFavorite("id-999")).toBe(false);
    });

    it("should return false when favorites are empty", () => {
      const storage = new FavoritesStorage();

      expect(storage.hasFavorite("id-1")).toBe(false);
    });
  });

  describe("removeFavorite", () => {
    it("should remove the given ID from favorites and update localStorage", () => {
      const storage = new FavoritesStorage();

      storage.save(["id-1", "id-2", "id-3"]);
      storage.removeFavorite("id-2");

      expect(storage.getAll()).toEqual(["id-1", "id-3"]);
      expect(localStorage.getItem("kasa-favorites")).toBe(
        JSON.stringify(["id-1", "id-3"]),
      );
    });

    it("should do nothing if the ID to remove does not exist", () => {
      const storage = new FavoritesStorage();

      storage.save(["id-1", "id-2"]);
      storage.removeFavorite("non-existent");

      expect(storage.getAll()).toEqual(["id-1", "id-2"]);
    });
  });

  describe("clear", () => {
    it("should remove the favorites item from localStorage", () => {
      const storage = new FavoritesStorage();

      storage.save(["id-1", "id-2"]);
      storage.clear();

      expect(localStorage.getItem("kasa-favorites")).toBeNull();
      expect(storage.getAll()).toEqual([]);
    });

    it("should handle errors gracefully when localStorage.removeItem throws", () => {
      const storage = new FavoritesStorage();

      jest.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
        throw new Error("Clear failed");
      });

      expect(() => storage.clear()).not.toThrow();
    });
  });

  describe("toggleFavorite", () => {
    it("should add the ID and return true if it is not a favorite", () => {
      const storage = new FavoritesStorage();

      const result = storage.toggleFavorite("id-1");

      expect(result).toBe(true);
      expect(storage.getAll()).toEqual(["id-1"]);
    });

    it("should remove the ID and return false if it is already a favorite", () => {
      const storage = new FavoritesStorage();
      storage.save(["id-1", "id-2"]);

      const result = storage.toggleFavorite("id-1");

      expect(result).toBe(false);
      expect(storage.getAll()).toEqual(["id-2"]);
    });
  });
});
