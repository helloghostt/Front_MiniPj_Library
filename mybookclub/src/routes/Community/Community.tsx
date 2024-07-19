import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';


interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch posts from API
    // This is a placeholder. Replace with actual API call
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="community">
      <h1>Community Board</h1>
      {/* TODO: Add form to create new post */}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* TODO: Add comments section */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Community;