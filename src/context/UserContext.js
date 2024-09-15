import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const[username,setUserName]=useState('')
 
  return (
    <UserContext.Provider value={{ users, setUsers,username,setUserName}}>
      {children}
    </UserContext.Provider>
  );
};

// export const useCategories = () => React.useContext(;
export default  UserContext;