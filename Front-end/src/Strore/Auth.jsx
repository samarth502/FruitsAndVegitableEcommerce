import React, { createContext, useState, useContext, useEffect } from "react";
import ProductService from "../Services/ProductServices";
import AuthService from "../Services/AuthService";

// Step 1: Create a context to manage token state
const TokenContext = createContext();

export const TokenProvider = ({ children ,cart,setCart}) => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUser] = useState(null);
  const [carts, setCarts] = useState([]);

  

  const [token, setTokenState] = useState(() => localStorage.getItem("token") || "");
  const isLoggedIn = !!token;

  // Function to set token in localStorage
  const setToken = (newToken) => {
    setTokenState(newToken);
    localStorage.setItem("token", newToken);
  };

  // Fetch products from API

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await ProductService.getProducts();
      if (fetchedProducts) {
        setProducts(fetchedProducts);
      }
    };
    fetchProducts();
  }, []);
  

  // Add item to cart
  const addToCart = async (productId, name, price, dese, img, category, rating) => {
    try {
      const response = await fetch('http://localhost:8080/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, name, price, dese, img, category, rating }),
        // credentials: 'include', // Include credentials to handle cookies or tokens
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const api = await response.json();
      setCarts(api); // Update carts state after successful addition
      console.log("Item added to cart:", api);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Authenticate user and fetch user data
  const userAuthentication = async () => {
    const authUserData = await AuthService.getUser(token);
  if (authUserData) {
    // Handle successful retrieval of user data
    console.log('User data:', authUserData);
    setUser(authUserData.userData);
  } else {
    // Handle failure to fetch user data
    console.log('Failed to fetch user data');
  }

  };



  const removeFromCart = (productId) => {
    const updatedCarts = cart.filter(item => item.id !== productId);
    setCart(updatedCarts);
    // Additional logic to update backend (optional), like making an API call to delete from database
  };






  useEffect(() => {
    if (isLoggedIn) {
      // getProducts();
      userAuthentication();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ product,removeFromCart, token, carts, setToken, isLoggedIn, users, loading, addToCart }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
