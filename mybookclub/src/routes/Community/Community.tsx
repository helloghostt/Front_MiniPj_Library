import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { Post } from "../../types";
import "../../styles/global.css";

const Community: React.FC = () => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const {
    auth: { currentUser },
    community: { posts, fetchPosts, createPost, loading, error },
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    try {
      await createPost(newPostTitle, newPostContent);
      setNewPostTitle("");
      setNewPostContent("");
    } catch (error) {
      console.error("Error creating post:", error);
      // TODO: 에러 처리
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="community">
      <div className="community-board">
        <h1>Community Board</h1>
        <table className="discuss-board">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Title</th>
              <th>ViewCount</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>{post.author}</td>
                <td>{post.content}</td>
                <td>
                  <button onClick={() => navigate(`/book/${post.id}`)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
            {/* <tr>
              <th>1</th>
              <td>Admin</td>
              <td>This is the first post on the community board.</td>
              <td></td>
            </tr>
            <tr>
              <th>2</th>
              <td>User</td>
              <td>This is the second post on the community board.</td>
              <td></td>
            </tr> */}
          </tbody>
        </table>
      </div>
      {/* 게시글 작성 폼 */}
      {currentUser && (
        <div className="post-form">
          <h2>Create New Post</h2>
          <form onSubmit={handlePostSubmit}>
            <div>
              <label htmlFor="postTitle">Title:</label>
              <input
                type="text"
                id="postTitle"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="postContent">Content:</label>
              <textarea
                id="postContent"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit">Submit Post</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Community;
