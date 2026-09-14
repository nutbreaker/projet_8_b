import Hero from "@/components/hero/hero";

import Favoris from "./favoris";

import "./page.css";

export default async function FavorisPage() {
  return (
    <div className="container">
      <Hero title="Vos favoris">
        <p>Retrouvez ici tous les logements que vous avez aimés.</p>
        <p>
          Prêts à réserver ? Un simple clic et votre prochain séjour est en
          route.
        </p>
      </Hero>

      <section className="property-favorites">
        <Favoris />
      </section>
    </div>
  );
}
