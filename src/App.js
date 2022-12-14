import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CartPage from './pages/CartPage/CartPage.js';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.js';
import GlobalStyle from './assets/styles/GlobalStyle.js';
import Header from './components/Header.js';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage/PurchaseHistoryPage.js';
import SearchPage from './pages/SearchPage/SearchPage.js';
import { SearchProvider } from './contexts/SearchContext.js';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage.js';
import UserContext from './contexts/UserContext.js';

function App() {
	const [userData, setUserData] = useState(null);
	const [afterSignInGoTo, setAfterSignInGoTo] = useState('/');

	useEffect(() => {
		const getUser = localStorage.getItem('userE-geek');
		if (getUser !== null) {
			setUserData(JSON.parse(getUser));
		}
	}, []);

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ userData, setUserData, afterSignInGoTo, setAfterSignInGoTo }}>
				<GlobalStyle />
				<SearchProvider>
					<Header />
					<Routes>
						<Route path='/' element={<ProductsPage />} />
						<Route path='/sign-up' element={<SignUpPage />} />
						<Route path='/sign-in' element={<SignInPage />} />
						<Route path='/history' element={<PurchaseHistoryPage />} />
						<Route path='/product/:id' element={<SingleProductPage />} />
						<Route path='/search' element={<SearchPage />} />
						<Route path='/cart' element={<CartPage />} />
						<Route path='/checkout' element={<CheckoutPage />} />
					</Routes>
				</SearchProvider>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
