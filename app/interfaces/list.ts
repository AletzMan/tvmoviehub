export interface IResponseListMovie {
    page: number
    results: IListMovie[]
    total_pages: number
    total_results: number
}

export interface IListMovie {
    description: string
    favorite_count: number
    id: number
    item_count: number
    iso_639_1: string
    list_type: string
    name: string
    poster_path?: string | null
}

export interface IResponseCreateMovie {
    status_message: string,
    success: boolean,
    status_code: number,
    list_id: number
}

export interface IResponseList {
    status_code: number,
    status_message: string,
    success: boolean,
}
export interface IItemStatus {
    id: string,
    item_present: boolean,
}

export interface IListDetails {
    created_by: string
    description: string
    favorite_count: number
    id: number
    iso_639_1: string
    item_count: number
    items: IListItem[]
    name: string
    poster_path?: string | null
    page: number
    total_pages: number
    total_results: number
}

export interface IListItem {
    id: number,
    media_type: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    backdrop_path: string
    release_date: string,
    first_air_date: string,
    title: string,
    name: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}