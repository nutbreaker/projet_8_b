'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "../button/button";
import IconFavorites from "../icons/icon-favorites";

import FavoritesStorage from "@/utils/favorites-storage";

import './property-card.css';

/**
 * @typedef {import("@/types/property").Property} Property
 */

/**
 * Displays a card property.
 *
 * @param {Object} props component props
 * @param {Property} props.property property to display
 *
 * @returns {JSX.Element} a clickable card
 */
export default function PropertyCard({ property }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const favoritesStorage = new FavoritesStorage();

    useEffect(() => {
        setIsFavorite(
            favoritesStorage.hasFavorite(property.id)
        );
    }, [property.id]);

    const onClick = () => {
        setIsFavorite(
            favoritesStorage.toggleFavorite(property.id)
        );
    };

    return (
        <Link className="property-card" href={`/logement/${property.id}/${property.slug}`}>
            <figure>
                <Image src={`${property.cover}`} width={355} height={376} alt={`Photo de couverture ${property.title}`} />
                <figcaption>
                    <h3>{property.title}</h3>
                    <address>{property.location}</address>
                    <footer>
                        <b>{property.price_per_night}€</b> par nuit
                    </footer>
                </figcaption>
            </figure>

            <Button
                ariaLabel={!isFavorite ? `Ajouter ${property.title} aux favoris` : `Supprimer ${property.title} des favoris`}
                icon={<IconFavorites />}
                className={`favorite-button ${isFavorite ? 'favorite-button--selected' : ''}`}
                onClick={onClick}
            />
        </Link>
    );
}