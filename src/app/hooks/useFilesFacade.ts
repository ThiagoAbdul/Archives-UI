import { v4 } from "uuid";
import { getAwsCredentialsProvider } from "../utils/aws-utils";
import { useAuth } from "./useAuth";
import { useS3 } from "./useS3";
import { useArchive } from "./useArchive";
import type { Archive } from "../models/Archive";
import { useParams } from "react-router-dom";

export function useFilesFacade(){

    const { getObject, putObject } = useS3()

    const { createFile } = useArchive()

    const { idToken, sub } = useAuth()

    const { folder } = useParams()

    
    async function getFile(fileId: string){
        const credentials = await getAwsCredentialsProvider(idToken!)()
        return getObject({
            idToken: idToken!,
            bucket: import.meta.env.VITE_BUCKET_NAME,
            key: `users/${credentials.identityId}/${fileId}`,
        })
    }

    async function uploadFile(file: File) {

        return uploadBlob(file.name, file, getFileTypeEnum(file))
    }

        async function uploadBlob(name: string, blob: Blob, type: number): Promise<Archive> {
        const fileId = v4()
        const credentials = await getAwsCredentialsProvider(idToken!)()
        await putObject({ 
            idToken: idToken!,
            bucket: import.meta.env.VITE_BUCKET_NAME,
            key: `users/${credentials.identityId}/${fileId}`,
            file: blob
         })

         await createFile({
            ArchiveId: fileId,
            ArchiveType: type,
            Name: name,
            Parent: folder

         })

        return {
            ArchiveId: fileId,
            Favorite: false,
            Name: name,
            Type: type,
            UserId: sub!,
            Parent: folder
        }
    }

    return { getFile, uploadFile, uploadBlob }
}


function getFileTypeEnum(file: File){
  const mime = file.type

  if(mime.includes("image"))
    return 1
  return 1
}

