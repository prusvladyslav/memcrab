import React, { useState } from 'react';
import { useMatrixContext, Cell } from '../../context';
import { Button } from '../atoms';
import { generateThreeDigitRandomNumber } from '../MatrixGenerator/helpers';
import { Row } from './components';
import { calculateColumnAverages, findNearestCells } from './helpers';
import styles from './MatrixTable.module.css';

export const MatrixTable: React.FC = () => {
    const { tableSize, setTableSize, tableData, setTableData } = useMatrixContext();
    const columns = tableSize?.columns || 0;
    const [, setHoveredCell] = useState<{ rowIndex: number; colIndex: number } | null>(
        null
    );
    const [nearestCells, setNearestCells] = useState<Cell[]>([]);

    const handleCellHover = (rowIndex: number, colIndex: number) => {
        setHoveredCell({ rowIndex, colIndex });
        const hoveredValue = tableData[rowIndex][colIndex].amount;
        const nearest = findNearestCells(hoveredValue, 2, tableData);
        setNearestCells(nearest);
    };

    const handleCellUnhover = () => {
        setHoveredCell(null);
        setNearestCells([]);
    };

    const columnAverages = calculateColumnAverages(tableData);

    const addRow = () => {
        const newRow: Cell[] = Array.from({ length: columns }).map((_, colIndex) => ({
            id: colIndex,
            amount: generateThreeDigitRandomNumber()
        }));

        const newData = [...tableData, newRow];
        setTableSize((prev) => ({
            ...prev,
            rows: prev.rows as number + 1
        }));

        setTableData(newData);
    };

    if (tableData.length === 0) return null;

    return (
        <table className={styles['matrix-table']}>
            <tbody>
                <tr>
                    <th></th>
                    {tableData[0]?.map((_, index) => (
                        <th key={index}>
                            <p>Column {index + 1}</p>
                        </th>
                    ))}
                    <th>
                        <p>Sum values</p>
                    </th>
                </tr>
                {tableData.map((rowData, rowIndex) => (
                    <Row
                        key={`row-${rowIndex}`}
                        rowData={rowData}
                        rowIndex={rowIndex}
                        onCellHover={(colIndex) => handleCellHover(rowIndex, colIndex)}
                        onCellUnhover={handleCellUnhover}
                        nearestCells={nearestCells}
                    />
                ))}
                <tr>
                    <td>
                        <p>Average</p>
                    </td>
                    {columnAverages.map((avg, index) => (
                        <td key={index}>
                            <p>{avg}</p>
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>
                        <Button onClick={addRow} disabled={tableData.length === 100} text='Add row' />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
