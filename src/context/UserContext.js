import React, { useEffect, useState } from 'react';
import { getUserAccount } from '../services/userService';

const UserContext = React.createContext(null);

const UserProvider  = ({ children }) => {
    // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({
    isAuthenticated: false,
    token: "",
    account: {}
  });

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser(userData);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: '',
      auth: false,
    }));
  };

  const fetchUser = async () => {
    let data = await getUserAccount();
    if(data && data.EC === 0){
      setUser(data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (                      // var value & 2 function
    <UserContext.Provider value={{ user, loginContext, logout }}>   
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext } 