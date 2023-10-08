import React, { useMemo, useState } from "react";
import { Cell, useMatrixContext } from "../../../../context";
import { Button } from "../../../atoms";

type RowProps = {
    rowData: Cell[];
    rowIndex: number;
    onCellHover: (colIndex: number) => void;
    onCellUnhover: () => void;
    nearestCells: Cell[];
};

export const Row: React.FC<RowProps> = ({
    rowData,
    rowIndex,
    onCellHover,
    onCellUnhover,
    nearestCells,
}) => {
    const { setTableSize, tableData, setTableData } = useMatrixContext();

    const handleRemoveRow = (rowIndexToRemove: number) => {
        const newData = tableData.filter((_, index) => index !== rowIndexToRemove);
        setTableSize((prev) => ({
            ...prev,
            rows: prev.rows as number - 1,
        }));
        setTableData(newData);
    };

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        const newData = [...tableData];
        newData[rowIndex][colIndex].amount += 1;
        setTableData(newData);
    };

    const [showPercentage, setShowPercentage] = useState(false);

    const rowSum = useMemo(() => rowData.reduce((acc, cell) => acc + cell.amount, 0), [rowData])

    const handleHover = () => {
        setShowPercentage(true);
    };

    const handleLeave = () => {
        setShowPercentage(false);
    };

    const percentageValue = (amount: number) => ((amount / rowSum) * 100).toFixed(2);

    return (
        <tr>
            <td>
                <p>Row {rowIndex + 1}</p>
            </td>
            {rowData.map((cell, colIndex) => {
                const { amount } = cell;
                return (
                    <td
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        onMouseEnter={() => onCellHover(colIndex)}
                        onMouseLeave={() => onCellUnhover()}
                        key={cell.id}
                        style={{
                            backgroundColor: nearestCells.includes(cell) ? 'lightblue' : 'transparent',
                            backgroundImage: showPercentage
                                ? `linear-gradient(to bottom, lightblue ${(amount / rowSum) * 100}%, transparent ${(amount / rowSum) * 100}%)`
                                : 'none',
                        }}
                    >
                        <div>
                            <p
                                style={{ cursor: 'pointer' }}
                            >
                                {showPercentage ? `${percentageValue(amount)}%` : amount}
                            </p>
                        </div>
                    </td>
                );
            })}
            <td
                onMouseEnter={() => handleHover()}
                onMouseLeave={() => handleLeave()}
            >
                <p>
                    {rowSum}
                </p>
            </td>
            <td>
                <Button onClick={() => handleRemoveRow(rowIndex)} disabled={tableData.length === 1} text="Remove row" />
            </td>
        </tr>
    );
};
