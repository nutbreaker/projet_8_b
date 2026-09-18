import { getSessionToken } from "@/services/session";
import decodeJWT from "@/utils/jwt-decoder";

import "./page.css";

export default async function AddPropertyPage() {
  const token = await getSessionToken();
  const userInfo = await decodeJWT(token);

  if (userInfo?.role === "client") {
    return (
      <div
        className="container add-property-page"
        style={{ placeContent: "center" }}
      >
        <h2>Autorisations insuffisantes</h2>
        <p>
          Vous n'avez malheureusement pas l'autorisation d'ajouter un nouveau
          logement.
        </p>
      </div>
    );
  }

  return (
    <div className="container add-property-page">
      <h2>Ajouter une propriété</h2>
      <p>En cours de construction</p>
    </div>
  );
}
