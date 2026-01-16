import { v4 } from "uuid";
import { getAwsCredentialsProvider } from "../utils/aws-utils";
import { useAuth } from "./useAuth";
import { useS3 } from "./useS3";
import { useArchive } from "./useArchive";

export function useFilesFacade(){

    const { getObject, putObject } = useS3()

    const { createFile } = useArchive()

    const { idToken } = useAuth()

    
    async function getFile(fileId: string){
        const credentials = await getAwsCredentialsProvider(idToken!)()
        return getObject({
            idToken: idToken!,
            bucket: import.meta.env.VITE_BUCKET_NAME,
            key: `users/${credentials.identityId}/${fileId}`
        })
    }

    async function uploadFile(file: File) {
        const fileId = v4()
        const credentials = await getAwsCredentialsProvider(idToken!)()
        await putObject({ 
            idToken: idToken!,
            bucket: import.meta.env.VITE_BUCKET_NAME,
            key: `users/${credentials.identityId}/${fileId}`,
            file
         })

         await createFile({
            ArchiveId: fileId,
            ArchiveType: 1,
            Name: file.name,

         })

        return fileId
    }

    return { getFile, uploadFile }
}