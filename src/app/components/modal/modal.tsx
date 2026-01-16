import type { ReactNode } from "react"
import styles from './modal.module.css'
import { Button } from "../button/button"

type ModalProps = {
    title: string,
    children: ReactNode,
    primaryButtonText: string,
    secondaryButtonText?: string,
    primaryAction: () => void,
    secondaryAction?: () => void,
}

export function Modal(props: ModalProps) {
    return <div className={styles.modalContainer}>
        <div className={styles.modal}>
            <h2 style={{ display: "flex", justifyContent: "center", width: "100%" }}>{props.title}</h2>
            <div className={styles.content}>{ props.children }</div>
            <div className={ styles.buttonsContainer }>
                { props.secondaryButtonText && <Button onClick={ props.secondaryAction } >{ props.secondaryButtonText }</Button> }
                <Button onClick={ props.primaryAction }>{ props.primaryButtonText }</Button>
            </div>
        </div>
    </div>
}