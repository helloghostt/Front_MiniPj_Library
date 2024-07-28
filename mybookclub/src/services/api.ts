import axios, { AxiosInstance } from "axios";
import { Book, Review, Post, Comment, User } from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface ApiClient {
  setAuthToken: (token: string) => void;
  removeAuthToken: () => void;
  login: (
    email: string
  ) => Promise<{ user: User; access: string; refresh: string }>;
  signUp: (
    email: string
  ) => Promise<{ user: User; access: string; refresh: string }>;
  getCurrentUser: () => Promise<User>;
  fetchBooks: () => Promise<Book[]>;
  getBookDetails: (bookId: string) => Promise<Book>;
  getReviews: (bookId: string) => Promise<Review[]>;
  createReview: (
    bookId: string,
    content: string,
    rating: number
  ) => Promise<Review>;
  updateReview: (
    reviewId: string,
    content: string,
    rating: number
  ) => Promise<Review>;
  deleteReview: (reviewId: string) => Promise<void>;
  addToReadingList: (userId: string, bookId: string) => Promise<any>;
  getReadingList: (userId: string) => Promise<any>;
  searchBooks: (query: string) => Promise<any>;
  fetchPosts: () => Promise<Post[]>;
  createPost: (title: string, content: string) => Promise<Post>;
  updatePost: (id: string, title: string, content: string) => Promise<Post>;
  deletePost: (postId: string) => Promise<void>;
  getComments: (postId: string) => Promise<Comment[]>;
  createComment: (postId: string, content: string) => Promise<Comment>;
  updateComment: (commentId: string, content: string) => Promise<Comment>;
  deleteComment: (commentId: string) => Promise<void>;
}

export const api = {
  setAuthToken: (token: string) => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  removeAuthToken: () => {
    delete axiosInstance.defaults.headers.common["Authorization"];
  },

  login: async (email: string) => {
    try {
      const response = await axiosInstance.post("/auth/login/", { email });
      const data = response.data;
      return {
        user: data.user,
        access: data.access,
        refresh: data.refresh,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  signUp: async (email: string) => {
    const response = await axiosInstance.post("/auth/signup/", { email });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get("/auth/me/");
    return response.data;
  },

  fetchBooks: async () => {
    const response = await axiosInstance.get("/books/");
    return response.data;
  },

  getBookDetails: async (bookId: string) => {
    const response = await axiosInstance.get(`/books/${bookId}/`);
    return response.data;
  },

  addToReadingList: async (userId: string, bookId: string) => {
    const response = await axiosInstance.post(`/profile/${userId}`);
    return response.data;
  },

  getReadingList: async (userId: string) => {
    const response = await axiosInstance.get(`/profile/${userId}`);
    return response.data;
  },

  searchBooks: async (query: string) => {
    const response = await axiosInstance.get(`/search/?query=${query}`);
    return response.data;
  },

  // Post CRUD
  fetchPosts: async () => {
    const response = await axiosInstance.get("/posts/");
    return response.data;
  },

  createPost: async (title: string, content: string) => {
    const response = await axiosInstance.post("/posts/", { title, content });
    return response.data;
  },

  updatePost: async (id: string, title: string, content: string) => {
    const response = await axiosInstance.put(`/posts/${id}/`, {
      title,
      content,
    });
    return response.data;
  },

  deletePost: async (id: string) => {
    await axiosInstance.delete(`/posts/${id}`);
  },

  // Review CRUD
  getReviews: async (bookId: string, content: string, rating: number) => {
    const response = await axiosInstance.get(`/books/${bookId}/reviews/`);
    return response.data;
  },

  createReview: async (bookId: string, content: string, rating: number) => {
    const response = await axiosInstance.post(`/books/${bookId}/reviews/`, {
      content,
      rating,
    });
    return response.data;
  },

  updateReview: async (reviewId: string, content: string, rating: number) => {
    const response = await axiosInstance.put(`/reviews/${reviewId}/`, {
      content,
      rating,
    });
    return response.data;
  },

  deleteReview: async (reviewId: string) => {
    await axiosInstance.delete(`/reviews/${reviewId}/`);
  },

  addReview: async (reviewId: string) => {
    await axiosInstance.put(`/reviews/${reviewId}/add`, {
      reviewId,
    });
  },

  // Comment CRUD
  getComments: async (postId: string) => {
    const response = await axiosInstance.get(`/posts/${postId}/comments/`);
    return response.data;
  },

  createComment: async (postId: string, content: string) => {
    const response = await axiosInstance.post(`/posts/${postId}/new_comment/`, {
      content,
    });
    return response.data;
  },

  updateComment: async (commentId: string, content: string) => {
    const response = await axiosInstance.put(`/comments/${commentId}/update/`, {
      content,
    });
    return response.data;
  },

  deleteComment: async (commentId: string) => {
    await axiosInstance.delete(`/comments/${commentId}/delete/`);
  },
};

export default axiosInstance;
