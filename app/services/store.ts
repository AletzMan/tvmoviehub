import { create } from "zustand"

interface ILoadingState {
    loadingState: boolean
    setLoadingState: (value: boolean) => void
}

export const useLoadingState = create<ILoadingState>(
    (set) => ({
        loadingState: false,
        setLoadingState: (value: boolean) =>
            set((state) => ({
                loadingState: value,
            }))
    })
)


interface IVideoState {
    videoState: boolean
    setVideoState: (value: boolean) => void
    videoType: 'movie' | 'tv'
    setVideoType: (value: 'movie' | 'tv') => void
    video: string
    setVideo: (value: string) => void
    id: number
    setID: (value: number) => void
}

export const useVideo = create<IVideoState>(
    (set) => ({
        videoState: false,
        setVideoState: (value: boolean) =>
            set((state) => ({
                videoState: value,
            })),
        videoType: 'movie',
        setVideoType: (value: 'movie' | 'tv') =>
            set((state) => ({
                videoType: value,
            })),
        id: 0,
        setID: (value: number) =>
            set((state) => ({
                id: value,
            })),
        video: "",
        setVideo: (value: string) =>
            set((state) => ({
                video: value,
            }))
    })
)

