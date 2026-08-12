"use client"

import { MediaCard } from "../MediaCard/MediaCard"
import { IMovie } from "@/app/interfaces/movie"
import { FormattedDateUpcoming } from "@/app/utils/helpers"

interface Props {
    movie: IMovie
    aspectRatio?: string
}

export const MovieCardUpcoming = ({ movie, aspectRatio }: Props) => {
    return (
        <MediaCard
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            year={FormattedDateUpcoming(movie.release_date)}
            voteAverage={undefined}
            type="movie"
            href={`/movies/${movie.id}`}
            showOptions={true}
            aspectRatio={aspectRatio}
        />
    )
}