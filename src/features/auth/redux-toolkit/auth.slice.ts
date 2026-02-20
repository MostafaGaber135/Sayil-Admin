import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AdminUser, AuthState } from "@/features/auth/types";

const initialState: AuthState = {
    token: null,
    refreshToken: null,
    isFirstTimeLogin: false,
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(
            state,
            action: PayloadAction<{
                token: string;
                refreshToken?: string | null;
                isFirstTimeLogin?: boolean;
                user?: AdminUser | null;
            }>
        ) {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken ?? null;
            state.isFirstTimeLogin = Boolean(action.payload.isFirstTimeLogin);
            state.user = action.payload.user ?? null;
        },
        clearAuth(state) {
            state.token = null;
            state.refreshToken = null;
            state.isFirstTimeLogin = false;
            state.user = null;
        }
    }
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
