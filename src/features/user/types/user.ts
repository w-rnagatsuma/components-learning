export type UserId = string;

export type User = {
  id: UserId;
  firstName: string;
  lastName: string;
  email: string;
  updatedAt: string; // ISO
};

export type UserUpdateInput = {
  firstName: string;
  lastName: string;
  email: string;
};
