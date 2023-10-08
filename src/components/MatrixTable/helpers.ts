import { Cell } from "../../context/MatrixContext";

export const findNearestCells = (
    hoveredValue: number,
    maxCount: number,
    tableData: Cell[][]
) => {
    const flatData = tableData.flat();
    flatData.sort((a, b) => {
        const distanceA = Math.abs(a.amount - hoveredValue);
        const distanceB = Math.abs(b.amount - hoveredValue);
        return distanceA - distanceB;
    });
    return flatData.slice(0, maxCount);
};

export const calculateColumnAverages = (tableData: Cell[][]) => {
    if (tableData.length === 0) {
      return [];
    }
  
    const columns = tableData[0].length;
  
    const columnAverages = Array.from({ length: columns }).map((_, index) => {
      const columnSum = tableData.reduce((acc, row) => acc + (row[index]?.amount || 0), 0);
      return (columnSum / tableData.length).toFixed(2);
    });
  
    return columnAverages;
  };