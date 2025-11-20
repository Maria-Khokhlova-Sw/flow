"use client"
import styles from './navigationBar.module.scss'
import  cn from 'classnames';
import {useState} from "react";

export default function NavigationBar() {
    const categories = [
        'Всё',
        'Непрочитанные'
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const handleClick = (index:number) => {
        setActiveIndex(index);
    }

    return (
        <div className={styles.navigationBar}>
            {categories.map((category, index) => (
                <button key={index} className={cn(
                    styles.navTab,
                    activeIndex === index && styles.active)}
                        onClick={() => handleClick(index)}>
                    {category}
                </button>
            ))}
        </div>
    );
}