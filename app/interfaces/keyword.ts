export interface IKeywords {
    id: number
    results?: Result[]
    keywords?: Result[]
}


export interface Result {
    name: string
    id: number
}
