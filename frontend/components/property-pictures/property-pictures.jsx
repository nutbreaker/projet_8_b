"use client";

import Image from "next/image";
import { useState } from "react";

import ImageGalleryDialog from "../image-gallery/image-gallery";

import "./property-pictures.css";

/**
 * Displays the pictures of a property.
 *
 * @param {Object} props component props
 * @param {string[]} [props.pictures=[]] URLs of the property pictures to display
 *
 * @returns {JSX.Element} a section containing up to five property pictures
 */
export default function PropertyPictures({ pictures = [] }) {
  const hasEntries = Boolean(
    pictures && Array.isArray(pictures) && pictures.length,
  );

  // TODO maybe later display a gray square for empty entries
  // const filledPictures = pictures
  //     .slice(0, 5)
  //     .concat(Array(5).fill(undefined))
  //     .slice(0, 5);

  const [selectedPictureIndex, setSelectedPictureIndex] = useState(null);

  function handlePictureClick(event, index) {
    event.preventDefault();

    setSelectedPictureIndex(index);
  }

  return (
    <>
      <section className="property__pictures" aria-label="Photos du logement">
        {hasEntries &&
          pictures.slice(0, 5).map((picture, _index) => {
            const isFirst = !_index;

            return (
              <a
                key={picture}
                href={picture}
                onClick={(event) => handlePictureClick(event, _index)}
              >
                <Image
                  src={picture}
                  alt={`photos ${_index}`}
                  width={isFirst ? 303 : 146}
                  height={isFirst ? 357 : 174}
                />
              </a>
            );
          })}
      </section>

      {selectedPictureIndex !== null && (
        <ImageGalleryDialog
          images={pictures}
          initialIndex={selectedPictureIndex}
          onClose={() => setSelectedPictureIndex(null)}
        />
      )}
    </>
  );
}
