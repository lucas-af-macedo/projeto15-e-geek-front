import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyle from './assets/styles/GlobalStyle.js';
import Header from './components/Header.js';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage.js';
import GlobalStyle from './assets/css/GlobalStyle.js'

function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Header />
			<Routes>
				<Route path='/' element={<ProductsPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
				<Route path='/sign-in' element={<SignInPage />} />
        <Route path='/product/:id' element={<SingleProductPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
