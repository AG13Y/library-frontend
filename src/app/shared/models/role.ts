export const Role = {
  Admin: 'ADMIN',
  Librarian: 'LIBRARIAN',
} as const;

export type Role = (typeof Role)[keyof typeof Role];