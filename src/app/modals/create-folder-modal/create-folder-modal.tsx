import { useState } from "react"
import { Input } from "../../components/input/input"
import { Modal } from "../../components/modal/modal"
import { useLoader } from "../../contexts/LoaderContext"
import { useArchive } from "../../hooks/useArchive"


type CreateFolderModalProps = {
    onCreateFolder: () => void,
    onCancel: () => void
}
export function CreateFolderModal({ onCreateFolder, onCancel }: CreateFolderModalProps) {
    const { setLoading } = useLoader()
      const { createFolder } = useArchive()
    

    const [folderName, setFolderName] = useState("")
    return <Modal
        title='Criar nova pasta'
        primaryButtonText='Criar'
        primaryAction={async () => {
            setLoading(true)
            try {
                await createFolder(folderName)
                setFolderName("")
                onCreateFolder()
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }}
        secondaryButtonText='Cancelar'
        secondaryAction={() => {
            onCancel()
            setFolderName("")
        }
        } >
        <Input label='Nome da pasta' value={folderName} onChange={e => setFolderName(e.target.value)} />
    </Modal>
}