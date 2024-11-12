export interface IRequestToken {
    success: boolean,
    expires_at: Date,
    request_token: string
}

export interface ILoginValidation {
    success: boolean,
    expires_at: Date,
    request_token: string
}

export interface ISessionID {
    success: boolean,
    session_id: string
}

export interface IErrorLogin {
    success: boolean,
    status_code: number,
    status_message: string
}


export interface IResponseLogin {
    success: boolean
    status_code: number
    status_message: string
    session_id: string
    error_username: string
    error_password: string
}

export interface IUser {
    avatar: {
        gravatar: {
            hash: string
        },
        tmdb: {
            avatar_path: string | null
        }
    },
    id: number,
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    include_adult: boolean,
    username: string
}

export interface IUserSession {
    language: string
    country: string
    include_adult: boolean
    name: string
    username: string
    session_id: string
}