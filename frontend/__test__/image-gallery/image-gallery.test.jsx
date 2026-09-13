import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ImageGalleryDialog from "@/components/image-gallery/image-gallery";

const mockImages = [
  "https://kasa.com/photo-35.jpg",
  "https://kasa.com/photo-69.jpg",
  "https://kasa.com/photo-420.jpg",
];

describe("ImageGalleryDialog", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = jest.fn(function () {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = jest.fn(function () {
      this.open = false;
      this.dispatchEvent(new Event("close"));
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("render", () => {
    it("should return null when images array is empty", () => {
      const { container } = render(<ImageGalleryDialog images={[]} />);

      expect(container.firstChild).toBeNull();
    });

    it("should call showModal on mount", () => {
      render(<ImageGalleryDialog images={mockImages} />);

      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
    });

    it("should display dialog with accessibility label", () => {
      render(<ImageGalleryDialog images={mockImages} />);

      const dialog = screen.getByRole("dialog");

      expect(dialog).toHaveAttribute("aria-label", "Galerie d'images");
    });

    it("should display the image at initialIndex with an alt text", () => {
      render(<ImageGalleryDialog images={mockImages} initialIndex={1} />);

      const image = screen.getByRole("img", {
        name: `Photo 2 sur ${mockImages.length}`,
      });

      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(mockImages[1])),
      );
    });

    it("should display the close button with an aria-label", () => {
      render(<ImageGalleryDialog images={mockImages} />);

      const closeButton = screen.getByRole("button", {
        name: "Fermer la galerie",
      });
      expect(closeButton).toBeInTheDocument();
    });

    it("should display the image counter text", () => {
      render(<ImageGalleryDialog images={mockImages} initialIndex={0} />);

      expect(
        screen.getByText(`Photo 1 sur ${mockImages.length}`),
      ).toBeInTheDocument();
    });

    it("should not display navigation buttons when there is only one image", () => {
      render(<ImageGalleryDialog images={["https://kasa.com/single.jpg"]} />);

      expect(
        screen.queryByRole("button", { name: "Image précédente" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Image suivante" }),
      ).not.toBeInTheDocument();
    });

    it("should display navigation buttons when there are multiple images", () => {
      render(<ImageGalleryDialog images={mockImages} />);

      expect(
        screen.getByRole("button", { name: "Image précédente" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Image suivante" }),
      ).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    it("should display next image when clicking next button after image is loaded", async () => {
      render(<ImageGalleryDialog images={mockImages} initialIndex={0} />);

      const image = screen.getByRole("img");

      fireEvent.load(image);

      const nextButton = screen.getByRole("button", { name: "Image suivante" });

      await waitFor(() => {
        expect(nextButton).not.toBeDisabled();
      });

      fireEvent.click(nextButton);

      expect(
        screen.getByRole("img", { name: `Photo 2 sur ${mockImages.length}` }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Photo 2 sur ${mockImages.length}`),
      ).toBeInTheDocument();
    });

    it("should loop to the first image when clicking next on the last image", async () => {
      render(<ImageGalleryDialog images={mockImages} initialIndex={2} />);

      const image = screen.getByRole("img");

      fireEvent.load(image);

      const nextButton = screen.getByRole("button", { name: "Image suivante" });

      await waitFor(() => {
        expect(nextButton).not.toBeDisabled();
      });

      fireEvent.click(nextButton);

      expect(
        screen.getByRole("img", { name: `Photo 1 sur ${mockImages.length}` }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Photo 1 sur ${mockImages.length}`),
      ).toBeInTheDocument();
    });

    it("should display previous image when clicking previous button", async () => {
      render(<ImageGalleryDialog images={mockImages} initialIndex={1} />);

      const image = screen.getByRole("img");

      fireEvent.load(image);

      const prevButton = screen.getByRole("button", {
        name: "Image précédente",
      });

      await waitFor(() => {
        expect(prevButton).not.toBeDisabled();
      });

      fireEvent.click(prevButton);

      expect(
        screen.getByRole("img", { name: `Photo 1 sur ${mockImages.length}` }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Photo 1 sur ${mockImages.length}`),
      ).toBeInTheDocument();
    });

    it("should loop to the last image when clicking previous on the first image", async () => {
      render(<ImageGalleryDialog images={mockImages} initialIndex={0} />);

      const image = screen.getByRole("img");

      fireEvent.load(image);

      const prevButton = screen.getByRole("button", {
        name: "Image précédente",
      });

      await waitFor(() => {
        expect(prevButton).not.toBeDisabled();
      });

      fireEvent.click(prevButton);

      expect(
        screen.getByRole("img", { name: `Photo 3 sur ${mockImages.length}` }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Photo 3 sur ${mockImages.length}`),
      ).toBeInTheDocument();
    });

    it("should disable navigation buttons while image is loading", () => {
      render(<ImageGalleryDialog images={mockImages} initialIndex={0} />);

      const nextButton = screen.getByRole("button", { name: "Image suivante" });
      const prevButton = screen.getByRole("button", {
        name: "Image précédente",
      });

      expect(nextButton).toBeDisabled();
      expect(prevButton).toBeDisabled();
    });
  });

  describe("keyboard navigation", () => {
    it("should navigate to next image when ArrowRight key is pressed", () => {
      render(<ImageGalleryDialog images={mockImages} initialIndex={0} />);

      fireEvent.keyDown(window, { key: "ArrowRight" });

      expect(
        screen.getByRole("img", { name: `Photo 2 sur ${mockImages.length}` }),
      ).toBeInTheDocument();
    });

    it("should navigate to previous image when ArrowLeft key is pressed", () => {
      render(<ImageGalleryDialog images={mockImages} initialIndex={1} />);

      fireEvent.keyDown(window, { key: "ArrowLeft" });

      expect(
        screen.getByRole("img", { name: `Photo 1 sur ${mockImages.length}` }),
      ).toBeInTheDocument();
    });

    it("should ignore other keyboard keys", () => {
      render(<ImageGalleryDialog images={mockImages} initialIndex={0} />);

      fireEvent.keyDown(window, { key: "Enter" });

      expect(
        screen.getByRole("img", { name: `Photo 1 sur ${mockImages.length}` }),
      ).toBeInTheDocument();
    });

    it("should not listen to arrow keys when there is only one image", () => {
      render(<ImageGalleryDialog images={["https://kasa.com/single.jpg"]} />);

      fireEvent.keyDown(window, { key: "ArrowRight" });

      expect(
        screen.getByRole("img", { name: "Photo 1 sur 1" }),
      ).toBeInTheDocument();
    });

    it("should remove keydown event listener when the component is unmounted", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
      const { unmount } = render(<ImageGalleryDialog images={mockImages} />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );
    });
  });

  describe("loading state", () => {
    it("should show loading spinner initially and remove it after image loads", async () => {
      const { container } = render(<ImageGalleryDialog images={mockImages} />);

      expect(container.querySelector(".loading-spinner")).toBeInTheDocument();

      const image = screen.getByRole("img");

      expect(image).not.toHaveClass("is-loaded");

      fireEvent.load(image);

      await waitFor(() => {
        expect(
          container.querySelector(".loading-spinner"),
        ).not.toBeInTheDocument();
      });
      expect(image).toHaveClass("is-loaded");
    });

    it("should reset loading state to true when navigating to another image", async () => {
      const { container } = render(<ImageGalleryDialog images={mockImages} />);
      const image = screen.getByRole("img");

      fireEvent.load(image);

      await waitFor(() => {
        expect(
          container.querySelector(".loading-spinner"),
        ).not.toBeInTheDocument();
      });

      const nextButton = screen.getByRole("button", { name: "Image suivante" });
      fireEvent.click(nextButton);

      expect(container.querySelector(".loading-spinner")).toBeInTheDocument();
    });
  });

  describe("onClose", () => {
    it("should call onClose when close button is clicked", () => {
      const onCloseMock = jest.fn();

      render(<ImageGalleryDialog images={mockImages} onClose={onCloseMock} />);

      const closeButton = screen.getByRole("button", {
        name: "Fermer la galerie",
      });

      fireEvent.click(closeButton);

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when clicking on the dialog backdrop", () => {
      const onCloseMock = jest.fn();

      render(<ImageGalleryDialog images={mockImages} onClose={onCloseMock} />);

      const dialog = screen.getByRole("dialog");

      fireEvent.click(dialog);

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("should not call onClose when clicking inside the dialog content", () => {
      const onCloseMock = jest.fn();

      render(<ImageGalleryDialog images={mockImages} onClose={onCloseMock} />);

      const image = screen.getByRole("img");

      fireEvent.click(image);

      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });
});
