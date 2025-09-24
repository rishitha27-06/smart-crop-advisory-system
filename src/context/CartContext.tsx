import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: 'crop' | 'input' | 'machinery';
}

interface CartState {
  items: CartItem[];
  total: number;
  isLoggedIn: boolean;
  loading: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: CartState = {
  items: [],
  total: 0,
  isLoggedIn: false,
  loading: false,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: updatedItems, total };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: updatedItems, total };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: updatedItems, total };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };

    case 'LOGIN':
      return { ...state, isLoggedIn: true };

    case 'LOGOUT':
      return { ...state, isLoggedIn: false, items: [], total: 0 };

    case 'SET_CART':
      const total = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...state, items: action.payload, total };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  login: () => void;
  logout: () => void;
  fetchCart: () => Promise<void>;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { state: authState } = useAuth();

  const fetchCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await api.get('/cart');
      dispatch({ type: 'SET_CART', payload: response.data.data.items });
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addItem = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      await api.post('/cart/add', {
        productId: item.id,
        productType: item.category === 'crop' ? 'Crop' : item.category === 'input' ? 'Input' : 'Machinery',
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
      await fetchCart(); // Refresh cart from server
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };

  const removeItem = async (id: string) => {
    try {
      await api.delete(`/cart/${id}`);
      await fetchCart(); // Refresh cart from server
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      await api.put(`/cart/${id}`, { quantity });
      await fetchCart(); // Refresh cart from server
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart');
      await fetchCart(); // Refresh cart from server
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const login = () => {
    dispatch({ type: 'LOGIN' });
    fetchCart(); // Fetch cart when user logs in
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Sync with AuthContext
  useEffect(() => {
    if (authState.token) {
      dispatch({ type: 'LOGIN' });
      fetchCart();
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, [authState.token]);

  const getCartItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    if (state.isLoggedIn) {
      fetchCart();
    }
  }, [state.isLoggedIn]);

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      login,
      logout,
      fetchCart,
      getCartItemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
