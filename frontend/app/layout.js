import { Inter } from "next/font/google";
import Footer from "@/components/footer/footer";

import "./globals.css";
import Header from "@/components/header/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"]
});


export const metadata = {
  title: " Kasa, une entreprise de location d'appartements et de maisons entre particuliers.",
  description: "Avec plus de 500 nouvelles annonces chaque jour, Kasa fait partie des leaders du marché en France.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable}`}>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
