import axios, { AxiosInstance } from "axios";
import { Book, Review, Post, Comment, User } from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This allows the browser to send cookies with cross-origin requests
});

axiosInstance.interceptors.request.use((config) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add CSRF token if available
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");
  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
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
  fetchBookByISBN: () => Promise<Book[]>;
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

  refreshToken: async (refreshToken: string) => {
    const response = await axiosInstance.post("/users/auth/token/refresh/", {
      refresh: refreshToken,
    });
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/users/auth/logout/");
    return response.data;
  },

  login: async (email: string) => {
    try {
      const response = await axiosInstance.post("/users/auth/login/", {
        email: email,
      });
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login API error:",
          error.response?.data || error.message
        );
        if (error.response) {
          // 서버에서 응답을 받았지만 2xx 범위를 벗어난 상태 코드가 반환된 경우
          switch (error.response.status) {
            case 400:
              throw new Error(
                error.response.data.error || "Invalid credentials"
              );
            case 401:
              throw new Error("Unauthorized. Please check your credentials.");
            case 404:
              throw new Error(
                "Login service not found. Please try again later."
              );
            default:
              throw new Error(
                `Server error: ${
                  error.response.data.error || "Unknown error occurred"
                }`
              );
          }
        } else if (error.request) {
          // 요청은 보냈지만 응답을 받지 못한 경우
          throw new Error(
            "No response from server. Please check your network connection."
          );
        } else {
          // 요청 설정 중에 문제가 발생한 경우
          throw new Error("Error setting up the request. Please try again.");
        }
      } else {
        // 예상치 못한 오류
        console.error("Unexpected error during login:", error);
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  },

  signUp: async (email: string) => {
    const response = await axiosInstance.post("/users/auth/signup/", { email });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get("/auth/me/");
    return response.data;
  },

  fetchBooks: async (page: number = 1): Promise<Book[]> => {
    try {
      const response = await axiosInstance.get(`/books/?page=${page}`);
      console.log("API response:", response.data);
      if (response.data.results) {
        return response.data.results;
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },

  fetchBookByISBN: async (isbn: string): Promise<Book | null> => {
    try {
      const response = await axiosInstance.get(`/books/fetchbooks/${isbn}/`, {
        headers: {
          "X-Naver-Client-Id": NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching book info:", error);
      return null;
    }
  },

  getBookDetails: async (bookId: string) => {
    const response = await axiosInstance.get(`/books/${bookId}/`);
    return response.data;
  },

  addToReadingList: async (userId: string, bookId: string) => {
    const response = await axiosInstance.post(
      `/users/${userId}/reading-list/`,
      { book_id: bookId }
    );
    return response.data;
  },

  getReadingList: async (userId: string) => {
    const response = await axiosInstance.get(`/users/${userId}/reading-list/`);
    return response.data;
  },

  searchBooks: async (query: string, page: number = 1) => {
    const response = await axiosInstance.get(
      `/books/search/?query=${query}&page=${page}`
    );
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
    await axiosInstance.delete(`/posts/${id}/`);
  },

  // Review CRUD
  getReviews: async (bookId: string) => {
    if (!bookId) {
      throw new Error("Book ID is required");
    }
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
    const response = await axiosInstance.put(`/books/reviews/${reviewId}/`, {
      content,
      rating,
    });
    return response.data;
  },

  deleteReview: async (reviewId: string) => {
    await axiosInstance.delete(`/books/reviews/${reviewId}/`);
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
