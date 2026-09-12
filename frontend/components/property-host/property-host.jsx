import Image from "next/image";

import IconStar from "../icons/icon-star";
import MainRedLink from "../link/main-red-link";

import "./property-host.css";

/**
 * @typedef {import("@/types/property").Property} Property
 */

/**
 * Displays the host information of a property.
 *
 * @param {Object} props component props
 * @param {Property} props.property property whose host information is displayed
 *
 * @returns {JSX.Element} an aside containing the host details and contact links
 */
export default function PropertyHost({ property }) {
  return (
    <aside className="property__host">
      <h2>Votre hôte</h2>

      <div>
        <Image
          src={property.host.picture}
          alt={`Photo de ${property.host.name}`}
          width={82}
          height={82}
        />

        <p>{property.host.name}</p>

        <span title={`Note de ${property.rating_avg} sur 5`}>
          <IconStar /> {property.rating_avg}
        </span>
      </div>

      <MainRedLink href="#">Contacter l'hôte</MainRedLink>
      <MainRedLink href="#">Envoyer un message</MainRedLink>
    </aside>
  );
}
