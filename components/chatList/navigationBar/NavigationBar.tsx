"use client"
import styles from './navigationBar.module.scss'
import  cn from 'classnames';

interface NavigationBarProps {
    activeIndex: number;
    onClick: (index:number) => void;
}
export default function NavigationBar({activeIndex, onClick}: NavigationBarProps) {
    const categories = [
        'Всё',
        'Непрочитанные'
    ]

    return (
        <div className={styles.navigationBar}>
            {categories.map((category, index) => (
                <button key={index} className={cn(
                    styles.navTab,
                    activeIndex === index && styles.active)}
                        onClick={() => onClick(index)}>
                    {category}
                </button>
            ))}
        </div>
    );
}