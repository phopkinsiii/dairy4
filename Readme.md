import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useEffect,
  useRef,
} from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.cartItems.find(
        item => item._id === action.payload._id
      );
      const quantityToAdd = action.payload.quantity || 1;

      const updatedItems = existing
        ? state.cartItems.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: quantityToAdd }];

      console.log('🟢 ADD_ITEM → Updated Cart:', updatedItems);
      return { ...state, cartItems: updatedItems };
    }

    case 'UPDATE_QUANTITY':
      console.log('🟡 UPDATE_QUANTITY', action.payload);
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'REMOVE_ITEM':
      console.log('🔴 REMOVE_ITEM', action.payload.id);
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item._id !== action.payload.id
        ),
      };

    case 'CLEAR_CART':
      console.log('🧹 CLEAR_CART called');
      return initialState;

    case 'SET_CART':
      console.log('🛒 SET_CART → Restored cart:', action.payload);
      return { ...state, cartItems: action.payload };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const hasHydrated = useRef(false);

  // Watch for rerenders
  console.log('📦 CartProvider Rendered. cartItems:', state.cartItems);

  // Initial load from localStorage
  useEffect(() => {
    console.log('🚀 CartProvider mounted');
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('🛒 Restoring cart from localStorage:', parsed);
        dispatch({ type: 'SET_CART', payload: parsed });
      } else {
        console.log('📭 No cart found in localStorage');
      }
    } catch (err) {
      console.error('❌ Error reading cart from localStorage:', err);
    } finally {
      hasHydrated.current = true; // ✅ finished hydration
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!hasHydrated.current) {
      console.log('⏳ Skipping save — hydration not complete');
      return;
    }

    try {
      console.log('💾 Saving cart to localStorage:', state.cartItems);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    } catch (err) {
      console.error('❌ Error saving cart to localStorage:', err);
    }
  }, [state.cartItems]);

  const subtotal = useMemo(() => {
    const total = state.cartItems.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    console.log('🧮 Calculated Subtotal:', total);
    return total;
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ ...state, dispatch, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);



