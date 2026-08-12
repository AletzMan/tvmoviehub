"use client"

import { MediaCard } from "../MediaCard/MediaCard"
import { ISerie } from "@/app/interfaces/serie"

interface Props {
    serie: ISerie
    top?: number
    aspectRatio?: string
}

export const SerieCard = ({ serie, top, aspectRatio }: Props) => {
    return (
        <MediaCard
            id={serie.id}
            title={serie.name}
            posterPath={serie.poster_path}
            year={serie.first_air_date}
            voteAverage={serie.vote_average}
            type="tv"
            href={`/series/${serie.id}`}
            showRank={top}
            aspectRatio={aspectRatio}
        />
    )
}