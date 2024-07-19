import { useState, useEffect } from 'react';
import { User } from '../types/index';
import * as api from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const userData = await api.getCurrentUser();
      setUser(userData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await api.login(email, password);
      setUser(userData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
    } catch (err) {
      setError(err as Error);
    }
  };
  const signup = async (username: string, email: string, password: string) => {
    // Implement signup logic
  };
  return { user, loading, error, login, logout, signup };
};