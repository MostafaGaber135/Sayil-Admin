import type { RootState } from "@/shared/lib/rtk/store";

export const selectAuth = (state: RootState) => state.auth;
export const selectAccessToken = (state: RootState) => state.auth.token;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectUser = (state: RootState) => state.auth.user;
export const selectPermissions = (state: RootState) => state.auth.user?.permissions ?? [];
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.token);
