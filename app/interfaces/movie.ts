export interface IMovie {
	adult: boolean
	backdrop_path: string
	genre_ids: number[]
	id: number
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface IMovieDetails {
	adult: boolean
	backdrop_path: string
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
	poster_path: string
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
	backdrop_path: string
	id: number
	name: string
	original_name: string
	original_title: string
	overview: string
	poster_path: string
	media_type: string
	adult: boolean
	title: string
	original_language: string
	genre_ids: number[]
	popularity: number 
	release_date: string
	first_air_date: string
	video: boolean
	vote_average: number
	vote_count: number
  }
  