import { keyDatatype, valueDatatype } from '../routers/auth.router';

export const createMissingBody = (neededKeys: keyDatatype[], body: Object): string[] => {
  let missingBody: string[] = [];
  neededKeys.forEach((key) => {
    if (!body.hasOwnProperty(key.key)) {
      missingBody.push(key.key);
    }
  });
  return missingBody;
};

export const createWrongDatatypeBody = (neededKeys: valueDatatype[]): object[] => {
  const wrongDatatypeBody: object[] = neededKeys.filter(
    (key) => key.datatype != key.actualDatatype
  );

  return wrongDatatypeBody;
};

export const randomString = (size: number): string => {
  let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let characterLength: number = characters.length;
  let randomString: string = '';
  for (let i = 0; i < size; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characterLength));
  }
  return randomString;
};
