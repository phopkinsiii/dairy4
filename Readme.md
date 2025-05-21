export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          dispatch({ type: 'SET_CART', payload: parsed });
        } catch (err) {
          console.error('❌ Failed to parse cart:', err);
        }
      }
      hasInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (hasInitialized.current) {
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    }
  }, [state.cartItems]);

  const subtotal = state.cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider value={{ ...state, dispatch, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};
