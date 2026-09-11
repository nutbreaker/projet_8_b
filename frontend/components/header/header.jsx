'use client';

import Image from "next/image";
import Link from "next/link";

import './header.css';

import IconFavorites from "../icons/icon-favorites";
import IconMessage from "../icons/icon-message";
import IconMenu from "../icons/icon-menu";
import IconClose from "../icons/icon-close";
import { useState } from "react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenuOpen = (e) => {
        e.preventDefault();

        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <header className="header">
            {/* Desktop menu */}
            <div className="header-desktop">
                <nav className="main-menu" aria-label="Menu principal">
                    <ul>
                        <li><Link href="/">Accueil</Link></li>
                        <li><Link href="/a-propos">A propos</Link></li>
                    </ul>
                </nav>
                <h1>
                    <a href="/">
                        <Image src="/kasa-logo.svg" alt="Kasa logo" width={113} height={40} />
                    </a>
                </h1>
                <nav className="secondary-menu" aria-label="Menu secondaire">
                    <ul>
                        <li><Link href="/add-property">+Ajouter un logement</Link></li>
                        <li className="menu-items-group">
                            <Link aria-label="Favoris" href="/favorites">
                                <IconFavorites />
                            </Link>

                            <Image src="/line.svg" alt="Icône séparateur" width={5} height={5} />

                            <Link aria-label="Messagerie" href="/chat">
                                <IconMessage />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div className={`header-mobile ${isMobileMenuOpen ? 'header-mobile--open' : ''}`}>
                <h1>
                    <a href="/">
                        <Image src="/kasa-picto.svg" alt="Kasa picto" width={46} height={53} />
                    </a>
                </h1>

                <button
                    aria-label={!isMobileMenuOpen ? "Ouvrir le menu" : "Fermer le menu"}
                    onClick={toggleMobileMenuOpen}
                >
                    {!isMobileMenuOpen ? <IconMenu /> : <IconClose />}
                </button>


                <nav
                    inert={isMobileMenuOpen ? false : true}
                    className="mobile-menu"
                    aria-label="Menu principal"
                >
                    <ul>
                        <li><Link href="/">Accueil</Link></li>
                        <li><Link href="/a-propos">A propos</Link></li>
                        <li><Link href="/chat">Messagerie</Link></li>
                        <li><Link href="/favorites">Favoris</Link></li>
                    </ul>
                </nav>

                <Link className="mobile-menu__add-property" href="/add-property">Ajouter un logement</Link>
            </div>
        </header>
    );
}