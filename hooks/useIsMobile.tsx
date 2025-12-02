"use client";
import {useEffect, useState} from "react"
const MOBALE_BREAKPOINT = 720;
export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(()=>{
            const handleResize = () => {
                setIsMobile(window.innerWidth <= MOBALE_BREAKPOINT)
            };
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            }
        }, []);
    return isMobile;
}