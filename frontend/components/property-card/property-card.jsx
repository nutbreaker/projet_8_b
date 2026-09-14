"use client";

import Image from "next/image";
import Link from "next/link";
import { flushSync } from "react-dom";
import { useFavorites } from "@/context/favorites-context";
import Button from "../button/button";
import IconFavorites from "../icons/icon-favorites";

import "./property-card.css";

/**
 * @typedef {import("@/types/property").Property} Property
 */

/**
 * Displays a clickable property card with favorite toggle support.
 *
 * @param {Object} props component props
 * @param {Property} props.property property to display
 * @param {string} [props.className=""] optional CSS class
 * @param {React.CSSProperties} [props.style] optional styles
 * @param {(id: string|number, isFavorite: boolean) => void} [props.onFavoriteChange] optional callback called when favorite status toggles
 *
 * @returns {JSX.Element} a clickable card link
 */
export default function PropertyCard({
  property,
  className = "",
  style,
  onFavoriteChange,
}) {
  const { hasFavorite, toggleFavorite } = useFavorites();
  const isFavorite = hasFavorite(property.id);
  const onClick = () => {
    const nextFavoriteState = toggleFavorite(property.id);

    if (!onFavoriteChange) return;

    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document)
    ) {
      onFavoriteChange(property.id, nextFavoriteState);

      return;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
    document.startViewTransition(() => {
      // https://react.dev/reference/react-dom/flushSync
      // forces an immediate DOM update
      flushSync(() => {
        onFavoriteChange(property.id, nextFavoriteState);
      });
    });
  };

  return (
    <Link
      style={{
        viewTransitionName: `card-${property.id}`,
        ...style,
      }}
      className={`property-card ${className}`.trim()}
      href={`/logement/${property.id}/${property.slug}`}
    >
      <figure>
        <Image
          src={`${property.cover}`}
          width={355}
          height={376}
          alt={`Photo de couverture ${property.title}`}
        />
        <figcaption>
          <h3>{property.title}</h3>
          <address>{property.location}</address>
          <footer>
            <b>{property.price_per_night}€</b> par nuit
          </footer>
        </figcaption>
      </figure>

      <Button
        ariaLabel={
          !isFavorite
            ? `Ajouter ${property.title} aux favoris`
            : `Supprimer ${property.title} des favoris`
        }
        icon={<IconFavorites />}
        className={`favorite-button ${isFavorite ? "favorite-button--selected" : ""}`}
        onClick={onClick}
      />
    </Link>
  );
}
