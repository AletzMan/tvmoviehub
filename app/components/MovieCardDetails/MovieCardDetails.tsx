"use client"

import { MediaCard } from "../MediaCard/MediaCard"
import { IPartCollection } from "@/app/interfaces/movie"

interface Props {
    movie: IPartCollection
    type: 'movie' | 'tv'
    isFavorites?: boolean
    aspectRatio?: string
}

export function MovieCardDetails({ movie, type, isFavorites, aspectRatio }: Props) {
    return (
        <MediaCard
            id={movie.id}
            title={movie.title || movie.name || "Sin título"}
            posterPath={movie.poster_path}
            year={movie.release_date || movie.first_air_date}
            voteAverage={movie.vote_average}
            type={type}
            href={type === "movie" ? `/movies/${movie.id}` : `/series/${movie.id}`}
            showOptions={true}
            aspectRatio={aspectRatio}
        />
    )
}