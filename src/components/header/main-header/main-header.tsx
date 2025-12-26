import { Header, HeaderType } from "~/components/header/header";
import styles from "./main-header.module.css";

export function MainHeader() {
  return (
    <Header type={HeaderType.Main}>
      <picture>
        <source
          type="image/webp"
          srcSet="/images/avatar-100.webp 1x, /images/avatar-200.webp 2x"
        />
        <img
          src="/images/avatar.jpg"
          className={styles.avatar}
          loading="lazy"
          alt="Doğan Öztürk"
          width="100"
          height="100"
        />
      </picture>
      <div className={styles.title}>
        <h1 className={styles.name}>Doğan Öztürk</h1>
        <p className={styles.info}>REFLECTIONS ON TECHNOLOGY, CULTURE, AND LIFE</p>
      </div>
    </Header>
  );
}
