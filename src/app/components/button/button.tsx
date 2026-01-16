import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import './button.css'
import { FaPlus } from "react-icons/fa";


type ButtonVariantName = 'primary'
type ButtonIcon = "add"
type ButtonVariantStyle = CSSProperties


type ButtonProps = {
    variant?: ButtonVariantName,
    icon?: ButtonIcon
} & ButtonHTMLAttributes<HTMLButtonElement>

const variants: Record<ButtonVariantName, ButtonVariantStyle> = {
    primary: {
        backgroundColor: "white",
        color: "#111111",
        width: 'fit-content'
    }
}

const icons: Record<ButtonIcon, ReactNode> = {
    add: <FaPlus size={16} />
}

export function Button({ variant = "primary", icon, ...props }: ButtonProps) {
    return <button style={variants[variant]} {...props}>
        {icon && icons[icon]}
        {props.children}
    </button>
}