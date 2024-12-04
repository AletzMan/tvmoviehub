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