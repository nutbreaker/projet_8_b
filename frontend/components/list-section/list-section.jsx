import './list-section.css';

/**
 * Displays a titled list of entries.
 *
 * @param {Object} props component props
 * @param {string} props.title section title
 * @param {string[]} [props.entries=[]] entries to display
 * @param {string} [props.sectionClassName] additional CSS class for the section
 * @param {string} [props.ulClassName] additional CSS class for the list
 *
 * @returns {JSX.Element} a section containing the title and, when available, the entries list
 */
export default function ListSection({ title, entries = [], sectionClassName, ulClassName }) {
    const hasEntries = Boolean(entries && Array.isArray(entries) && entries.length);

    return (
        <section className={`list-section ${sectionClassName}`}>
            <h2>{title}</h2>

            {
                hasEntries &&
                <ul className={`list-section__ul ${ulClassName}`}>
                    {
                        entries.map((entry, index) => <li key={index}>{entry}</li>)
                    }
                </ul>
            }
        </section>
    );
}