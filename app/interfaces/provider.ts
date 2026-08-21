export interface IProvider {
    display_priority: number
    logo_path: string
    provider_id: number
    provider_name: string
}

export interface IWatchProvidersRegion {
    link: string
    flatrate?: IProvider[]
    rent?: IProvider[]
    buy?: IProvider[]
    ads?: IProvider[]
    free?: IProvider[]
}