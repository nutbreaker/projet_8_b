import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.logo}>
            <Image
              src="/kasa-logo.svg"
              alt="Kasa logo"
              width={350}
              height={350}
            />

    </div>
  );
}
