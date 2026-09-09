import Image from 'next/image';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer>
            <div className={styles.container}>
                <Image src="/kasa-picto.svg" alt="Kasa picto" width={46} height={53} />
                &copy; 2025 Kasa. All rights reserved
            </div>
        </footer>
    )
}