import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PropertyCard from "@/components/property-card/property-card";
import { FavoritesProvider } from "@/context/favorites-context";

const mockProperty = {
  id: "prop-123",
  slug: "cosy-flat-paris",
  title: "Cosy Flat in Paris",
  description: "A very nice flat in the center of Paris",
  cover: "/images/cover.jpg",
  location: "Paris, Ile-de-France",
  price_per_night: 95,
};

const renderWithFavorites = (ui) => {
  return render(<FavoritesProvider>{ui}</FavoritesProvider>);
};

describe("PropertyCard", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  describe("render", () => {
    it("should render a link to the property detail page", () => {
      renderWithFavorites(<PropertyCard property={mockProperty} />);

      const link = screen.getByRole("link");

      expect(link).toHaveAttribute(
        "href",
        `/logement/${mockProperty.id}/${mockProperty.slug}`,
      );
    });

    it("should display property title, location, and price per night", () => {
      renderWithFavorites(<PropertyCard property={mockProperty} />);

      const heading = screen.getByRole("heading", { level: 3 });

      expect(heading).toHaveTextContent(mockProperty.title);
      expect(screen.getByText(mockProperty.location)).toBeInTheDocument();
      expect(
        screen.getByText(`${mockProperty.price_per_night}€`),
      ).toBeInTheDocument();
      expect(screen.getByText(/par nuit/i)).toBeInTheDocument();
    });

    it("should display the cover image with appropriate alt text", () => {
      renderWithFavorites(<PropertyCard property={mockProperty} />);

      const image = screen.getByRole("img", {
        name: `Photo de couverture ${mockProperty.title}`,
      });

      expect(image).toBeInTheDocument();
    });

    it("should render the favorite button with proper aria-label", () => {
      renderWithFavorites(<PropertyCard property={mockProperty} />);

      const button = screen.getByRole("button", {
        name: `Ajouter ${mockProperty.title} aux favoris`,
      });

      expect(button).toBeInTheDocument();
    });
  });

  describe("favorite state", () => {
    it("should initialize favorite button without selected class when property is not favorited", () => {
      renderWithFavorites(<PropertyCard property={mockProperty} />);

      const button = screen.getByRole("button", {
        name: `Ajouter ${mockProperty.title} aux favoris`,
      });

      expect(button).not.toHaveClass("favorite-button--selected");
    });

    it("should initialize favorite button with selected class when property is already in favorites", () => {
      localStorage.setItem("kasa-favorites", JSON.stringify([mockProperty.id]));

      renderWithFavorites(<PropertyCard property={mockProperty} />);

      const button = screen.getByRole("button", {
        name: `Supprimer ${mockProperty.title} des favoris`,
      });

      expect(button).toHaveClass("favorite-button--selected");
    });
  });

  describe("onClick", () => {
    it("should toggle property to favorite when clicked and update button style", () => {
      renderWithFavorites(<PropertyCard property={mockProperty} />);

      const button = screen.getByRole("button", {
        name: `Ajouter ${mockProperty.title} aux favoris`,
      });

      expect(button).not.toHaveClass("favorite-button--selected");

      fireEvent.click(button);

      expect(button).toHaveClass("favorite-button--selected");
      expect(localStorage.getItem("kasa-favorites")).toBe(
        JSON.stringify([mockProperty.id]),
      );
    });

    it("should remove property from favorites when clicked again", () => {
      localStorage.setItem("kasa-favorites", JSON.stringify([mockProperty.id]));

      renderWithFavorites(<PropertyCard property={mockProperty} />);

      const button = screen.getByRole("button", {
        name: `Supprimer ${mockProperty.title} des favoris`,
      });

      expect(button).toHaveClass("favorite-button--selected");

      fireEvent.click(button);

      expect(button).not.toHaveClass("favorite-button--selected");
      expect(localStorage.getItem("kasa-favorites")).toBe(JSON.stringify([]));
    });

    it("should call onFavoriteChange callback when provided", () => {
      const onFavoriteChangeMock = jest.fn();

      renderWithFavorites(
        <PropertyCard
          property={mockProperty}
          onFavoriteChange={onFavoriteChangeMock}
        />,
      );

      const button = screen.getByRole("button", {
        name: `Ajouter ${mockProperty.title} aux favoris`,
      });

      fireEvent.click(button);

      expect(onFavoriteChangeMock).toHaveBeenCalledWith(mockProperty.id, true);
    });

    it("should trigger document.startViewTransition when available and onFavoriteChange is provided", () => {
      const onFavoriteChangeMock = jest.fn();
      const startViewTransitionMock = jest.fn((cb) => cb());
      document.startViewTransition = startViewTransitionMock;

      renderWithFavorites(
        <PropertyCard
          property={mockProperty}
          onFavoriteChange={onFavoriteChangeMock}
        />,
      );

      const button = screen.getByRole("button", {
        name: `Ajouter ${mockProperty.title} aux favoris`,
      });

      fireEvent.click(button);

      expect(startViewTransitionMock).toHaveBeenCalledTimes(1);
      expect(onFavoriteChangeMock).toHaveBeenCalledWith(mockProperty.id, true);

      delete document.startViewTransition;
    });
  });
});
