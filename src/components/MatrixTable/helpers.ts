import { Cell } from "../../context/MatrixContext";

export const findNearestCells = (
  hoveredValue: number,
  maxCount: number,
  tableData: Cell[][]
) => {
  const flatData = tableData.flat();

  flatData.sort((a, b) => Math.abs(a.amount - hoveredValue) - Math.abs(b.amount - hoveredValue));

  return flatData.slice(0, maxCount);
};

export const calculateColumnAverages = (tableData: Cell[][]) => {
  const numRows = tableData.length;
  if (numRows === 0) {
    return [];
  }

  const numColumns = tableData[0].length;

  const columnSums = Array.from({ length: numColumns }, () => 0);

  for (const row of tableData) {
    row.forEach((cell, columnIndex) => {
      columnSums[columnIndex] += cell?.amount || 0;
    });
  }

  const columnAverages = columnSums.map((sum) => (sum / numRows).toFixed(2));

  return columnAverages;
};
