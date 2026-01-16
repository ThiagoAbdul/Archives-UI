import { useRef, type ChangeEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../button/button"; 
import './sidebar.css';



type SideBarProps = {
    onClickNewFolder: () => void,
    onClickUploadFile: (file: File) => void
}

export function SideBar({ onClickNewFolder, onClickUploadFile}: SideBarProps){
    const { signOutRedirect } = useAuth()
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    function upload() {
        if(inputFileRef.current){
            inputFileRef.current.value = ""
            inputFileRef.current.src = ""
            inputFileRef.current.click()

        }
    }

    function onChangeFile(event: ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.item(0)
        console.log("Foi")
        if(file) onClickUploadFile(file);
        event.target.src = undefined!
        
    }  

    return <div className="sidebar">
        <input type="file" ref={inputFileRef} hidden={true} accept="image/*" onChange={onChangeFile} />
        <Button icon="add" onClick={ onClickNewFolder } > Nova pasta</Button>
        <Button icon="add" onClick={ () => upload() } > Upload de arquivo</Button>
        <Button onClick={  () => signOutRedirect() } > Logout</Button>
    </div>
}