import { useState } from "react";
import * as api from "../services/api";
import { Post } from "../types";
import { Book, Review } from "../types";

export const useCommunity = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await api.fetchPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (title: string, content: string) => {
    setLoading(true);
    try {
      const newPost = await api.createPost(title, content);
      setPosts([...posts, newPost]);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, fetchPosts, createPost };
};
