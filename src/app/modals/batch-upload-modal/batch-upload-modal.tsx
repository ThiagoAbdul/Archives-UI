import { useState } from "react";
import { Input } from "../../components/input/input";
import { Modal } from "../../components/modal/modal";
import { FileTypes } from "../../consts/file-types";
import { useLoader } from "../../contexts/LoaderContext";
import { useFilesFacade } from "../../hooks/useFilesFacade";

type BatchUploadModalProps = {
    onCancel: () => void
    onUpload: () => void,
    zip: Blob
}

export function BatchUploadModal({ onCancel, onUpload, zip }: BatchUploadModalProps) {

    const { uploadBlob } = useFilesFacade()
    const { setLoading } = useLoader()
    const [zipName, setZipName] = useState<string>("")    

    return <Modal
    title="Upload de arquivos"
    primaryButtonText="Confirmar" primaryAction={async () => {
        setLoading(true)
        try{
            await uploadBlob(zipName, zip, FileTypes.ZIP)
            onUpload()
        }
        finally{
            setLoading(false)
        }
    }}
    secondaryButtonText="Cancelar" secondaryAction={onCancel}
     >
        <Input label="Nome do zip" value={zipName} onChange={e => setZipName(e.target.value)} />
    </Modal>
}