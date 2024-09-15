import React, { createContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartlength, setCartlength] = useState(0);
  const[orderProductId,setOrderProductId]=useState(null)
  const[cart,setCart]=useState([])
  const[quantity,setQuantity]=useState(1)
  const[productDetailsId,setProductDetails]=useState(0)
  const[filteredProducts, setFilteredProducts]=useState(products)
  const [filter,  setFilter]=useState(false)
  const [whislist,setWhislist]=useState('')
  const[whislistlength,setWhislistlength]=useState('')
  return (
    <ProductContext.Provider value={{ products, setProducts,cartlength, setCartlength,cart,setCart,orderProductId,productDetailsId,setProductDetails,setOrderProductId,quantity,setQuantity ,filteredProducts, setFilteredProducts,filter,  setFilter,whislist,setWhislist,whislistlength,setWhislistlength}}>
      {children}
    </ProductContext.Provider>
  );
};

// export const useCategories = () => React.useContext(;
export default ProductContext;