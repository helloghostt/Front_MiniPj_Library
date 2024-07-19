import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';


const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(username, email, password);
  };

  return (
    <div className="signup-page">
      <h2>Membership</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error-message">{error.message}</p>}
      <div className="social-signup">
        <button className="google-signup">Sign up with Google</button>
      </div>
    </div>
  );
};

export default SignupPage;