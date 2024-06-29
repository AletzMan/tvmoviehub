export interface IMovie {
	adult: boolean
	backdrop_path: string | null
	genre_ids: number[]
	id: number
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string | null
	release_date: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface IMovieDetails {
	adult: boolean
	backdrop_path: string | null
	belongs_to_collection: BelongsToCollection
	budget: number
	genres: Genre[]
	homepage: string
	id: number
	imdb_id: string
	origin_country: string[]
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string | null
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: any[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface BelongsToCollection {
	id: number
	name: string
	poster_path: string
	backdrop_path: string
}

export interface Genre {
	id: number
	name: string
}

export interface ProductionCompany {
	id: number
	logo_path?: string | null
	name: string
	origin_country: string
}

export interface ProductionCountry {
	iso_3166_1: string
	name: string
}

export interface ICollectionDetails {
	id: number
	name: string
	overview: string
	poster_path: string
	backdrop_path: string
	parts: IPartCollection[]
}

export interface IPartCollection {
	backdrop_path?: string
	id: number
	name?: string
	original_name?: string
	overview?: string
	poster_path?: string
	media_type?: string
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
	profile_path?: string
	known_for?: IKnownFor[]
	title?: string
	original_title?: string
	release_date?: string
	video?: boolean
}

export interface IKnownFor {
	backdrop_path?: string
	id: number
	title?: string
	original_title?: string
	overview: string
	poster_path?: string
	media_type: string
	adult: boolean
	original_language: string
	genre_ids: number[]
	popularity: number
	release_date?: string
	video?: boolean
	vote_average: number
	vote_count: number
	name?: string
	original_name?: string
	first_air_date?: string
	origin_country?: string[]
}


export interface IQueryParamasMovies {
	certification?: string
	"certification.gte"?: Date
	"certification.lte"?: Date
	certification_country?: string
	primary_release_year?: number
	"primary_release_year.gte"?: Date
	"primary_release_year.lte"?: Date
	"release_date.gte"?: Date
	"release_date.lte"?: Date
	include_adult?: boolean
	include_video?: boolean
	nclude_null_first_air_dates?: boolean
	language?: string
	page?: number
	sort_by?: string
	timezone?: string
	with_genres?: string
	"vote_average.gte"?: number
	"vote_average.lte"?: number
	"vote_count.gte"?: number
	"vote_count.lte"?: number
}