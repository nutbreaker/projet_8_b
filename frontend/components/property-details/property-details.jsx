import IconLocation from '../icons/icon-location';
import ListSection from '../list-section/list-section';

import './property-details.css';

/**
 * @typedef {import("@/types/property").Property} Property
 */

/**
 * Displays the main details of a property.
 *
 * @param {Object} props component props
 * @param {Property} props.property property whose details are displayed
 *
 * @returns {JSX.Element} an article containing the property details, equipment, and category
 */
export default function PropertyDetails({ property }) {
    return (
        <article className="property__details">
            <header>
                <h1>{property.title}</h1>

                <address><IconLocation /> {property.location}</address>

                <p>
                    {property.description}
                </p>
            </header>

            <ListSection title={'Equipements'} entries={property.equipments} />
            <ListSection title={'Catégorie'} entries={property.tags} />
        </article>
    );
}