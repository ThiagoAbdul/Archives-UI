import type { InputHTMLAttributes } from "react"
import styles from './input.module.css'

type InputProps = {
    label?: string,

} & InputHTMLAttributes<HTMLInputElement>

export function Input({ label, ...props }: InputProps){
    return <div className={styles.inputContainer}>
        { label && <label htmlFor="">{ label }</label> }
        <input className={ styles.input } { ...props }/>
    </div>
}