import React from 'react';
import { useMatrixContext } from '../../context';
import { Button, NumberInput } from '../atoms';
import { generateTableData } from './helpers';
import styles from './MatrixGenerator.module.css';

export const MatrixGenerator: React.FC = () => {
    const { tableSize, setTableSize, setTableData } = useMatrixContext();
    const { rows, columns } = tableSize;

    const handleInputChange = (key: 'rows' | 'columns', value: number) => {
        setTableSize((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const isInputsValid = rows && rows <= 100 && columns && columns <= 100;

    const handleGenerateMatrix = () => {
        if (isInputsValid) setTableData(generateTableData(rows, columns));
    };

    return (
        <div className={styles['matrix-generator-container']}>
            <div className={styles['input-container']}>
                <label className={styles['input-label']} htmlFor="rows">
                    Amount of Rows (0-100):
                </label>
                <NumberInput value={rows} onChange={(value) => handleInputChange('rows', value)} />
            </div>
            <div className={styles['input-container']}>
                <label className={styles['input-label']} htmlFor="columns">
                    Amount of Columns (0-100):
                </label>
                <NumberInput value={columns} onChange={(value) => handleInputChange('columns', value)} />
            </div>
            <Button
                onClick={() => handleGenerateMatrix()}
                disabled={!isInputsValid}
                text="Generate"
            />
        </div>
    );
};
