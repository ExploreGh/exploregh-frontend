export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const isValidEmail = (email: string) => {
  const normalizedEmail = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizedEmail);
};

export const normalizeGhanaPhone = (phone: string) => {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('233')) digits = digits.slice(3);
  if (digits.startsWith('0')) digits = digits.slice(1);
  return digits.slice(0, 9);
};

export const formatGhanaPhone = (phone: string) => {
  const digits = normalizeGhanaPhone(phone);
  return [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 9)]
    .filter(Boolean)
    .join(' ');
};

export const isValidGhanaMobile = (phone: string) =>
  /^[25]\d{8}$/.test(normalizeGhanaPhone(phone));

export const toInternationalGhanaPhone = (phone: string) =>
  `+233${normalizeGhanaPhone(phone)}`;

export const getPasswordChecks = (password: string) => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
});

export const isStrongPassword = (password: string) =>
  Object.values(getPasswordChecks(password)).every(Boolean);
