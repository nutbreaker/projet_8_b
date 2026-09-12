import Hero from "@/components/hero/hero";
import PropertyCard from "@/components/property-card/property-card";
import { getProperties } from "@/services/properties-service";

import "./page.css";

export default async function Home() {
  const properties = await getProperties();

  return (
    <div className="container">
      <Hero
        title="Chez vous, partout et ailleurs"
        image={{
          src: "/image/hero.jpg",
          alt: "johannes-sejer-Xn3vcIpPi1E-unsplash 1",
          width: 1115,
          height: 458,
        }}
      >
        <p>
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux,
          sélectionnés avec soin par nos hôtes.
        </p>
      </Hero>

      <section className="property-listing">
        {Array.isArray(properties) &&
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
      </section>

      <section className="how-it-works">
        <header>
          <h3>Comment ça marche ?</h3>
          <p>
            Que vous partiez pour un week-end improvisé, des vacances en famille
            ou un voyage professionnel, Kasa vous aide à trouver un lieu qui
            vous ressemble.
          </p>
        </header>
        <div className="how-it-works__cards">
          <div>
            <h4>Recherchez</h4>
            <p>
              Entrez votre destination, vos dates et laissez Kasa faire le
              reste.
            </p>
          </div>
          <div>
            <h4>Réservez</h4>
            <p>
              Profitez d'une plateforme sécurisée et de profils d'hôtes
              vérifiés.
            </p>
          </div>
          <div>
            <h4>Vivez l'expérience</h4>
            <p>
              Installez-vous, profitez de votre séjour, et sentez-vous chez
              vous, partout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
