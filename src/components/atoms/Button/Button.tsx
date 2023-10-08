import React from 'react'
import styles from './Button.module.css'
type Props = {
    onClick: () => void;
    text: string;
    disabled?: boolean
}
export const Button: React.FC<Props> = ({ onClick, text, disabled = false }) => {
    return (
        <button className={styles['button']} onClick={onClick} disabled={disabled}>{text}</button>
    )
}