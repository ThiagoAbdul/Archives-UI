import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getAwsCredentialsProvider } from "../utils/aws-utils";

let s3Client: S3Client | null = null;

type GetObjectProps = {
    idToken: string,
    bucket: string,
    key: string
}

type PutObjectProps = {
    file: Blob
} & GetObjectProps

export function useS3() {

    function getS3Client(idToken: string) {
        if (!s3Client) {
            s3Client = new S3Client({
                region: import.meta.env.VITE_REGION,
                credentials: getAwsCredentialsProvider(idToken)
            });
        }
        return s3Client;
    }

    async function getObject({ idToken, bucket, key } : GetObjectProps){
        var response = await getS3Client(idToken).send(new GetObjectCommand({
            Bucket: bucket,
            Key: key
        }))

        return response
    }

    async function putObject(props: PutObjectProps) {
        const arrayBuffer = await props.file.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        var response = await getS3Client(props.idToken).send(new PutObjectCommand({
            Bucket: props.bucket,
            Key: props.key,
            Body: uint8,
            ContentType: props.file.type
        }))
        
        return response
    }

    return { getObject, putObject }
}
