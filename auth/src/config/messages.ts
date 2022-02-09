export const getMissingBodyError = (missing: String[]): Object => {
  return { error: 'Request is missing parts of the body.', missing: missing };
};

export const getEmailError = (): Object => {
  return { error: 'Email has already been registered.' };
};

export const getDatabaseError = (): object => {
  return { error: 'An unexpected database error occured' };
};
