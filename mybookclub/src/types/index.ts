export type UserRole = "admin" | "user";

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  role: UserRole;
}

export interface AuthState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}
export interface Book {
  id: string | number;
  title: string;
  author: string;
  coverImage: string;
  description?: string;
}

export interface BookCardProps {
  id: string | number;
  title: string;
  author: string;
  coverImage: string;
}

export interface BookListProps {
  books: Book[];
}

export interface Review {
  id: string;
  bookId: string;
  content: string;
  rating: number;
  author: string;
  userId: string;
  createdAt: string;
}

// Community interface
export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}
export interface CommentType {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface CommentProps {
  bookId: string | undefined;
}

export interface AuthState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface SearchResult {
  isbn: string;
  title: string;
  author: string;
  image: string;
  description: string;
}
