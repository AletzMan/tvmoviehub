export interface IImages {
    backdrops: IBackdrop[]
    id: number
    logos: ILogo[]
    posters: IPoster[]
}

export interface IBackdrop {
    aspect_ratio: number
    height: number
    iso_639_1?: string | null
    file_path: string
    vote_average: number
    vote_count: number
    width: number
}

export interface ILogo {
    aspect_ratio: number
    height: number
    iso_639_1: string | null
    file_path: string
    vote_average: number
    vote_count: number
    width: number
}

export interface IPoster {
    aspect_ratio: number
    height: number
    iso_639_1?: string | null
    file_path: string
    vote_average: number
    vote_count: number
    width: number
}
