import type { Archive as ArchiveResponse } from '../../models/Archive'
import { FaFolder } from 'react-icons/fa'  
import { FaImage } from 'react-icons/fa'  

type ArchiveProps = {
    onClick: () => void
} & ArchiveResponse
import styles from './archive.module.css'

export function Archive({ Name, onClick, Type } : ArchiveProps){
    return <div className={styles.folder} onClick={_ => onClick()} >
        <p>{ Name }</p>
        <hr />
        { Type == 0? <FaFolder/> : <FaImage/> }
    </div>
}