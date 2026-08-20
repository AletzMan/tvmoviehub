"use client"
import { RadioButtonGroup } from "@/app/components/RadioButton/RadioButtonGroup"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Suspense } from "react"

function FavoritesToggleContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const type = searchParams.get("type") || "movies"

    const options = [
        { id: "movies", label: "Películas" },
        { id: "series", label: "Series" }
    ]

    const handleChange = (value: string) => {
        const page = searchParams.get("page") || "1"
        router.push(`${pathname}?type=${value}&page=${page}`)
    }

    return (
        <RadioButtonGroup
            options={options}
            name="favorites-type"
            selectedValue={type}
            onChange={handleChange}
        />
    )
}

export default function FavoritesToggle() {
    return (
        <Suspense fallback={null}>
            <FavoritesToggleContent />
        </Suspense>
    )
}