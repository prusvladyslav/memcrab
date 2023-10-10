import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useMatrixContext } from '../../context';
import { Button, NumberInput } from '../atoms';
import { generateTableData } from './helpers';
import styles from './MatrixGenerator.module.css';

export const MatrixGenerator: React.FC = () => {
    const { tableSize, setTableSize, setTableData, highlightAmount, setHighlightAmount } = useMatrixContext();
    const { rows, columns } = tableSize;
    const defaultButtonPosition = { top: 140, left: 30 }
    const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number }>(defaultButtonPosition);

    const handleTableSizeChange = (key: 'rows' | 'columns', value: number) => {
        setTableSize((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleHighlightAmountChange = (value: number) => {
        setHighlightAmount(value)
    }

    const maxAmountToHighlight = rows && columns ? (rows * columns) - 1 : 0

    const isInputsValid: boolean = !!(rows && rows <= 99 && columns && columns <= 99 && highlightAmount && highlightAmount <= maxAmountToHighlight)

    useEffect(() => {
        if (isInputsValid) setButtonPosition(defaultButtonPosition)
    }, [isInputsValid])

    const handleGenerateMatrix = () => {
        if (!isInputsValid) return
        setTableData(generateTableData(rows as number, columns as number))
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleGenerateMatrix();
        }
    };

    // Best UX practice 
    const runAway = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isInputsValid) return
        setButtonPosition({
            top: e.clientY + _.random(-50, 50),
            left: e.clientX + _.random(-50, 50),
        })
    }

    return (
        <div className={styles['matrix-generator-container']} onKeyDown={handleKeyPress} tabIndex={0}>
            <div className={styles['input-container']}>
                <label className={styles['input-label']} htmlFor="rows">
                    Amount of Rows (1-99):
                </label>
                <NumberInput value={rows} onChange={(value) => handleTableSizeChange('rows', value)} />
            </div>
            <div className={styles['input-container']}>
                <label className={styles['input-label']} htmlFor="columns">
                    Amount of Columns (1-99):
                </label>
                <NumberInput value={columns} onChange={(value) => handleTableSizeChange('columns', value)} />
            </div>
            <div className={styles['input-container']}>
                <label className={styles['input-label']} htmlFor="columns">
                    Amount of Highlighted cells ({!maxAmountToHighlight ? 'fill rows & columns first' : `1-${maxAmountToHighlight}`}):
                </label>
                <NumberInput value={highlightAmount} onChange={(value) => handleHighlightAmountChange(value)} />
            </div>
            <Button
                onClick={() => handleGenerateMatrix()}
                // worst UX practice
                // disabled={!isInputsValid}
                text="Generate"
                onMouseEnter={runAway}
                style={{ ...buttonPosition, position: 'absolute' }}
            />
        </div>
    );
};
