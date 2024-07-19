export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  }
  
  export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    isbn: string;
    publishedDate: string;
    coverImage: string;
    rating?: number;
    purchaseLink?: string;
  }
  
  export interface Review {
    id: string;
    bookId: string;
    userId: string;
    userName: string;
    content: string;
    rating: number;
    createdAt: string;
  }
  
  export interface CommunityPost {
    id: string;
    title: string;
    content: string;
    userId: string;
    userName: string;
    createdAt: string;
  }