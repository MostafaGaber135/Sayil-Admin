export type User = {
  id?: string;
  name?: string;
  permissions?: string[];
};

export type AuthState = {
  token: string | null;
  user: User | null;
};
