export interface valueDatatype {
  key: string;
  datatype: string;
  value: string | undefined;
  actualDatatype: any;
}

export const registerRequiredBodyTemplate: valueDatatype[] = [
  {
    key: 'firstname',
    datatype: 'string',
    value: undefined,
    actualDatatype: undefined,
  },
  {
    key: 'surname',
    datatype: 'string',
    value: undefined,
    actualDatatype: undefined,
  },
  {
    key: 'email',
    datatype: 'string',
    value: undefined,
    actualDatatype: undefined,
  },
  {
    key: 'password',
    datatype: 'string',
    value: undefined,
    actualDatatype: undefined,
  },
];
