import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useBook } from '../../hooks/useBook';
import { Book } from '../../types';
import { profile } from 'console';
import '../../styles/global.css'


const Profile: React.FC = () => {
  const { user } = useAuth();
  const { books } = useBook();

  if (!user) return <p>Please log in to view your profile.</p>;
  const userBooks = books.slice(0, 5);
  return (
    <div className="profile-page">
      <h2>Welcome, {user.username}!</h2>
      <div className="user-info">
        <img src={`https://picsum.photos/seed/${user.id}/200/200`} alt={user.username} className="profile-picture" />
        <div className="user-details">
          <p>Email: {user.email}</p>
          <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="reading-list">
        <h3>Your Reading List</h3>
        <div className="book-grid">
          {userBooks.map((book:Book) => (
            <div key={book.id} className="book-card">
              <img src={`https://picsum.photos/seed/${book.id}/200/300`} alt={book.title} />
              <h4>{book.title}</h4>
              <p>{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;


// return (
//   <div className="profile">
//     {user ? (
//       <>
//         <img src={user.profilePicture} alt="Profile" />
//         <h2>{user.nickname}</h2>
//         {/* TODO: Add user's book reviews */}
//       </>
//     ) : (
//       <p>Loading...</p>
//     )}
//   </div>
// );
