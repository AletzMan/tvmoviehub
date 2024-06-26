import { ICrew } from "./credits"

export interface ISerie {
	adult: boolean
	backdrop_path: string
	genre_ids: number[]
	id: number
	origin_country: string[]
	original_language: string
	original_name: string
	overview: string
	popularity: number
	poster_path: string
	first_air_date: string
	name: string
	vote_average: number
	vote_count: number
}

export interface ISerieDetails {
	adult: boolean
	backdrop_path: string
	created_by: ICreatedBy[]
	episode_run_time: any[]
	first_air_date: string
	genres: IGenre[]
	homepage: string
	id: number
	in_production: boolean
	languages: string[]
	last_air_date: string
	last_episode_to_air: ILastEpisodeToAir
	name: string
	next_episode_to_air: INextEpisodeToAir
	networks: INetwork[]
	number_of_episodes: number
	number_of_seasons: number
	origin_country: string[]
	original_language: string
	original_name: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: IProductionCompany[]
	production_countries: IProductionCountry[]
	seasons: ISeason[]
	spoken_languages: ISpokenLanguage[]
	status: string
	tagline: string
	type: string
	vote_average: number
	vote_count: number
  }
  
  export interface ICreatedBy {
	id: number
	credit_id: string
	name: string
	original_name: string
	gender: number
	profile_path: any
  }
  
  export interface IGenre {
	id: number
	name: string
  }
  
  export interface ILastEpisodeToAir {
	id: number
	overview: string
	name: string
	vote_average: number
	vote_count: number
	air_date: string
	episode_number: number
	episode_type: string
	production_code: string
	runtime: any
	season_number: number
	show_id: number
	still_path: any
  }
  
  export interface INextEpisodeToAir {
	id: number
	overview: string
	name: string
	vote_average: number
	vote_count: number
	air_date: string
	episode_number: number
	episode_type: string
	production_code: string
	runtime: any
	season_number: number
	show_id: number
	still_path: any
  }
  
  export interface INetwork {
	id: number
	logo_path: string
	name: string
	origin_country: string
  }
  
  export interface IProductionCompany {
	id: number
	logo_path: any
	name: string
	origin_country: string
  }
  
  export interface IProductionCountry {
	iso_3166_1: string
	name: string
  }
  
  export interface ISeason {
	air_date: string
	episode_count: number
	id: number
	name: string
	overview: string
	poster_path?: string
	season_number: number
	vote_average: number
  }
  
  export interface ISpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
  }
  

  export interface ISeasonDetails {
	_id: string
	air_date: string
	episodes: IEpisode[]
	name: string
	overview: string
	id: number
	poster_path: string
	season_number: number
	vote_average: number
  }
  
  export interface IEpisode {
	air_date: string
	episode_number: number
	episode_type: string
	id: number
	name: string
	overview: string
	production_code: string
	runtime: number
	season_number: number
	show_id: number
	still_path: string
	vote_average: number
	vote_count: number
	crew: ICrew[]
	guest_stars: IGuestStar[]
  }
  
 
  export interface IGuestStar {
	character: string
	credit_id: string
	order: number
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path?: string
  }
  