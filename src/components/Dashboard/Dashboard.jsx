// src/components/Dashboard/Dashboard.jsx

import { useContext, useEffect } from 'react';
import * as userService from '../../services/userService'
import { UserContext } from '../../contexts/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);

   useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);


 return (
  <main className="mirror-container">
    <div className="mirror-text">
      <h1 className="welcome-text">Welcome {user.username}</h1>
      <p className="mirror-subtext">
Mirror, mirror — your strength is seen. Tap to hear the truth.      </p>
    </div>
  </main>
);
};

export default Dashboard;

