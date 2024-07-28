import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CommentProps, CommentType, Post } from "../types";
import { api } from "../services/api";

export const useCommunity = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPosts = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const fetchedPosts = await api.fetchPosts();
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const createPost = async (title: string, content: string) => {
    try {
      setLoading(true);
      const newPost = await api.createPost(title, content);
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setError(null);
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, title: string, content: string) => {
    try {
      setLoading(true);
      const updatedPost = await api.updatePost(id, title, content);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      );
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      setLoading(true);
      await api.deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};
