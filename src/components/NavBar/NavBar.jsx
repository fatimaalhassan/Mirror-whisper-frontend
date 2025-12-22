// src/components/NavBar/NavBar.jsx

import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__brand">Mirror Whisper</li>

        {user ? (
          <>
            <li className="nav__welcome">Welcome, {user.username}</li>

            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/mirror">Mirror</Link></li>
            <li><Link to="/mymessages">My Messages</Link></li>
            <li><Link to="/favs">Favorites</Link></li>

            <li>
              <button className="btn btn-red" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sign-up">Sign Up</Link></li>
            <li><Link to="/sign-in">Sign In</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
