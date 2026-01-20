import type { Archive as ArchiveResponse } from '../../models/Archive'
import { FaFolder } from 'react-icons/fa'  
import { FaImage } from 'react-icons/fa'  

type ArchiveProps = {
    onClick: () => void
} & ArchiveResponse
import styles from './archive.module.css'
import { FaFileZipper } from 'react-icons/fa6'

export function Archive({ Name, onClick, Type } : ArchiveProps){
        function archiveIcon(){
            switch(Type){
                case 0:
                    return <FaFolder/>
                case 1: return <FaImage/>

                case 3:
                    return <FaFileZipper/>
            }
        }

        const icon = archiveIcon()
    return <div className={styles.folder} onClick={_ => onClick()} >
        {  icon }
        <p>{ Name }</p>
    </div>
}
