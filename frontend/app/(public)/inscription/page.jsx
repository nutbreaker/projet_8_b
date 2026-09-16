"use client";

import Button from "@/components/button/button";
import "./page.css";
import Link from "next/link";
import { useActionState } from "react";
import Hero from "@/components/hero/hero";
import { signUp } from "./actions";

export default function ConnexionPage() {
  const [state, formAction, pending] = useActionState(signUp, { error: "" });

  return (
    <div className="container signup">
      <Hero title="Rejoignez la communauté Kasa">
        <p>
          Créez votre compte et commencez à voyager autrement : réservez des
          logements uniques, découvrez de nouvelles destinations et partagez vos
          propres lieux avec d'autres voyageurs.
        </p>
      </Hero>

      <form action={formAction}>
        <div className="form-content">
          <label>
            Nom
            <input type="text" name="name" defaultValue={state.name} />
          </label>

          <label>
            Prénom
            <input
              type="text"
              name="first_name"
              defaultValue={state.firstName}
            />
          </label>
          <label>
            Adresse email
            <input type="email" name="email" defaultValue={state.email} />
          </label>

          <label>
            Mot de passe
            <input type="password" name="password" />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="cgu"
              value="1"
              defaultChecked={state.cgu}
            />
            <span>
              J'accepte les&nbsp;
              <Link href="#">conditions générales d'utilisation</Link>
            </span>
          </label>
        </div>

        {state.error && <span className="error">{state.error}</span>}

        <div className="form-bottom">
          <Button type="submit" disabled={pending}>
            {!pending ? "S'inscrire" : "Inscription..."}
          </Button>

          <Link href="/connexion">
            Déjà membre ? <b>Se connecter</b>
          </Link>
        </div>
      </form>
    </div>
  );
}
