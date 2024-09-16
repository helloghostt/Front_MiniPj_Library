import { useState, useCallback, useEffect } from "react";
import { User, AuthState } from "../types";
import { api } from "../services/api";

const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
const USER_INFO_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    currentUser: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      fetchUserInfo();
      setupTokenRefresh();
      setupUserInfoRefresh();
    }
  }, []);

  const setupTokenRefresh = () => {
    setInterval(async () => {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { access } = await api.refreshToken(refreshToken);
          setAccessToken(access);
          api.setAuthToken(access);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          logout();
        }
      }
    }, TOKEN_REFRESH_INTERVAL);
  };

  const setupUserInfoRefresh = () => {
    setInterval(fetchUserInfo, USER_INFO_REFRESH_INTERVAL);
  };

  const fetchUserInfo = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const user = await api.getCurrentUser();
      setState((prev) => ({ ...prev, currentUser: user, isLoading: false }));
    } catch (error) {
      console.error("Error fetching user info:", error);
      logout();
    }
  }, []);

  const setIsLoading = (isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  };

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  };

  const login = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, access, refresh } = await api.login(email);
      setAccessToken(access);
      setRefreshToken(refresh);
      api.setAuthToken(access);
      setState((prev) => ({ ...prev, currentUser: user, isLoading: false }));
      setupTokenRefresh();
      setupUserInfoRefresh();
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Failed to login");
      setIsLoading(false);
      return false;
    }
  };

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setState({ currentUser: null, isLoading: false, error: null });
      removeAccessToken();
      removeRefreshToken();
      api.removeAuthToken();
    }
  }, []);

  const isAdmin = () => state.currentUser?.role === "admin";

  const signUp = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, access, refresh } = await api.signUp(email);
      setAccessToken(access);
      setRefreshToken(refresh);
      api.setAuthToken(access);
      setState((prev) => ({ ...prev, currentUser: user, isLoading: false }));
      setupTokenRefresh();
      setupUserInfoRefresh();
      return true;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setIsLoading(false);
      return false;
    }
  };

  return {
    ...state,
    login,
    logout,
    isAdmin,
    signUp,
    api,
  };
};

// Utility functions for token management
const setAccessToken = (token: string) => {
  document.cookie = `accessToken=${token}; path=/; max-age=3600; HttpOnly; Secure; SameSite=Strict`;
};

const setRefreshToken = (token: string) => {
  document.cookie = `refreshToken=${token}; path=/; max-age=86400; HttpOnly; Secure; SameSite=Strict`;
};

const getAccessToken = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const getRefreshToken = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)refreshToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

const removeAccessToken = () => {
  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict";
};

const removeRefreshToken = () => {
  document.cookie =
    "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict";
};
