const API_URL = 'http://localhost:8080/api/cart';

const getCartItems = async (token) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch cart items');
      return null;
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return null;
  }
};

const addToCart = async (productId, quantity, token) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to add to cart');
      return null;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
};

const removeFromCart = async (productId, token) => {
  try {
    const response = await fetch(`${API_URL}/remove/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to remove from cart');
      return null;
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    return null;
  }
};

const CartService = {
  getCartItems,
  addToCart,
  removeFromCart,
};

export default CartService;
