"use client"
import { RadioButtonGroup } from "@/app/components/RadioButton/RadioButtonGroup"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Suspense } from "react"

function WatchlistToggleContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const type = searchParams.get("type") || "movies"

    const options = [
        { id: "movies", label: "Películas" },
        { id: "series", label: "Series" }
    ]

    const handleChange = (value: string) => {
        const newUrl = `${pathname}?type=${value}&page=1`
        router.push(newUrl)
    }

    return (
        <RadioButtonGroup
            options={options}
            name="watchlist-type"
            selectedValue={type} 
            onChange={handleChange}
        />
    )
}

export default function WatchlistToggle() {
    return (
        <Suspense fallback={null}>
            <WatchlistToggleContent />
        </Suspense>
    )
}