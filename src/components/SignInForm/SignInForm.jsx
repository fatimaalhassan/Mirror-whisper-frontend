// src/components/SignInForm/SignInForm.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

 return (
  <main className="auth-page">
    <section className="auth-card">
      <h1 className="auth-title">Sign In</h1>
      <p className="auth-subtitle">Welcome back to Mirror Whisper</p>

      {message && <p className="auth-error">{message}</p>}

      <form className="auth-form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-actions">
          <button className="btn">Sign In</button>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>

      <p className="auth-footer">
        Don’t have an account? <a href="/sign-up">Create one</a>
      </p>
    </section>
  </main>
);

}
export default SignInForm;
