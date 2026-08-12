"use client"

import { MediaCard } from "../MediaCard/MediaCard"
import { IMovie } from "@/app/interfaces/movie"
import styles from "../MediaCard/mediacard.module.scss"

interface Props {
    movie: IMovie
    top?: number
    aspectRatio?: string
}

export const MovieCard = ({ movie, top, aspectRatio }: Props) => {
    return (
        <MediaCard
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            year={movie.release_date}
            voteAverage={movie.vote_average}
            type="movie"
            href={`/movies/${movie.id}`}
            showRank={top}
            className={styles.mediaCard}
            aspectRatio={aspectRatio}
        />
    )
}