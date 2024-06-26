import { IMovie, IPartCollection } from "./movie"
import { IPeople } from "./people"
import { ISerie } from "./serie"


export interface INowPlayingResponse {
	dates: Dates
	page: number
	results: IMovie[]
	total_pages: number
	total_results: number
}

export interface Dates {
	maximum: string
	minimum: string
}

export interface IMovieResponse {
	page: number
	results: IMovie[]
	total_pages: number
	total_results: number
}

export interface IRecommendationResponse {
	page: number
	results: IPartCollection[]
	total_pages: number
	total_results: number
}

export interface IAiringTodayResponse {
	page: number
	results: ISerie[]
	total_pages: number
	total_results: number
}

export interface IPopularPeopleResponse {
	page: number
	results: IPeople[]
	total_pages: number
	total_results: number
}
