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
