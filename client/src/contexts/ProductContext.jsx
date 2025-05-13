/* eslint-disable react-refresh/only-export-components */
// @ts-nocheck
import React, {
	createContext,
	useReducer,
	useContext,
	useCallback,
} from 'react';
import axiosInstance from '../api/axios';

const initialProductState = {
	products: [],
	loading: false,
	error: null,
};

const productReducer = (state, action) => {
	switch (action.type) {
		case 'SET_LOADING':
			return { ...state, loading: action.payload };
		case 'SET_PRODUCTS':
			return { ...state, products: action.payload };
		case 'SET_ERROR':
			return { ...state, error: action.payload, loading: false };
		case 'DELETE_PRODUCT':
			return {
				...state,
				products: state.products.filter(
					(product) => product._id !== action.payload
				),
			};
		default:
			return state;
	}
};

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(productReducer, initialProductState);
	// console.log('Product context state:', state);
	//Memoize fetchProducts
	const fetchProducts = useCallback(async () => {
		try {
			dispatch({ type: 'SET_LOADING', payload: true });
			const response = await axiosInstance.get('/products');
			dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
		} catch (error) {
			const errorMessage = error.response
				? error.response.data.message || 'Failed to fetch products'
				: error.message;
			dispatch({ type: 'SET_ERROR', payload: errorMessage });
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false });
		}
	}, []);

	const deleteProduct = useCallback(async (productId, token) => {
		try {
			dispatch({ type: 'SET_LOADING', payload: true });

			await axiosInstance.delete(`/products/${productId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			dispatch({ type: 'DELETE_PRODUCT', payload: productId });
		} catch (error) {
			const errorMessage = error.response
				? error.response.data.message || 'Failed to delete Product'
				: error.message;
			dispatch({ type: 'SET_ERROR', payload: errorMessage });
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false });
		}
	}, []);

	return (
		<ProductContext.Provider
			value={{ state, dispatch, fetchProducts, deleteProduct }}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => useContext(ProductContext);
