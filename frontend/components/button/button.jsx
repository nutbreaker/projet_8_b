import './button.css';

/**
 * Custom button component which accepts an image icon.
 *
 * @param {Object} props component props
 * @param {React.ReactNode} [props.icon] optional icon displayed before the button
 * @param {string} [props.ariaLabel] aria lable
 * @param {React.ReactNode} [props.children] button content
 * @param {string} [props.className] additional CSS class
 * @param {boolean} [props.disabled=false] whether the button is disabled
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onClick] onClick callback
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props additional native button attributes
 *
 * @returns {JSX.Element} A reusable button element.
 */
export default function Button({
    icon,
    ariaLabel,
    children,
    className,
    disabled = false,
    onClick,
}) {
    const clickHandler = onClick
        ? (event) => {
            event.preventDefault();
            onClick(event);
        }
        : undefined;

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            className={`button ${className || ""}`}
            disabled={disabled}
            onClick={clickHandler}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
}