import Image from "next/image";

import Hero from "@/components/hero/hero";

import "./page.css";

export default function AboutPage() {
  return (
    <div className="container about">
      <Hero
        title="A propos"
        heroClassName="about__header"
        heroContentClassName="about__content"
        image={{
          src: "/image/about.jpg",
          alt: "about",
          width: 1115,
          height: 458,
        }}
      >
        <div>
          <p>
            Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où
            se sentir bien.
          </p>
          <p>
            Depuis notre création, nous mettons en relation des voyageurs en
            quête d'authenticité avec des hôtes passionnés qui aiment partager
            leur région et leurs bonnes adresses.
          </p>
        </div>
      </Hero>

      <section className="about__mission">
        <div>
          <h3>Notre mission est simple :</h3>

          <ol>
            <li>Offrir une plateforme fiable et simple d'utilisation</li>
            <li>Proposer des hébergements variés et de qualité</li>
            <li>
              Favoriser des échanges humains et chaleureux entre hôtes et
              voyageurs
            </li>
          </ol>
        </div>

        <Image
          src="/image/about-mission.jpg"
          alt="about mission"
          width={494}
          height={458}
        />

        <p>
          Que vous cherchiez un appartement cosy en centre-ville, une maison en
          bord de mer ou un chalet à la montagne, Kasa vous accompagne pour que
          chaque séjour devienne un souvenir inoubliable.
        </p>
      </section>
    </div>
  );
}
