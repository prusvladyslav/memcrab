import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

type TableSize = {
  rows?: number;
  columns?: number;
};

type CellId = number;
type CellValue = number;

export type Cell = {
  id: CellId;
  amount: CellValue;
};

type MatrixContextType = {
  tableSize: TableSize;
  setTableSize: Dispatch<SetStateAction<TableSize>>;
  tableData: Cell[][];
  setTableData: Dispatch<SetStateAction<Cell[][]>>;
  highlightAmount?: number
  setHighlightAmount: Dispatch<SetStateAction<number | undefined>>
};

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const useMatrixContext = () => {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error('useMatrixContext must be used within a MatrixProvider');
  }
  return context;
};

type Props = {
  children: ReactNode;
};

export const MatrixProvider: React.FC<Props> = ({ children }) => {
  const [tableSize, setTableSize] = useState<TableSize>({ rows: undefined, columns: undefined });
  const [highlightAmount, setHighlightAmount] = useState<number | undefined>(undefined)
  const [tableData, setTableData] = useState<Cell[][]>([]);

  const memoizedValue = useMemo(() => ({ tableSize, setTableSize, tableData, setTableData, highlightAmount, setHighlightAmount }), [
    tableSize,
    setTableSize,
    tableData,
    setTableData,
    highlightAmount,
    setHighlightAmount
  ]);

  return (
    <MatrixContext.Provider value={memoizedValue}>
      {children}
    </MatrixContext.Provider>
  );
};
