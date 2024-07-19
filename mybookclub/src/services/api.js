import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

export const fetchBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};


export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/Auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const searchBooks = async (query: string) => {
  try {
    const response = await api.get('/books/search', { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

export const getReviews = async (bookId: string) => {
  try {
    const response = await api.get(`/books/${bookId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const addReview = async (bookId: string, content: string, rating: number) => {
  try {
    const response = await api.post(`/books/${bookId}/reviews`, { content, rating });
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

export default api;