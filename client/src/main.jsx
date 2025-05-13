// @ts-nocheck
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ProductProvider } from './contexts/ProductContext.jsx'; // note the .jsx extension
import { CartProvider } from './contexts/CartContext.jsx';
import { ContactProvider } from './contexts/ContactContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { NavbarProvider } from './contexts/NavbarContext.jsx';

createRoot(document.getElementById('root')).render(
	//<StrictMode>
		<CartProvider>
		<ProductProvider>
			
				<ContactProvider>
					<UserProvider>
						<BrowserRouter>
							<NavbarProvider>
								<App />
							</NavbarProvider>
						</BrowserRouter>
					</UserProvider>
				</ContactProvider>
			
		</ProductProvider>
		</CartProvider>
	//</StrictMode>
);
