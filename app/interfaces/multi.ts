export interface IMultiResponse {
    page: number
    results: IResult[]
    total_pages: number
    total_results: number
}

export interface IResult {
    backdrop_path?: string | null
    id: number
    name?: string
    original_name?: string
    overview?: string
    poster_path?: string | null
    media_type: string
    adult: boolean
    original_language?: string
    genre_ids?: number[]
    popularity: number
    first_air_date?: string
    vote_average?: number
    vote_count?: number
    origin_country?: string[]
    gender?: number
    known_for_department?: string
    profile_path?: string | null
    known_for?: IKnownFor[]
    title?: string
    original_title?: string
    release_date?: string
    video?: boolean
}

export interface IKnownFor {
    backdrop_path?: string | null
    id: number
    title: string
    original_title: string
    overview: string
    poster_path: string | null
    media_type: string
    adult: boolean
    original_language: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
}
