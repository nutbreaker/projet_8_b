import "@testing-library/jest-dom";
import { act, render, renderHook, screen } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "@/context/favorites-context";

describe("FavoritesContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  describe("useFavorites", () => {
    it("should throw an error when outside of a FavoritesProvider", () => {
      expect(() => {
        // https://testing-library.com/docs/react-testing-library/api/#renderhook-options-initialprops
        renderHook(() => useFavorites());
      }).toThrow("useFavorites must be used within a FavoritesProvider");
    });
  });

  describe("FavoritesProvider", () => {
    it("should render its children", () => {
      render(
        <FavoritesProvider>
          <div>A Child</div>
        </FavoritesProvider>,
      );

      expect(screen.getByText("A Child")).toBeInTheDocument();
    });

    it("should initialize with an empty list when localStorage is empty", () => {
      const { result } = renderHook(() => useFavorites(), {
        // https://testing-library.com/docs/react-testing-library/api/#wrapper
        wrapper: FavoritesProvider,
      });

      expect(result.current.favorites).toEqual([]);
      expect(result.current.isLoaded).toBe(true);
    });

    it("should load existing favorites from localStorage on mount", () => {
      localStorage.setItem(
        "kasa-favorites",
        JSON.stringify(["prop-69", "prop-420"]),
      );

      const { result } = renderHook(() => useFavorites(), {
        wrapper: FavoritesProvider,
      });

      expect(result.current.favorites).toEqual(["prop-69", "prop-420"]);
      expect(result.current.isLoaded).toBe(true);
    });

    it("should return true if favorite ID exist", () => {
      localStorage.setItem("kasa-favorites", JSON.stringify(["prop-69"]));

      const { result } = renderHook(() => useFavorites(), {
        wrapper: FavoritesProvider,
      });

      expect(result.current.hasFavorite("prop-69")).toBe(true);
      expect(result.current.hasFavorite("prop-420")).toBe(false);
    });

    it("should add ID to favorites and update localStorage when toggleFavorite is called", () => {
      const { result } = renderHook(() => useFavorites(), {
        wrapper: FavoritesProvider,
      });

      expect(result.current.hasFavorite("prop-69")).toBe(false);

      let isAdded;

      // https://testing-library.com/docs/react-testing-library/api#act
      act(() => {
        isAdded = result.current.toggleFavorite("prop-69");
      });

      expect(isAdded).toBe(true);
      expect(result.current.favorites).toEqual(["prop-69"]);
      expect(result.current.hasFavorite("prop-69")).toBe(true);
      expect(localStorage.getItem("kasa-favorites")).toBe(
        JSON.stringify(["prop-69"]),
      );
    });

    it("should remove ID from favorites when toggling an existing favorite", () => {
      localStorage.setItem(
        "kasa-favorites",
        JSON.stringify(["prop-69", "prop-420"]),
      );

      const { result } = renderHook(() => useFavorites(), {
        wrapper: FavoritesProvider,
      });

      let isAdded;
      act(() => {
        isAdded = result.current.toggleFavorite("prop-69");
      });

      expect(isAdded).toBe(false);
      expect(result.current.favorites).toEqual(["prop-420"]);
      expect(result.current.hasFavorite("prop-69")).toBe(false);
      expect(localStorage.getItem("kasa-favorites")).toBe(
        JSON.stringify(["prop-420"]),
      );
    });
  });
});
