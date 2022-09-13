export const EMAIL_REGEXP =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
export const SIMPLE_REGEXP = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*$/i;
export const KOR_SIMPLE_REGEXP =
  /^[0-9a-zA-Z가-힣]([-_\.]?[0-9a-zA-Z가-힣])*$/i;
export const PASSWORD_REGEXP = /^[0-9a-zA-Z가-힣]([-_\.]?[0-9a-zA-Z가-힣])*$/i;

export const validateEmailValue = (email) => {
  if (email.length < 5 || !EMAIL_REGEXP.test(email)) return false;
  return true;
};

export const validateSimpleValue = (value) => {
  if (value.length < 1 || !SIMPLE_REGEXP.test(value)) return false;
  return true;
};

export const validatePasswordValue = (value) => {
  if (value.length < 10 || !PASSWORD_REGEXP.test(value)) return false;
  return true;
};
