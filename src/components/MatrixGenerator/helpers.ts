import { Cell } from "../../context/MatrixContext";

export const generateThreeDigitRandomNumber = () => {
    return Math.floor(Math.random() * 900) + 100;
};

export const generateTableData = (rows: number, columns: number): Cell[][] => {
    const data = [];

    for (let i = 0; i < rows; i++) {
        const rowData = [];

        for (let j = 0; j < columns; j++) {
            const cell = {
                id: i * columns + j + 1,
                amount: generateThreeDigitRandomNumber()
            };
            rowData.push(cell);
        }

        data.push(rowData);
    }

    return data;
};
