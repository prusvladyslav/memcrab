import { Cell } from "../../context/MatrixContext";
import _ from 'lodash'
export const generateThreeDigitRandomNumber = () => {
    return _.random(100, 999)
};

export const generateTableData = (rows: number, columns: number): Cell[][] => {
    const data: Cell[][] = [];

    const generateCell = (rowIndex: number, columnIndex: number): Cell => ({
        id: rowIndex * columns + columnIndex + 1,
        amount: generateThreeDigitRandomNumber()
    });

    for (let i = 0; i < rows; i++) {
        const rowData: Cell[] = Array.from({ length: columns }, (_, j) => generateCell(i, j));
        data.push(rowData);
    }

    return data;
};

