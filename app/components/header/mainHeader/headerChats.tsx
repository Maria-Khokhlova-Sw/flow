import styles from './headerChats.module.scss';
import Image from 'next/image';

export default function HeaderChats() {
    const user = {
        name: "user",
        photo: "/img/photo/user1.jpg"
    }
    return (
        <div className={styles.main}>
            <div className={styles.searchContainer}>
                <button className={styles.searchButton}>
                    <svg className={styles.searchIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L15.8033 15.8033M15.8033 15.8033C17.2096 14.397 18 12.5435 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5435 18 14.397 17.2096 15.8033 15.8033Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <input type="text" className={styles.searchInput} placeholder="Поиск..." />
            </div>
            <div className={styles.user}>
                <div className={styles.name}>
                    {user.name}
                </div>
                <Image src={user.photo} alt="Фото пользователя" height={50} width={50} className={styles.photo_user} />
            </div>
        </div>
    );
}