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


export default CategoriesContext;
