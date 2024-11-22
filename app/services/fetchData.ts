import { IErrorLogin, ILoginValidation, IRequestToken, ISessionID, IUser } from "../interfaces/authentication"
import { ICredits, IMovieCredits, ISerieCredits } from "../interfaces/credits"
import { IFavorites } from "../interfaces/favorite"
import { IImages } from "../interfaces/image"
import { IKeywords, IResult } from "../interfaces/keyword"
import { IResponseCreateMovie, IResponseListMovie } from "../interfaces/list"
import { ICollectionDetails, IExternalIDs, IMovie, IMovieDetails, IMovieStates, IQueryParamasMovies } from "../interfaces/movie"
import { IMultiResponse } from "../interfaces/multi"
import { IPeopleDetails, IPeopleImages } from "../interfaces/people"
import { IAiringTodayResponse, IMovieResponse, INowPlayingResponse, IPeopleResponse, IRecommendationResponse, ISerieResponse } from "../interfaces/responses"
import { IQueryParamasSeries, ISeasonDetails, ISerie, ISerieDetails, ISerieStates } from "../interfaces/serie"

const API_URL_BASE = "https://api.themoviedb.org/3"
const TOP_RATING_SERIES_PATH = "/tv/top_rated?"
const TOP_POPULAR_SERIES_PATH = "/tv/popular?"
const TOP_TRENDING_SERIES_PATH = "/trending/tv/day?"
const TOP_RATING_MOVIES_PATH = "/movie/top_rated?"
const TOP_POPULAR_MOVIES_PATH = "/movie/popular?"
const TOP_TRENDING_MOVIES_PATH = "/trending/movie/day?"
const TOP_UPCOMMIG_MOVIES_PATH = "/movie/upcoming?"
const NOW_PLAYING = "/movie/now_playing"
const DETAILS_SERIES_PATH = "/tv/"
const DETAILS_MOVIES_PATH = "/movie/"
const DETAILS_COLLECTION_PATH = "/collection/"
const VIDEOS_SERIES_PATH = "/tv/"
const LANGUAGE_MX = "es-MX"
const LANGUAGE_ES = "es-ES"
const LANGUAGE_EN = "eN-US"

const API_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_AUTH

const optionsGET = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
	next: { revalidate: 1000 },
}

const optionsLogin = {
	method: "POST",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	}
}

export const GetNowPlaying = async () => {
	const url = `${API_URL_BASE}${NOW_PLAYING}?language=${LANGUAGE_MX}&region=MX`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IMovieResponse
	const numberRandoms: number[] = []

	do {
		const random = Math.floor(Math.random() * 20)
		if (!numberRandoms.includes(random)) {
			numberRandoms.push(random)
		}
	} while (numberRandoms.length < 10)

	const results: IMovie[] = []

	data.results.forEach((movie, index) => {
		if (numberRandoms.includes(index)) {
			results.push(movie)
		}
	})

	return results
}

export const GetPopularMovies = async (page: number) => {
	const url = `${API_URL_BASE}/movie/popular?language=${LANGUAGE_MX}&region=MX&page=${page}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IMovieResponse
	return data
}

export const GetTopRatedMovies = async (page: number) => {
	const url = `${API_URL_BASE}/movie/top_rated?language=${LANGUAGE_MX}&region=MX&page=${page}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IMovieResponse
	return data
}

export const GetUpcomingMovies = async (page: number) => {
	const url = `${API_URL_BASE}/movie/upcoming?language=${LANGUAGE_MX}&region=MX&page=${page}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IMovieResponse
	return data
}

export const GetSearchMovies = async (type: 'movie' | 'tv' | 'person' | 'multi', queryParams: IQueryParamasMovies) => {
	const params = Object.entries(queryParams)
	let stringParams = ""
	params.forEach((param, index) => {
		stringParams += `${"&"}${param[0]}=${param[1]}`
	})

	const url = `${API_URL_BASE}/search/${type}?language=${LANGUAGE_MX}&region=MX${stringParams}`
	const response = await fetch(url, optionsGET)

	let data: IMovieResponse = { page: 0, results: [], total_pages: 0, total_results: 0 }
	if (response.status === 400) {
		return data
	} else {
		data = (await response.json()) as IMovieResponse
	}
	return data
}

export const GetDiscoverMovies = async (queryParams: IQueryParamasMovies) => {
	const params = Object.entries(queryParams)
	let stringParams = ""
	params.forEach((param, index) => {
		stringParams += `${"&"}${param[0]}=${param[1]}`
	})

	const url = `${API_URL_BASE}/discover/movie?language=${LANGUAGE_MX}&region=MX&certification_country=MX${stringParams}`
	const response = await fetch(url, optionsGET)

	let data: IMovieResponse = { page: 0, results: [], total_pages: 0, total_results: 0 }

	if (response.status === 200) {
		data = (await response.json()) as IMovieResponse
	} else {
		return data
	}
	return data
}


export const GetSeriesAiringToday = async () => {
	const url = `${API_URL_BASE}/tv/airing_today?language=${LANGUAGE_MX}&region=MX`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IAiringTodayResponse
	const numberRandoms: number[] = []

	do {
		const random = Math.floor(Math.random() * 20)
		if (!numberRandoms.includes(random)) {
			numberRandoms.push(random)
		}
	} while (numberRandoms.length < 10)

	const results: ISerie[] = []

	data.results.forEach((serie, index) => {
		if (numberRandoms.includes(index)) {
			results.push(serie)
		}
	})

	return results
}

export const GetTopRatedSeries = async (page: number) => {
	const url = `${API_URL_BASE}/movie/top_rated?language=${LANGUAGE_MX}&region=MX&page=${page}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IMovieResponse
	return data
}

export const GetDiscoverSeries = async (queryParams: IQueryParamasSeries) => {
	const params = Object.entries(queryParams)
	let stringParams = ""
	params.forEach((param, index) => {
		stringParams += `${"&"}${param[0]}=${param[1]}`
	})

	const url = `${API_URL_BASE}/discover/tv?language=${LANGUAGE_MX}&region=MX${stringParams}`
	const response = await fetch(url, optionsGET)

	let data: ISerieResponse = { page: 0, results: [], total_pages: 0, total_results: 0 }
	if (response.status === 400) {
		return data
	} else {
		data = (await response.json()) as ISerieResponse
	}

	return data
}

export const GetSearchSeries = async (queryParams: IQueryParamasSeries) => {
	const params = Object.entries(queryParams)
	let stringParams = ""
	params.forEach((param, index) => {
		stringParams += `${"&"}${param[0]}=${param[1]}`
	})

	const url = `${API_URL_BASE}/search/tv?language=${LANGUAGE_MX}&region=MX${stringParams}`
	const response = await fetch(url, optionsGET)

	let data: ISerieResponse = { page: 0, results: [], total_pages: 0, total_results: 0 }
	if (response.status === 400) {
		return data
	} else {
		data = (await response.json())
	}

	return data
}

export const GetSearchPeople = async (queryParams: IQueryParamasSeries) => {
	const params = Object.entries(queryParams)
	let stringParams = ""
	params.forEach((param, index) => {
		stringParams += `${"&"}${param[0]}=${param[1]}`
	})

	const url = `${API_URL_BASE}/search/person?language=${LANGUAGE_MX}&include_adult=true${stringParams}`
	const response = await fetch(url, optionsGET)

	let data: IPeopleResponse = { page: 0, results: [], total_pages: 0, total_results: 0 }
	if (response.status === 400) {
		return data
	} else {
		data = (await response.json())
	}

	return data
}


export const GetSearchMulti = async (queryParams: IQueryParamasSeries) => {
	const params = Object.entries(queryParams)
	let stringParams = ""
	params.forEach((param, index) => {
		stringParams += `${"&"}${param[0]}=${param[1]}`
	})

	const url = `${API_URL_BASE}/search/multi?language=${LANGUAGE_MX}&include_adult=true${stringParams}`
	const response = await fetch(url, optionsGET)

	let data: IMultiResponse = { page: 0, results: [], total_pages: 0, total_results: 0 }
	if (response.status === 200) {
		data = (await response.json())
	}

	return data
}



export const GetPeoplePopular = async (page: number) => {
	const url = `${API_URL_BASE}/person/popular?language=${LANGUAGE_MX}&page=${page}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IPeopleResponse
	return data
}

export const GetMovieDetails = async (idMovie: string) => {
	const url = `${API_URL_BASE}${DETAILS_MOVIES_PATH}${idMovie}?language=${LANGUAGE_MX}&append_to_response=credits,recommendations,images,keywords`
	const response = await fetch(url, optionsGET)
	let data: IMovieDetails | null = null
	if (response.status === 200) {
		return (await response.json()) as IMovieDetails
	}

	return data
}

export const GetCredits = async (idMovie: string) => {
	const url = `${API_URL_BASE}${DETAILS_MOVIES_PATH}${idMovie}/credits?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	let data: ICredits | null = null
	if (response.status === 200) {
		return (await response.json()) as ICredits
	}

	return data
}

export const GetMovieImages = async (idMovie: string) => {
	const url = `${API_URL_BASE}/movie/${idMovie}/images?`
	const response = await fetch(url, optionsGET)
	let data: IImages | null = null
	if (response.status === 200) {
		return (await response.json()) as IImages
	}

	return data
}

export const GetSeriesKeywords = async (idMovie: string) => {
	const url = `${API_URL_BASE}/tv/${idMovie}/keywords?`
	const response = await fetch(url, optionsGET)
	let data: IKeywords | null = null
	if (response.status === 200) {
		return (await response.json()) as IKeywords
	}

	return data
}

export const GetMovieKeywords = async (idMovie: string) => {
	const url = `${API_URL_BASE}/movie/${idMovie}/keywords`
	const response = await fetch(url, optionsGET)
	let data: IKeywords | null = null
	if (response.status === 200) {
		return (await response.json()) as IKeywords
	}

	return data
}

export const GetSeriesImages = async (idMovie: string) => {
	const url = `${API_URL_BASE}/tv/${idMovie}/images?`
	const response = await fetch(url, optionsGET)
	let data: IImages | null = null
	if (response.status === 200) {
		return (await response.json()) as IImages
	}

	return data
}

export const GetCollectionsDetails = async (idCollection: string) => {
	const url = `${API_URL_BASE}${DETAILS_COLLECTION_PATH}${idCollection}?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	let data: ICollectionDetails | null = null
	if (response.status === 200) {
		return (await response.json()) as ICollectionDetails
	}

	return data
}

export const GetRecommendations = async (idMovie: string) => {
	const url = `${API_URL_BASE}${DETAILS_MOVIES_PATH}${idMovie}/recommendations?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	let data: IRecommendationResponse | null = null
	if (response.status === 200) {
		return (await response.json()) as IRecommendationResponse
	}

	return data
}

//------SERIES-------//
export const GetSerieDetails = async (idSerie: string) => {
	const url = `${API_URL_BASE}${DETAILS_SERIES_PATH}${idSerie}?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	let data: ISerieDetails | null = null
	if (response.status === 200) {
		return (await response.json()) as ISerieDetails
	}
	return data
}

export const GetSerieCredits = async (idMovie: string) => {
	const url = `${API_URL_BASE}${DETAILS_SERIES_PATH}${idMovie}/credits?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	let data: ICredits | null = null
	if (response.status === 200) {
		return (await response.json()) as ICredits
	}
	return data
}

export const GetSerieRecommendations = async (idMovie: string) => {
	const url = `${API_URL_BASE}${DETAILS_SERIES_PATH}${idMovie}/recommendations?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	let data: IRecommendationResponse | null = null
	if (response.status === 200) {
		return (await response.json()) as IRecommendationResponse
	}

	return data
}

export const GetSeasonDetails = async (idSerie: string, season: number) => {
	const url = `${API_URL_BASE}${DETAILS_SERIES_PATH}${idSerie}/season/${season}?language=${LANGUAGE_ES}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as ISeasonDetails
	return data
}

export const GetPersonDetails = async (idPeople: string, language: 'ES' | 'EN') => {
	let LANGUAGE = language === "ES" ? LANGUAGE_ES : LANGUAGE_EN
	const url = `${API_URL_BASE}/person/${idPeople}?language=${LANGUAGE}&append_to_response=movie_credits%2Ctv_credits`
	const response = await fetch(url, optionsGET)
	let data: IPeopleDetails | null = null
	if (response.status === 200) {
		return (await response.json()) as IPeopleDetails
	}

	return data
}

export const GetMoviesCredits = async (idPeople: string) => {
	const url = `${API_URL_BASE}/person/${idPeople}/movie_credits?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	let data: IMovieCredits | null = null
	if (response.status === 200) {
		return (await response.json()) as IMovieCredits
	}

	return data
}

export const GetKeywordName = async (id_tag: string) => {
	const url = `${API_URL_BASE}/keyword/${id_tag}`
	const response = await fetch(url, optionsGET)
	let data: IResult | null = null
	if (response.status === 200) {
		return (await response.json()) as IResult
	}

	return data
}

export const GetSeriesCredits = async (idPeople: string) => {
	const url = `${API_URL_BASE}/person/${idPeople}/tv_credits?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	let data: ISerieCredits | null = null
	if (response.status === 200) {
		return (await response.json()) as ISerieCredits
	}

	return data
}

export const GetPeopleImages = async (idPeople: string) => {
	const url = `${API_URL_BASE}/person/${idPeople}/images`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IPeopleImages
	return data
}

/////------ AUTHENTICATION FUNCTIONS ------- \\\\\\

export const CreateRequestToken = async () => {
	const url = `${API_URL_BASE}/authentication/token/new`
	const response = await fetch(url, optionsGET)
	if (response.ok) {
		const data: IRequestToken = await response.json()
		return data
	}


	const data: IErrorLogin = await response.json()
	return data

}

export const CreateSeassonID = async (request_token: string) => {

	const url = `${API_URL_BASE}/authentication/session/new`
	const response = await fetch(url, {
		method: "POST",
		headers: {
			accept: "application/json",
			'content-type': 'application/json',
			Authorization: `Bearer ${API_KEY}`,
		},
		body: JSON.stringify({ request_token })
	})
	const data: ISessionID = await response.json()

	return data
}

export const CreateSession = async (username: string, password: string) => {

	const responseToken = await CreateRequestToken()

	if (responseToken.success) {
		const successToke = responseToken as IRequestToken
		const url = `${API_URL_BASE}/authentication/token/validate_with_login`
		const response = await fetch(url, {
			method: "POST",
			headers: {
				accept: "application/json",
				'content-type': 'application/json',
				Authorization: `Bearer ${API_KEY}`,
			},
			body: JSON.stringify({
				username,
				password,
				request_token: successToke.request_token
			})
		})

		const data: ILoginValidation | IErrorLogin = await response.json()


		if (data.success) {
			const succesresponse: ILoginValidation = data as ILoginValidation
			const responseValidate = await CreateSeassonID(succesresponse.request_token)

			return responseValidate
		}

		return data as IErrorLogin
	}

	const errorResponse = responseToken as IErrorLogin

	return errorResponse
}

export const GetDetailsAccount = async (session_id: string) => {
	const url = `${API_URL_BASE}/account/18482247?session_id=${session_id}`
	const response = await fetch(url, optionsGET)
	let data: IUser | null = null
	if (response.status === 200) {
		return (await response.json()) as IUser
	}
	return data
}

export const GetStatesMovie = async (session_id: string, movie_id: number) => {
	const url = `${API_URL_BASE}/movie/${movie_id}/account_states?session_id=${session_id}`
	const response = await fetch(url, optionsGET)
	let data: IMovieStates | null = null
	if (response.status === 200) {
		return (await response.json()) as IMovieStates
	}
	return data
}

export const GetStatesSerie = async (session_id: string, serie_id: number) => {
	const url = `${API_URL_BASE}/tv/${serie_id}/account_states?session_id=${session_id}`
	const response = await fetch(url, optionsGET)
	let data: ISerieStates | null = null
	if (response.status === 200) {
		return (await response.json()) as ISerieStates
	}
	return data
}

export const GetFavoriteMovies = async (session_id: string, page: string) => {
	const url = `${API_URL_BASE}/account/18482247/favorite/movies?language=${LANGUAGE_MX}&session_id=${session_id}&page=${page}`
	const response = await fetch(url, {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
		next: { revalidate: 10000, tags: ['favoriteMovies'] },
	})
	let data: IMovieResponse | null = null
	if (response.status === 200) {
		return (await response.json()) as IMovieResponse
	}
	return data
}

export const GetFavoriteSeries = async (session_id: string, page: string) => {
	const url = `${API_URL_BASE}/account/18482247/favorite/tv?language=${LANGUAGE_MX}&session_id=${session_id}&page=${page}`
	const response = await fetch(url, {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
		next: { revalidate: 10000, tags: ['favoriteSeries'] },
	})
	let data: ISerieResponse | null = null
	if (response.status === 200) {
		return (await response.json()) as ISerieResponse
	}

	return data
}

export const AddRemoveFavorite = async (session_id: string, type: 'movie' | 'tv', id: number, isAdd: boolean): Promise<IFavorites | IErrorLogin> => {
	const url = `${API_URL_BASE}/account/18482247/favorite?session_id=${session_id}`

	const response = await fetch(url, {
		method: "POST",
		headers: {
			accept: "application/json",
			'content-type': 'application/json',
			Authorization: `Bearer ${API_KEY}`,
		},
		body: JSON.stringify({
			media_type: type,
			media_id: id,
			favorite: isAdd
		})
	})
	if (response.status === 200) {
		const data: IFavorites = await response.json()
		return data
	}

	const data: IErrorLogin = await response.json()
	return data
}


export const GetListMovies = async (session_id: string, queryParams: Object) => {
	const params = Object.entries(queryParams)
	let stringParams = ""
	params.forEach((param, index) => {
		stringParams += `${"&"}${param[0]}=${param[1]}`
	})
	const url = `${API_URL_BASE}/account/18482247/lists?session_id=${session_id}${stringParams}`
	const response = await fetch(url, {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
		next: { revalidate: 1, tags: ['listMovies'] },
	})
	let data: IResponseListMovie | null = null
	if (response.status === 200) {
		return (await response.json()) as IResponseListMovie
	}

	return data
}

export const CreateLisMovie = async (session_id: string, name: string, description: string) => {
	const url = `${API_URL_BASE}/list?session_id=${session_id}`
	const response = await fetch(url, {
		method: "POST",
		headers: {
			accept: "application/json",
			'content-type': 'application/json',
			Authorization: `Bearer ${API_KEY}`,
		},
		body: JSON.stringify({
			name,
			description,
			language: 'es'
		})
	})

	let data: IResponseCreateMovie | null = null
	if (response.status === 201) {
		return (await response.json()) as IResponseCreateMovie
	}

	return data
}


export const GetExternalIDs = async (movie_id: number) => {
	const url = `${API_URL_BASE}/movie/${movie_id}/external_ids`
	console.log(url)
	const response = await fetch(url, {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${API_KEY}`,
		}
	})
	console.log(response)
	let data: IExternalIDs | null = null
	if (response.status === 200) {
		const result = (await response.json()) as IExternalIDs
		console.log(result)
		return result
	}
	return data
}
