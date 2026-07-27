export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const isValidEmail = (email: string) => {
  const normalizedEmail = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizedEmail);
};
