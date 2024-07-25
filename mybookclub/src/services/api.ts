import axios from "axios";
import { Book, Review, Post, Comment, User } from "../types";
import { books as localBooks } from "../data/books";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const NAVER_API_URL = "https://openapi.naver.com/v1/search/book.json";

const api = axios.create({
  baseURL: API_URL,
});

// 인증 토큰 설정 (로그인 후 호출해야 함)
export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// 인증 토큰 제거 (로그아웃 시 호출)
export const removeAuthToken = () => {
  delete api.defaults.headers.common["Authorization"];
};

// 책 관련 API
export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get("https://your-api-url/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getBookDetails = async (bookId: string): Promise<Book> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = localBooks.find((b) => b.id === bookId);
      if (book) {
        resolve(book);
      } else {
        reject(new Error("Book not found"));
      }
    }, 500);
  });
};

//search관련 naver API연결
export const searchBooks = async (query: string) => {
  try {
    const response = await axios.get(
      "https://openapi.naver.com/v1/search/book.json",
      {
        params: { query },
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
};

// User 인증 관련 API
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

// 리뷰 관련 API
export const getReviews = async (bookId: string) => {
  try {
    const response = await api.get(`/books/${bookId}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const addReview = async (
  bookId: string,
  content: string,
  rating: number
) => {
  try {
    const response = await api.post(`/books/${bookId}/reviews`, {
      content,
      rating,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

// review comments관련
export const getComments = async (bookId: string): Promise<Comment[]> => {
  try {
    const response = await axios.get(`/api/books/${bookId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const addComment = async (
  bookId: string,
  content: string
): Promise<Comment> => {
  const response = await api.post(`/books/${bookId}/comments`, { content });
  return response.data;
};

export const createComment = async (postId: string, content: string) => {
  try {
    const response = await api.post(`/posts/${postId}/comments/`, { content });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

// 게시글 관련 API
export const fetchPosts = async () => {
  try {
    const response = await api.get("/posts/");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (title: string, content: string) => {
  try {
    const response = await api.post("/posts/", { title, content });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (
  id: number,
  title: string,
  content: string
) => {
  try {
    const response = await api.put(`/posts/${id}/`, { title, content });
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    await api.delete(`/posts/${id}/`);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// READING_LIST 관련 API
export const addToReadingList = async (userId: string, bookId: string) => {
  try {
    const response = await api.post(`/users/${userId}/reading-list`, {
      bookId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding book to reading list:", error);
    throw error;
  }
};

export const getReadingList = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}/reading-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reading list:", error);
    throw error;
  }
};

export const updateReview = async (
  reviewId: string,
  content: string,
  rating: number
): Promise<Review> => {
  try {
    const response = await axios.put(`/api/reviews/${reviewId}`, {
      content,
      rating,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId: string): Promise<void> => {
  try {
    await axios.delete(`/api/reviews/${reviewId}`);
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

export default api;
