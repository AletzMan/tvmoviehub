"use client"

import { MediaCard } from "../MediaCard/MediaCard"
import { ISerie } from "@/app/interfaces/serie"
import { FormattedDateUpcoming } from "@/app/utils/helpers"

interface Props {
    serie: ISerie
}

export const SerieCardUpcoming = ({ serie }: Props) => {
    return (
        <MediaCard
            id={serie.id}
            title={serie.name}
            posterPath={serie.poster_path}
            year={FormattedDateUpcoming(serie.first_air_date)}
            voteAverage={undefined}
            type="tv"
            href={`/series/${serie.id}`}
            showOptions={true}
        />
    )
}