import Link from "next/link";
import { notFound } from "next/navigation";
import IconBack from "@/components/icons/icon-back";
import PropertyDetails from "@/components/property-details/property-details";
import PropertyHost from "@/components/property-host/property-host";
import PropertyPictures from "@/components/property-pictures/property-pictures";
import { getProperty } from "@/services/properties-service";

import "./page.css";

export default async function LogementPage({ params }) {
  const {
    segment: [id],
  } = await params;
  const property = await getProperty(id);

  if (property.error) {
    notFound();
  }

  return (
    <div className="container property">
      <Link href="/">
        <IconBack /> Retour aux annonces
      </Link>
      <PropertyPictures pictures={property.pictures} />
      <PropertyDetails property={property} />
      <PropertyHost property={property} />
    </div>
  );
}
