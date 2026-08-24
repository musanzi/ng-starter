export interface IOption {
  label: string;
  value: string;
}

export interface IField {
  type: string;
  name: string;
  label: string;
  options?: IOption[];
  required?: boolean;
}

export interface IForm {
  phase: string;
  fields: IField[];
}
