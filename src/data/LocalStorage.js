import { useEffect, useState } from 'react'
// add prefixs to the app keys in localStorage 
const prefix = 'CodePen-Page'

export default function LocalStorage(key, initial) {
    const PrefixedKey = prefix + key

    const [value, setValue] = useState(() => {
        const JsonValue = localStorage.getItem(PrefixedKey)
        if (JsonValue != null) return JSON.parse(JsonValue)
        if (typeof initial === "function") return initial()
        return initial
    })

    useEffect(() => {
        localStorage.setItem(PrefixedKey, JSON.stringify(value))
    }, [PrefixedKey, value])

    return [value, setValue]
}

