import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductsPage from './pages/ProductsPage/ProductsPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import GlobalStyle from './assets/css/GlobalStyle'

function App() {
	return (
		<BrowserRouter>
			<GlobalStyle/>
			<Routes>
				<Route path='/' element={<ProductsPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
				<Route path='/sign-in' element={<SignInPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
