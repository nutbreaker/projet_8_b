"use client";

import Image from "next/image";

import "./hero.css";

/**
 * Represents the image displayed in the hero section.
 *
 * @typedef {Object} HeroImage
 * @property {string} src image URL
 * @property {string} alt alternative text
 * @property {number} width width in pixels
 * @property {number} height height in pixels
 * @property {string} [className] optional CSS class
 */

/**
 * Displays a hero section with a title, optional content and an image.
 *
 * @param {Object} props component props
 * @param {string} props.title hero title
 * @param {string} props.heroClassName hero component class name
 * @param {string} props.heroContentClassName hero content class name
 * @param {HeroImage} props.image hero image
 * @param {React.ReactNode} [props.children] optional content displayed below the title
 *
 * @returns {JSX.Element} a hero section
 */
export default function Hero({
  title,
  heroClassName,
  heroContentClassName,
  image,
  children,
}) {
  return (
    <header className={`hero ${heroClassName}`}>
      <div className={`hero-content ${heroContentClassName}`}>
        <h2>{title}</h2>

        {children}
      </div>

      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={image.className}
      />
    </header>
  );
}
