import { useState,useEffect } from "react";

const usePersist = () => {
    const [persist, setPersist] = 
        useState(JSON.parse(localStorage.getItem('persist')) || false)
       
    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist))
    }, [persist])
    reutn [persist, setPersist]
}

export default usePersist