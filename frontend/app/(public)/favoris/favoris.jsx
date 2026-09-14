"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import PropertyCard from "@/components/property-card/property-card";
import { useFavorites } from "@/context/favorites-context";

/**
 * Displays the list of stored favorited properties.
 *
 * @returns {JSX.Element} list of favorited property cards, empty message, or loading state
 */
export default function Favoris() {
  const { favorites, isLoaded } = useFavorites();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleFavoriteChange = (propertyId, isFavorite) => {
    if (isFavorite) return;

    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  useEffect(() => {
    if (!isLoaded) return;

    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      const response = await fetch("/api/favoris", {
        method: "POST",
        body: JSON.stringify(favorites),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setProperties(data);
      setLoading(false);
    };

    fetchFavorites();
  }, [isLoaded, favorites]);

  if (loading) return <Loading />;

  if (properties.length === 0) {
    return (
      <p className="favorites-empty">
        Vous n'avez aucun logement dans vos favoris.
      </p>
    );
  }

  return (
    <>
      {Array.isArray(properties) &&
        properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onFavoriteChange={handleFavoriteChange}
          />
        ))}
    </>
  );
}
