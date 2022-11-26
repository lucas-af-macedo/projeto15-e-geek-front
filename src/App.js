import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import GlobalStyle from "./assets/styles/GlobalStyle.js";
import Header from "./components/Header.js";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage.js";
import UserContext from "./contexts/UserContext.js";

function App() {
	const [userData, setUserData] = useState(null);
	const [afterSignInGoTo, setAfterSignInGoTo] = useState("/");

	useEffect(() => {
		const getUser = localStorage.getItem("userE-geek");
		if (getUser !== null) {
			setUserData(JSON.parse(getUser));
		}
	}, []);

	return (
		<UserContext.Provider
			value={{ userData, setUserData, afterSignInGoTo, setAfterSignInGoTo }}
		>
			<BrowserRouter>
				<GlobalStyle />
				<Header />
				<Routes>
					<Route path="/" element={<ProductsPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/sign-in" element={<SignInPage />} />
					<Route path="/product/:id" element={<SingleProductPage />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
