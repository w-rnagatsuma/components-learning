import type { User, UserUpdateInput } from '../types/user';

export const normalizeName = (s: string) => s.trim().replace(/\s+/g, ' ');
export const normalizeEmail = (s: string) => s.trim().toLowerCase();

export const getDisplayName = (user: Pick<User, 'firstName' | 'lastName'>) =>
  `${user.firstName} ${user.lastName}`.trim();

export const validateUserUpdate = (input: UserUpdateInput) => {
  const errors: string[] = [];
  if (!normalizeName(input.firstName)) errors.push('名が空です');
  if (!normalizeName(input.lastName)) errors.push('姓が空です');
  const email = normalizeEmail(input.email);
  if (!email) errors.push('メールアドレスが空です');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push('メールアドレスの形式が不正です');
  return errors;
};

export const toNormalizedUpdate = (input: UserUpdateInput): UserUpdateInput => ({
  firstName: normalizeName(input.firstName),
  lastName: normalizeName(input.lastName),
  email: normalizeEmail(input.email),
});
