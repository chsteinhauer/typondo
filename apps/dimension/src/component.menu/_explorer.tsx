import * as styles from "./_explorer.styles";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

export function Explorer() {
  return (
    <ul className={styles.tree}>
      <li>
        <details open>
          <summary className={styles.item}>Giant planets</summary>
          <ul>
            <li>
              <details>
                <summary className={styles.item}>Gas giants</summary>
                <ul>
                  <li className={styles.item}>Jupiter</li>
                  <li className={styles.item}>Saturn</li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary className={styles.item}>Ice giants</summary>
                <ul>
                  <li className={styles.item}>Uranus</li>
                  <li className={styles.item}>Neptune</li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
}
