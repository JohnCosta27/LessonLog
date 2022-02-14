import { valueDatatype } from 'routesData/auth.data';

export const createMissingBody = (neededKeys: valueDatatype[]): string[] => {
  let missingBody: string[] = [];
  neededKeys.forEach((item) => {
    if (typeof item.value === 'undefined') {
      missingBody.push(item.key);
    }
  });

  return missingBody;
};

export const createWrongDatatypeBody = (neededKeys: valueDatatype[]): valueDatatype[] => {
  const wrongDatatypeBody: valueDatatype[] = neededKeys.filter(
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
