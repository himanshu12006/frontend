import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import API from '../api/axiosInstance';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to map backend cart structure to what the frontend expects
  const mapBackendCartToFrontend = (backendCart) => {
    if (!backendCart || !backendCart.items) return [];
    return backendCart.items.map((item) => {
      const prod = item.product || {};
      const prodId = prod._id || item.product;
      const imageUrl = prod.images && prod.images.length > 0 ? prod.images[0].url : '';
      return {
        cartItemId: `${prodId}-${item.size}-Default`,
        id: prodId,
        name: prod.name || 'Product',
        price: item.price,
        image: imageUrl,
        category: prod.category || 'Clothing',
        size: item.size,
        color: 'Default',
        quantity: item.quantity,
      };
    });
  };

  // Load cart items on start or when user login status changes
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        setLoading(true);
        try {
          const { data } = await API.get('/cart');
          if (data && data.success) {
            setCart(mapBackendCartToFrontend(data.data));
          }
        } catch (err) {
          console.error("Failed to load cart from backend", err);
        } finally {
          setLoading(false);
        }
      } else {
        // Fallback to local storage for guests
        const savedCart = localStorage.getItem('om_cart');
        setCart(savedCart ? JSON.parse(savedCart) : []);
      }
    };

    loadCart();
  }, [user]);

  // Persist guest cart to local storage when it changes
  useEffect(() => {
    if (!user) {
      localStorage.setItem('om_cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = async (product, size = 'M', color = 'Default', quantity = 1) => {
    const productId = product._id || product.id;

    if (user) {
      try {
        const { data } = await API.post('/cart', {
          productId,
          quantity,
          size,
        });
        if (data && data.success) {
          setCart(mapBackendCartToFrontend(data.data));
        }
      } catch (err) {
        console.error("Error adding item to backend cart", err);
        alert(err.response?.data?.message || "Failed to add item to cart");
      }
    } else {
      // Local guest logic
      const cartItemId = `${productId}-${size}-${color}`;
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
        if (existingItemIndex > -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += quantity;
          return updatedCart;
        } else {
          return [
            ...prevCart,
            {
              cartItemId,
              id: productId,
              name: product.name,
              price: product.price,
              image: product.image || (product.images && product.images[0]?.url) || '',
              category: product.category,
              size,
              color,
              quantity,
            },
          ];
        }
      });
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (user) {
      try {
        // Parse productId and size from cartItemId (format: "productId-size-Default")
        const [productId, size] = cartItemId.split('-');
        const { data } = await API.delete('/cart', {
          data: { productId, size },
        });
        if (data && data.success) {
          setCart(mapBackendCartToFrontend(data.data));
        }
      } catch (err) {
        console.error("Error removing item from backend cart", err);
      }
    } else {
      // Guest local logic
      setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    if (user) {
      try {
        const [productId, size] = cartItemId.split('-');
        const { data } = await API.put('/cart', {
          productId,
          size,
          quantity,
        });
        if (data && data.success) {
          setCart(mapBackendCartToFrontend(data.data));
        }
      } catch (err) {
        console.error("Error updating cart quantity on backend", err);
        alert(err.response?.data?.message || "Failed to update quantity");
      }
    } else {
      // Guest local logic
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
    if (!user) {
      localStorage.removeItem('om_cart');
    }
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

