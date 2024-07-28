import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { useBook } from "../hooks/useBook";
import { useReview } from "../hooks/useReview";
import { useCommunity } from "../hooks/useCommunity";
import { Book, Review } from "../types";

interface AppContextType {
  auth: ReturnType<typeof useAuth>;
  community: ReturnType<typeof useCommunity>;
  book: ReturnType<typeof useBook>;
  review: ReturnType<typeof useReview>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const book = useBook();
  const review = useReview("");
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
