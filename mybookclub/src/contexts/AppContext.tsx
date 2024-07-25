import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import useBook from "../hooks/useBook";
import { useReview } from "../hooks/useReview";
import { useCommunity } from "../hooks/useCommunity";
import { Book } from "../types";

interface AppContextType {
  auth: ReturnType<typeof useAuth>;
  community: ReturnType<typeof useCommunity>;
  book: {
    books: Book[];
    loading: boolean;
    error: Error | null;
    readingList: Book[];
    searchBooks: (query: string) => Promise<void>;
    addToReadingList: (userId: string, bookId: string) => Promise<void>;
    fetchReadingList: (userId: string) => Promise<void>;
    fetchBooks: () => Promise<void>;
    fetchBookDetails: (bookId: string) => Promise<void>;
    fetchUserReviewedBooks: (userId: string) => Promise<Book[]>;
  };
  review: ReturnType<typeof useReview>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const book = useBook();
  const review = useReview();
  const community = useCommunity();

  return (
    <AppContext.Provider value={{ auth, book, review, community }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
