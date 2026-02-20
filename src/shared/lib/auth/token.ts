const ACCESS_KEY = "sayil_access_token";
const REFRESH_KEY = "sayil_refresh_token";

export function getAccessToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_KEY);
}

export function setAccessToken(token: string) {
    localStorage.setItem(ACCESS_KEY, token);
}

export function clearAccessToken() {
    localStorage.removeItem(ACCESS_KEY);
}

export function getRefreshToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_KEY);
}

export function setRefreshToken(token: string) {
    localStorage.setItem(REFRESH_KEY, token);
}

export function clearRefreshToken() {
    localStorage.removeItem(REFRESH_KEY);
}

export function setTokens(accessToken: string, refreshToken?: string | null) {
    setAccessToken(accessToken);
    if (refreshToken) setRefreshToken(refreshToken);
}

export function clearTokens() {
    clearAccessToken();
    clearRefreshToken();
}
