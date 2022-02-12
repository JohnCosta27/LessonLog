export const getMissingBodyError = (missing: String[]): object => {
  return { error: 'Request is missing parts of the body.', missing: missing };
};

export const getEmailError = (): object => {
  return { error: 'Email has already been registered.' };
};

export const getDatabaseError = (): object => {
  return { error: 'An unexpected database error occured' };
};

export const getWrongDataTypeError = (): object => {
  return { error: 'Items were not datatype.' };
};
