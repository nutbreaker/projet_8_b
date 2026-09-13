"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import IconBack from "../icons/icon-back";
import IconClose from "../icons/icon-close";

import "./image-gallery.css";

/**
 * Displays a modal image gallery dialog with keyboard and button navigation.
 *
 * @param {Object} props component props
 * @param {string[]} [props.images=[]] URLs of the images to display
 * @param {number} [props.initialIndex=0] initial image index to display
 * @param {() => void} props.onClose callback invoked when the dialog closes
 *
 * @returns {JSX.Element|null} a modal dialog displaying the image gallery
 */
export default function ImageGalleryDialog({
  images = [],
  initialIndex = 0,
  onClose,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const dialogRef = useRef(null);

  const showPrevious = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const showNext = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    dialogRef.current?.showModal();

    if (images.length <= 1) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, showNext, showPrevious]);

  if (!images.length) return null;

  const closeOnBackdropClick = (e) =>
    e.target === dialogRef.current && onClose();

  const handleDialogKeyDown = (event) => {
    if (event.key !== "Escape") return;

    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="image-gallery"
      onClose={onClose}
      onClick={closeOnBackdropClick}
      onKeyDown={handleDialogKeyDown}
      aria-label="Galerie d'images"
    >
      <button
        type="button"
        className="close"
        onClick={onClose}
        aria-label="Fermer la galerie"
      >
        <IconClose />
      </button>

      {isLoading && <span className="loading-spinner" aria-hidden="true" />}

      <Image
        key={currentIndex}
        src={images[currentIndex]}
        width={1080}
        height={768}
        alt={`Photo ${currentIndex + 1} sur ${images.length}`}
        className={!isLoading ? "is-loaded" : ""}
        onLoad={() => setIsLoading(false)}
      />

      {images.length > 1 && (
        <>
          <button
            disabled={isLoading}
            type="button"
            className="previous"
            onClick={showPrevious}
            aria-label="Image précédente"
          >
            <IconBack />
          </button>

          <button
            disabled={isLoading}
            type="button"
            className="next"
            onClick={showNext}
            aria-label="Image suivante"
          >
            <IconBack />
          </button>
        </>
      )}

      <span className="image-counter">{`Photo ${currentIndex + 1} sur ${images.length}`}</span>
    </dialog>
  );
}
