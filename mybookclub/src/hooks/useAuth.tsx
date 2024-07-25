import { useState, useCallback, useEffect } from "react";
import { User, AuthState } from "../types";
import { users, addUser } from "../data/users";

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    currentUser: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setState((prev) => ({ ...prev, currentUser: JSON.parse(storedUser) }));
    }
  }, []);

  const login = useCallback(async (email: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = users.find((u) => u.email === email);
      if (user) {
        setState((prev) => ({ ...prev, currentUser: user, isLoading: false }));
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      } else {
        throw new Error("User not found");
      }
    } catch (error: unknown) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      }));
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setState({ currentUser: null, isLoading: false, error: null });
    localStorage.removeItem("currentUser");
  }, []);

  const isAdmin = useCallback(() => {
    return state.currentUser?.role === "admin";
  }, [state.currentUser]);

  const signUp = useCallback(async (email: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      if (!email) {
        throw new Error("Email is required");
      }
      if (!email.includes("@")) {
        throw new Error("Invalid email format");
      }

      if (users.some((u) => u.email === email)) {
        throw new Error("Email already exists");
      }
      const newUser: User = {
        id: (users.length + 1).toString(),
        email,
        username: email.split("@")[0],
        createdAt: new Date().toISOString(),
        role: "user",
      };

      addUser(newUser);
      setState((prev) => ({ ...prev, currentUser: newUser, isLoading: false }));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      return true;
    } catch (error: unknown) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        isLoading: false,
      }));
      return false;
    }
  }, []);

  return {
    ...state,
    login,
    logout,
    isAdmin,
    signUp,
  };
};
