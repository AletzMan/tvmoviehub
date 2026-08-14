import { ICast, ICrew, IMovieCredits, ISerieCredits } from "./credits"

export interface IPeople {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string | null
	known_for: KnownFor[]
}

export interface KnownFor {
	backdrop_path: string | null
	id: number
	original_name?: string
	overview: string
	poster_path: string | null
	media_type: string
	adult: boolean
	name?: string
	original_language: string
	genre_ids: number[]
	popularity: number
	first_air_date?: string
	vote_average: number
	vote_count: number
	origin_country?: string[]
	original_title?: string
	title?: string
	release_date?: string
	video?: boolean
}


export interface IPeopleDetails {
	adult: boolean
	also_known_as: string[]
	biography: string
	birthday: string
	deathday: any
	gender: number
	homepage: any
	id: number
	imdb_id: string
	known_for_department: string
	name: string
	place_of_birth: string
	popularity: number
	profile_path: string
	movie_credits: IMovieCredits
	tv_credits: ISerieCredits
	external_ids?: Record<string, any>
	images: IPeopleImages
}


export interface IPeopleImages {
	id: number
	profiles: IProfile[]
}

export interface IProfile {
	aspect_ratio: number
	height: number
	iso_639_1: any
	file_path: string
	vote_average: number
	vote_count: number
	width: number
}

export interface IFindByExternalID {
	movie_results: IMovieResult[]
	person_results: IPersonResult[]
	tv_results: ITVResult[]
	tv_episode_results: any[]
	tv_season_results: any[]
}

export interface IMovieResult {
	adult: boolean
	backdrop_path: string | null
	id: number
	title: string
	original_title: string
	overview: string
	poster_path: string | null
	media_type: string
	original_language: string
	genre_ids: number[]
	popularity: number
	release_date: string
	video: boolean
	vote_average: number
	vote_count: number
	softcore?: boolean
}

export interface IPersonResult {
	adult: boolean
	id: number
	name: string
	original_name: string
	media_type: string
	popularity: number
	gender: number
	known_for_department: string
	profile_path: string | null
	known_for: KnownFor[]
}

export interface ITVResult {
	adult: boolean
	backdrop_path: string | null
	id: number
	name?: string
	original_name?: string
	overview: string
	poster_path: string | null
	media_type: string
	original_language: string
	genre_ids: number[]
	popularity: number
	first_air_date?: string
	vote_average: number
	vote_count: number
	origin_country?: string[]
}


