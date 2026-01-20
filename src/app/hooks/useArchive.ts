import axios from "axios"
import type { Archive } from "../models/Archive"
import { useAuth } from "./useAuth"
import { useState } from "react"



const archivesCache = new Map<string, Archive[]>()

export function useArchive() {

    const { accessToken } = useAuth()

    const [archives, setArchives] = useState<Archive[]>()

    const directoryApi = axios.create({
        baseURL: import.meta.env.VITE_DIRECTORY_API
    })


    directoryApi.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    })



    async function listArchives(parent?: string): Promise<Archive[]> {
        // const cache = archivesCache.get(parent ?? "")
        // if(cache) return cache
        const url = parent? `?parent=${parent}` : "/"
        const response = await directoryApi.get<Archive[]>(url)

        setArchives(() => response.data)

        archivesCache.set(parent ?? "", response.data)

        return response.data

    }

    async function createFolder(name: string, parent?: string) {
        var response = await directoryApi.post<string>("/folder", {
            Name: name,
            Parent: parent
        })

        archivesCache.delete(parent ?? "")

        return response.data
    }


    async function createFile(command: CreateFileCommand) {
        var response = await directoryApi.post<string>("/file", command)

        archivesCache.delete(command.Parent ?? "")

        return response.data


    }

    return { listArchives, archives, createFolder, createFile, setArchives }

}

type CreateFileCommand = {
    ArchiveId: string,
    Name: string,
    ArchiveType: number
    Parent?: string
}