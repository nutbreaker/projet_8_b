"use client";

import Button from "@/components/button/button";

import "./error.css";

export default function ErrorPage({ retry }) {
  return (
    <div className="container">
      <section className="error-500">
        <h2>500</h2>
        <p>
          Il semble que le serveur ait rencontré une erreur inattendue... ou est
          tout simplement parti se reposer.
        </p>
        <div>
          <Button onClick={() => retry()}>Essayez à nouveau</Button>
        </div>
      </section>
    </div>
  );
}
