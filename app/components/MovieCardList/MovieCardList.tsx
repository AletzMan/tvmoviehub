"use client"

import { MediaCard } from "../MediaCard/MediaCard"
import { IListItem } from "@/app/interfaces/list"
import { useDialogAlert } from "@/app/services/store"
import { DeleteIcon } from "@/app/utils/svg"

interface Props {
    movie: IListItem
    list_id: number
}

export function MovieCardList({ movie, list_id }: Props) {
    const { viewDialog, setViewDialog, setItemToDelete, setTypeDialog } = useDialogAlert()

    const handleDeleteItem = async () => {
        setViewDialog(true)
        setTypeDialog("item")
        setItemToDelete({ id: movie.id, list_id, name_item: movie.name || movie.title, name_list: "", text: ["¿Desea eliminar el elemento de la lista?", ""] })
    }

    const deleteButton = (
        <button
            className="delete"
            title="Eliminar de la lista"
            onClick={(e) => {
                e.stopPropagation()
                handleDeleteItem()
            }}
        >
            <DeleteIcon className="delete_icon" />
        </button>
    )

    return (
        <MediaCard
            id={movie.id}
            title={movie.title || movie.name || "Sin título"}
            posterPath={movie.poster_path}
            year={movie.release_date || movie.first_air_date}
            voteAverage={movie.vote_average}
            type={movie.media_type === "tv" ? "tv" : "movie"}
            href={movie.media_type === "tv" ? `/series/${movie.id}` : `/movies/${movie.id}`}
            showOptions={false}
            actions={deleteButton}
        />
    )
}