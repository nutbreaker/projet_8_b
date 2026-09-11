'use client';

import Image from "next/image";
import Link from "next/link";

import Button from "../button/button";
import IconFavorites from "../icons/icon-favorites";

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
    // TODO implement add to favorites
    const onClick = () => {
        console.log(property);
    }

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
                ariaLabel={`Ajouter ${property.title} aux favoris`}
                icon={<IconFavorites />}
                className="favorite-button"
                onClick={onClick}
            />
        </Link>
    );
}