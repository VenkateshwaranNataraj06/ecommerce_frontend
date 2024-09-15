export  const addToCart = async (productId, quantity) => {
    try {
      if(authToken){
        const response = await createCarts(productId, quantity);
        console.log(response.data);
       
    
   
        setCart(response.data); // Update cart state with the new data
  
        setCartlength(response.data[0].items.length)

      }else {
        // Store in local storage if not logged in
        const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = localCartItems.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
          localCartItems[itemIndex].quantity += quantity;
        } else {
          localCartItems.push({ productId, quantity });
        }
        localStorage.setItem('cartItems', JSON.stringify(localCartItems));
        setCart(localCartItems);
        setCartlength(localCartItems.length);
      }
     



    } catch (error) {
      console.error('Error adding to cart:', error.response?.data?.message);
    }
  };

    // Remove item from cart
  export  const removeFromCart = async (productId) => {
        try {
          if(authToken){
            const response = await deleteCarts(productId);
          console.log(response.data);
          
          setCart(response.data); // Update cart state with the new data
          setCartlength(response.data.items.length)
          console.log(response.data.items.length,"response.data[0].items.length");
          
          }
          else{
            const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const updatedCartItems = localCartItems.filter(item => item.productId !== productId);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            setCart(updatedCartItems);
       
            
            setCartlength(updatedCartItems.length);
          }
          
        } catch (error) {
          console.error('Error removing from cart:', error.response?.data.message
    
          );
        }
      };