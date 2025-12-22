import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "", 
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
  <main className="auth-page">
    <section className="auth-card">
      <h1 className="auth-title">Sign Up</h1>
      <p className="auth-subtitle">Create your Mirror Whisper account</p>

      {message && <p className="auth-error">{message}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-actions">
          <button className="btn" disabled={isFormInvalid()}>Sign Up</button>
          <button type="button" className="btn-ghost" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>

      <p className="auth-footer">
        Already have an account? <a href="/sign-in">Sign in</a>
      </p>
    </section>
  </main>
);

  
};

export default SignUpForm;
