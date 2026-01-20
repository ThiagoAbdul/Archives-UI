import { useEffect, useRef } from "react";
import { Modal } from "../../components/modal/modal";
import { useFilesFacade } from "../../hooks/useFilesFacade";
import { useLoader } from "../../contexts/LoaderContext";
import styles from './upload-file-modal.module.css'
import type { Archive } from "../../models/Archive";

type UploadFileModalProps = {
    file: File,
    onFileUploaded: (archive: Archive) => void,
    onCancel: () => void,
}

export function UploadFileModal({ file, onFileUploaded, onCancel }: UploadFileModalProps){
    const { uploadFile } = useFilesFacade()
    const { setLoading } = useLoader()
    const imageRef = useRef<HTMLImageElement | null>(null)

    async function onConfirmUpload(file: File){
        setLoading(true)
        try{
            const archive = await uploadFile(file)

            onFileUploaded(archive)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(imageRef.current){
            imageRef.current.src = URL.createObjectURL(file)
        }
    }, [file])

    return <Modal 
            title="Deseja realizar upload da imagem?"  
            primaryButtonText="Confirmar" 
            primaryAction={() => onConfirmUpload(file)}
            secondaryButtonText="Cancelar"
            secondaryAction={onCancel}>
                <img className={styles.previewImage} ref={imageRef} />
                </Modal>

}