export interface ICredits {
  id: number
  cast: ICast[]
  crew: ICrew[]
}

export interface IMovieCredits {
  cast: IParticipationsCast[]
  crew: IParticipationsCrew[]
  id: number
}

export interface ICast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface ICrew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string | null
  credit_id: string
  department: string
  job: string
}

export interface IParticipationsCast {
  adult: boolean
  backdrop_path?: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  character: string
  credit_id: string
  order: number
  job?: string
}



export interface IParticipationsCrew {
  adult: boolean
  backdrop_path?: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  credit_id: string
  department: string
  job: string
}

export interface ISerieCredits {
  cast: ISeriesCast[]
  crew: ISeriesCast[]
  id: number
}

export interface ISeriesCast {
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
  character: string
  credit_id: string
  episode_count: number
  job?: string
}
