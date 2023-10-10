import React from 'react'
import styles from './Button.module.css'
type Props = {
    onClick: () => void;
    text: string;
    disabled?: boolean;
    style?: React.CSSProperties
    onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export const Button: React.FC<Props> = ({ onClick, text, disabled = false, style, onMouseEnter }) => {
    return (
        <button onMouseEnter={onMouseEnter} style={{ ...style }} className={styles['button']} onClick={onClick} disabled={disabled}>{text}</button>
    )
}