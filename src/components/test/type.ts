import type { MedicationUsageVO } from '@/repository/HBOS_NIS';

export type IDataIndex = 'inTakeType' | 'inTakeName' | 'amount';

export type IValue = {
  inTakeType?: string;
  inTakeName?: string;
  amount?: number;
};

export type IOption = {
  label: string;
  value: string;
  dictType?: IInAmountType;
  hidden?: string;
};

// export type IOption = {
//   label: string;
//   value: string;
//   hidden?: string;
//   dictType?: IInAmountType;
// };

export type IInAmountType = 'adult' | 'newborn' | 'children';

export interface ITypeOptionsMap {
  [key: React.Key]: string;
}

export interface IProps {
  value?: IValue[];
  onChange?: (value: IValue[]) => void;
  inTakeTypeOption?: IOption[];
  inTakeNameOption?: IOption[];
  readOnly: boolean;
  inAmountType?: IInAmountType;
  isShowDoctorOrder?: boolean;
  minWidth?: number;
  typeOption?: { options?: IOption[] };
  nameOption?: { options?: IOption[] };
  isUseCustomOptions?: boolean;
  typeOptionsMap?: ITypeOptionsMap;
}

export interface ITableData extends MedicationUsageVO {
  inAmountName?: string;
}
