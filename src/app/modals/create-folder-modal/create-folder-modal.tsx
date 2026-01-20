import { useState } from "react"
import { Input } from "../../components/input/input"
import { Modal } from "../../components/modal/modal"
import { useLoader } from "../../contexts/LoaderContext"
import { useArchive } from "../../hooks/useArchive"


type Folder = {
    id: string,
    name: string
}

type CreateFolderModalProps = {
    onCreateFolder: (folder: Folder) => void,
    onCancel: () => void,
    parent?: string
}
export function CreateFolderModal({ onCreateFolder, onCancel, parent }: CreateFolderModalProps) {
    const { setLoading } = useLoader()
      const { createFolder } = useArchive()
    

    const [folderName, setFolderName] = useState("")
    return <Modal
        title='Criar nova pasta'
        primaryButtonText='Criar'
        primaryAction={async () => {
            if(!folderName){
                alert("Nome da pasta é obrigatório")
                return
            }
            setLoading(true)
            try {
                var folderId = await createFolder(folderName, parent)
                onCreateFolder({ id: folderId, name: folderName })
                setFolderName("")

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