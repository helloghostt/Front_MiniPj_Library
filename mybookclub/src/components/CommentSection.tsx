import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getComments, addComment } from "../services/api";
import { CommentProps, CommentType } from "../types";

const CommentSection: React.FC<CommentProps> = ({ bookId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (!bookId) return;
      try {
        const fetchedComments = await getComments(bookId);
        setComments(fetchedComments as CommentType[]);
      } catch (error) {
        setError("Failed to fetch comments. Please try again.");
      }
    };

    if (bookId) {
      fetchComments();
    }
  }, [bookId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && newComment.trim() && bookId) {
      try {
        const addedComment = await addComment(bookId, newComment);
        setComments([...comments, addedComment as CommentType]);
        setNewComment("");
      } catch (error) {
        setError("Error adding comment. Please try again.");
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div className="comment-section">
      <h2>Comment</h2>
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="media mb-4">
            <img
              className="d-flex mr-3 rounded-circle"
              src="http://placehold.it/50x50"
              alt=""
            />
            <div className="media-body">
              {currentUser && currentUser.username === comment.author && (
                <div className="float-right">
                  <button className="btn btn-sm btn-info">edit</button>
                </div>
              )}
              <h5 className="mt-0">
                {comment.author}{" "}
                <small className="text-muted">
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
              </h5>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="comment-form card my-4">
        <h5 className="card-header">Leave Your Thoughts Here:</h5>
        <div className="card-body">
          {currentUser ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          ) : (
            <Link to="/" className="btn btn-outline-dark btn-block btn-sm">
              Log in to leave a comment
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
