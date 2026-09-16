"use client";

import Link from "next/link";
import { useActionState } from "react";

import Button from "@/components/button/button";
import Hero from "@/components/hero/hero";

import { signIn } from "./actions";

import "./page.css";

export default function ConnexionPage() {
  const [state, formAction, pending] = useActionState(signIn, { error: "" });

  return (
    <div className="container signin">
      <Hero title="Heureux de vous revoir">
        <p>
          Connectez-vous pour retrouver vos réservations, vos annonces et tout
          ce qui rend vos séjours uniques.
        </p>
      </Hero>

      <form action={formAction}>
        <div className="form-content">
          <label>
            Adresse email
            <input type="text" name="email" defaultValue={state.email} />
          </label>

          <label>
            Mot de passe
            <input type="password" name="password" />
          </label>
        </div>

        {state.error && <span className="error">{state.error}</span>}

        <div className="form-bottom">
          <Button type="submit" disabled={pending}>
            {!pending ? "Se connecter" : "Connexion..."}
          </Button>

          <Link href="#">Mot de passe oublié</Link>
          <Link href="/inscription">
            Pas encore de compte ? <b>Inscrivez-vous</b>
          </Link>
        </div>
      </form>
    </div>
  );
}
