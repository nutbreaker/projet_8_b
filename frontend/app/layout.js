import "./globals.css";

export const metadata = {
  title: " Kasa, une entreprise de location d'appartements et de maisons entre particuliers.",
  description: "Avec plus de 500 nouvelles annonces chaque jour, Kasa fait partie des leaders du marché en France.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
