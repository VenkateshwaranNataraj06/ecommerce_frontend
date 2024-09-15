import React, { createContext, useState } from 'react';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories,setCategories] = useState([]);
  const [cid, setCid] = useState(null);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories,cid,setCid }}>
      {children}
    </CategoriesContext.Provider>
  );
};

// export const useCategories = () => React.useContext(;
export default CategoriesContext;


// useMemo(() => ({
//   authenticate,
//   setCurrentSession,
//   currentSession,
//   logOut,
//   pubData,
//   errors,
//   userData,
//   getSession,
//   setPubData,
//   setErrors,
//   renewToken,
// }), [authenticate, setCurrentSession, currentSession, logOut, pubData, errors, userData, getSession, setPubData, setErrors, renewToken]);