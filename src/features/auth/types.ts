export type AdminUser = {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  role: string;
  permissions: string[];
  joinedDate: string;
  isActive: boolean;
};

export type AdminLoginRequest = {
  phoneNumber: string;
  password: string;
};

export type AdminLoginData = {
  token: string;
  refreshToken: string;
  isFirstTimeLogin: boolean;
  user: AdminUser;
};

export type ApiResponse<T> = {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[] | null;
  data: T;
};

export type AdminLoginResponse = ApiResponse<AdminLoginData>;

export type AuthState = {
  token: string | null;
  refreshToken: string | null;
  isFirstTimeLogin: boolean;
  user: AdminUser | null;
};
