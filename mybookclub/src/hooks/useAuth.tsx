import { useState, useCallback, useEffect } from "react";
import { User, AuthState } from "../types";
import { api } from "../services/api";

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    currentUser: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUserInfo();
    }
  }, []);

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
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      api.setAuthToken(access);
      setState((prev) => ({ ...prev, currentUser: user, isLoading: false }));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Failed to login");
      setIsLoading(false);
      return false;
    }
  };

  const logout = useCallback(() => {
    setState({ currentUser: null, isLoading: false, error: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    api.removeAuthToken();
  }, []);

  const isAdmin = () => state.currentUser?.role === "admin";

  const signUp = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, access, refresh } = await api.signUp(email);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      api.setAuthToken(access);
      setState((prev) => ({ ...prev, currentUser: user, isLoading: false }));
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
