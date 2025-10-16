"use client";
import styles from "./mainDesctop.module.scss"
export default function MainDesktop() {
    return (
        <div className={styles.desk}>
            <img src={'/img/background.png'} alt="desk" className={styles.background} />
        </div>
        )
}