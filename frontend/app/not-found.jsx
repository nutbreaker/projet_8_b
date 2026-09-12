import "./not-found.css";

import MainRedLink from "@/components/link/main-red-link";

export default function NotFound() {
  return (
    <div className="container">
      <section className="error-not-found">
        <h2>404</h2>
        <p>
          Il semble que la page que vous cherchez ait pris des vacances... ou
          n'ait jamais existé.
        </p>
        <div>
          <MainRedLink href="/">Accueil</MainRedLink>
          <MainRedLink href="/">Logements</MainRedLink>
        </div>
      </section>
    </div>
  );
}
