export interface IProps {
  values: string[] | string[][];
  title: string;
  checkingRowIndex: number;
  checkingColIndex: number;
  showChecking: boolean;
  showAddedValue?: boolean;
  showFoundedValue?: boolean;
  changeValue: (
    value: string,
    rowIndex: number,
    colIndex: number,
    numberOfCache: string,
  ) => void;
  isCheckingForAlreadyUsedValues: boolean;
  isChangeable?: boolean;
}
