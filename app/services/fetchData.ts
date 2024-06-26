import { ICredits, IMovieCredits, ISerieCredits } from "../interfaces/credits"
import { ICollectionDetails, IMovie, IMovieDetails } from "../interfaces/movie"
import { IPeopleDetails, IPeopleImages } from "../interfaces/people"
import { IAiringTodayResponse, IMovieResponse, INowPlayingResponse, IPopularPeopleResponse, IRecommendationResponse } from "../interfaces/responses"
import { ISeasonDetails, ISerie, ISerieDetails } from "../interfaces/serie"

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

export const GetPopularMovies = async () => {
	const url = `${API_URL_BASE}/movie/popular?language=${LANGUAGE_MX}&region=MX`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IMovieResponse
	return data
}

export const GetTopRatedMovies = async () => {
	const url = `${API_URL_BASE}/movie/top_rated?language=${LANGUAGE_MX}&region=MX`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IMovieResponse
	return data
}

export const GetUpcomingMovies = async () => {
	const url = `${API_URL_BASE}/movie/upcoming?language=${LANGUAGE_MX}&region=MX`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IMovieResponse
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

export const GetPeoplePopular = async () => {
	const url = `${API_URL_BASE}/person/popular?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IPopularPeopleResponse
	return data
}

export const GetMovieDetails = async (idMovie: string) => {
	const url = `${API_URL_BASE}${DETAILS_MOVIES_PATH}${idMovie}?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IMovieDetails
	return data
}

export const GetCredits = async (idMovie: string) => {
	const url = `${API_URL_BASE}${DETAILS_MOVIES_PATH}${idMovie}/credits?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as ICredits
	return data
}

export const GetCollectionsDetails = async (idCollection: string) => {
	const url = `${API_URL_BASE}${DETAILS_COLLECTION_PATH}${idCollection}?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as ICollectionDetails
	return data
}

export const GetRecommendations = async (idMovie: string) => {
	const url = `${API_URL_BASE}${DETAILS_MOVIES_PATH}${idMovie}/recommendations?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IRecommendationResponse
	return data
}

//------SERIES-------//
export const GetSerieDetails = async (idSerie: string) => {
	const url = `${API_URL_BASE}${DETAILS_SERIES_PATH}${idSerie}?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as ISerieDetails
	return data
}

export const GetSerieCredits = async (idMovie: string) => {
	const url = `${API_URL_BASE}${DETAILS_SERIES_PATH}${idMovie}/credits?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as ICredits
	return data
}

export const GetSerieRecommendations = async (idMovie: string) => {
	const url = `${API_URL_BASE}${DETAILS_SERIES_PATH}${idMovie}/recommendations?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IRecommendationResponse
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
	const url = `${API_URL_BASE}/person/${idPeople}?language=${LANGUAGE}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IPeopleDetails
	return data
}

export const GetMoviesCredits = async (idPeople: string) => {
	const url = `${API_URL_BASE}/person/${idPeople}/movie_credits?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IMovieCredits
	return data
}

export const GetSeriesCredits = async (idPeople: string) => {
	const url = `${API_URL_BASE}/person/${idPeople}/tv_credits?language=${LANGUAGE_MX}`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as ISerieCredits
	return data
}

export const GetPeopleImages = async (idPeople: string) => {
	const url = `${API_URL_BASE}/person/${idPeople}/images`
	const response = await fetch(url, optionsGET)
	const data = (await response.json()) as IPeopleImages
	return data
}