import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductsPage from './pages/ProductsPage/ProductsPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<ProductsPage />} />
				<Route path='/sign-up' element={<SignUpPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
