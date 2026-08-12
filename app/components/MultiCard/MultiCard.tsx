"use client"

import { MediaCard } from "../MediaCard/MediaCard"
import { IResult } from "@/app/interfaces/multi"
import { FemaleIcon, MaleIcon } from "@/app/utils/svg"

interface Props {
    result: IResult
    aspectRatio?: string
}

export function MultiCard({ result, aspectRatio }: Props) {
    const getImageUrl = () => {
        if (result.poster_path) {
            return result.poster_path
        }
        if (result.profile_path) {
            return result.profile_path
        }
        return undefined
    }

    const href = result.media_type === "movie" ? `/movies/${result.id}` : result.media_type === "tv" ? `/series/${result.id}` : `/people/${result.id}`

    const genderIcon = result.media_type === "person" ? (
        <span className="gender">
            {result.gender === 1 ?
                <FemaleIcon className="genderFemale" />
                :
                <MaleIcon className="genderMale" />
            }
        </span>
    ) : null

    return (
        <MediaCard
            id={result.id}
            title={result.title || result.name || "Sin título"}
            posterPath={getImageUrl()}
            year={result.media_type === "person" ? undefined : (result.release_date || result.first_air_date)}
            voteAverage={result.media_type === "person" ? undefined : result.vote_average}
            type={result.media_type === "tv" ? "tv" : result.media_type === "person" ? "person" : "movie"}
            href={href}
            showOptions={result.media_type !== "person"}
            extraContent={genderIcon}
            aspectRatio={aspectRatio}
        />
    )
}