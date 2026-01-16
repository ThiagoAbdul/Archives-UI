import { createContext, useContext, useState, type ReactNode } from "react"

type LoaderProviderProps = {
    children: ReactNode
}
const LoaderContext = createContext<LoaderContextData>({} as LoaderContextData)

type LoaderContextData = {
    loading: boolean,
    setLoading: (value: boolean) => void
}

export function LoaderProvider({ children }: LoaderProviderProps){

    const [loading, setLoading] = useState(false)

    return <LoaderContext.Provider value={{ loading, setLoading }}>
        { children }
    </LoaderContext.Provider>
}

export function useLoader(){

    const context = useContext(LoaderContext)

    return context
}