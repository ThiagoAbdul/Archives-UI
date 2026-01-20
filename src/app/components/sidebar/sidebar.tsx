import { useRef, type ChangeEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../button/button";
import styles from './sidebar.module.css'
import { zipFileList } from "../../utils/file-utils";



type SideBarProps = {
    onClickNewFolder: () => void,
    onClickUploadFile: (file: File) => void,
    onClickArchiveFiles: (zip: Blob) => void
}

export function SideBar({ onClickNewFolder, onClickUploadFile, onClickArchiveFiles }: SideBarProps) {
    const { signOutRedirect } = useAuth()
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const inputMultipleFilesRef = useRef<HTMLInputElement | null>(null)

    function upload(ref: React.RefObject<HTMLInputElement | null>) {
        if (ref.current) {
            ref.current.value = ""
            ref.current.src = ""
            ref.current.click()

        }
    }

    function onChangeFile(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.item(0)
        if (file) onClickUploadFile(file);

    }

    function onChangeFiles(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        if (files?.length){

            zipFileList(files).then(blob => onClickArchiveFiles(blob));
        } 

    }

    return <div className={styles.sidebar}>
        <input type="file" ref={inputFileRef} hidden={true} accept="image/*" onChange={onChangeFile} />
        <input type="file" ref={inputMultipleFilesRef} hidden={true} multiple accept="image/*" onChange={onChangeFiles} />
        <Button icon="add" onClick={onClickNewFolder} > Nova pasta</Button>
        <Button icon="add" onClick={() => upload(inputFileRef)} > Upload de arquivo</Button>
        <Button icon="add" onClick={() => upload(inputMultipleFilesRef)} > Arquivar</Button>
        <Button onClick={() => signOutRedirect()} > Logout</Button>
    </div>
}