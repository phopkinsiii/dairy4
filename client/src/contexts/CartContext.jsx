// @ts-nocheck
import {
	createContext,
	useReducer,
	useContext,
	useEffect,
	useMemo,
} from 'react';

const CartContext = createContext();

const initialState = {
	cartItems: [],
};

function cartReducer(state, action) {
	switch (action.type) {
		case 'ADD_ITEM': {
			const existing = state.cartItems.find(
				(item) => item._id === action.payload._id
			);
			const quantityToAdd = action.payload.quantity || 1;

			const updatedItems = existing
				? state.cartItems.map((item) =>
						item._id === action.payload._id
							? { ...item, quantity: item.quantity + quantityToAdd }
							: item
				  )
				: [...state.cartItems, { ...action.payload, quantity: quantityToAdd }];

			console.log('🟢 ADD_ITEM →', updatedItems);
			return { ...state, cartItems: updatedItems };
		}

		case 'SET_CART':
			console.log('🛒 SET_CART → Restored cart:', action.payload);
			return { ...state, cartItems: action.payload };

		case 'UPDATE_QUANTITY':
			return {
				...state,
				cartItems: state.cartItems.map((item) =>
					item._id === action.payload.id
						? { ...item, quantity: action.payload.quantity }
						: item
				),
			};

		case 'REMOVE_ITEM':
			return {
				...state,
				cartItems: state.cartItems.filter(
					(item) => item._id !== action.payload.id
				),
			};

		case 'CLEAR_CART':
			return { ...state, cartItems: [] };

		default:
			return state;
	}
}

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	console.log('📦 CartProvider Rendered. cartItems:', state.cartItems);

	useEffect(() => {
		console.log('🚀 CartProvider mounted');
		const stored = localStorage.getItem('cart');
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				console.log('🛒 Restoring cart from localStorage:', parsed);
				dispatch({ type: 'SET_CART', payload: parsed });
			} catch (err) {
				console.error('❌ Error parsing stored cart:', err);
			}
		}
	}, []);

	useEffect(() => {
		console.log('💾 Saving cart to localStorage:', state.cartItems);
		localStorage.setItem('cart', JSON.stringify(state.cartItems));
	}, [state.cartItems]);

	const subtotal = useMemo(() => {
		return state.cartItems.reduce(
			(acc, item) => acc + item.price * (item.quantity || 1),
			0
		);
	}, [state.cartItems]);

	return (
		<CartContext.Provider value={{ ...state, dispatch, subtotal }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => useContext(CartContext);
