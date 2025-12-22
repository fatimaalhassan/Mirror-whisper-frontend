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
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        Welcome. The mirror sees your strength — tap the apple to hear the truth.”
      </p>
    </main>
  );
};

export default Dashboard;

