import { getProperties } from "@/services/properties-service";

export async function POST(request) {
  const userFavorites = (await request.json()) || [];

  if (!userFavorites.length) return Response.json([]);

  // TODO When the signin is implemented fetch the favoris from the backend
  const properties = await getProperties();
  const favorites = properties.filter((property) =>
    userFavorites.includes(property.id),
  );

  return Response.json(favorites);
}
