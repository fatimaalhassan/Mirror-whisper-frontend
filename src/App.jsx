// src/App.jsx

import { Routes, Route } from 'react-router'; // Import React Router

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import Mirror from "./components/mirror/mirror.jsx";
import Message from "./components/message/message.jsx";
import Favorites from "./components/favorites/favorites.jsx";
import MyMessages from "./components/mymessages/mymessages.jsx";
import './App.css';



const App = () => {

const { user } = useContext(UserContext);


  return (
    <div className="app-bg">
      <NavBar />

      <div className="container">
        <Routes>
          {user ? (
            
            <>
          
{user ? (
  <>
    <Route path="/" element={<Dashboard />} />
    <Route path="/mirror" element={<Mirror />} />
    <Route path="/message" element={<Message />} />
    <Route path="/mymessages" element={<MyMessages />} />
    <Route path="/favs" element={<Favorites />} />
  </>
) : (
  <Route path="/" element={<Landing />} />
)}

            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}

          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Routes>
      </div>
    </div>
  );
};

    
  


export default App;

