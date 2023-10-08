import React from 'react';
import styles from './NumberInput.module.css'

type Props = {
    value?: number;
    onChange: (value: number) => void;
};

export const NumberInput: React.FC<Props> = ({ value, onChange }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = parseInt(inputValue, 10);
        if (!isNaN(numericValue)) {
            onChange(numericValue);
        } else {
            onChange(0);
        }
    };

    return (
        <input
            className={styles['input-field']}
            type="text"
            pattern="[0-9]*"
            value={value ? value.toString() : ''}
            onChange={handleInputChange}
        />
    );
};
