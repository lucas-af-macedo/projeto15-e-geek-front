import { useEffect, useState } from 'react';

import Product from './Product';
import axios from 'axios';
import mock from '../../constants/mock.js';
import styled from 'styled-components';

export default function ProductsPage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/products`)
			.then((res) => {
				console.log(res);
				setProducts(res.data);
			})
			.catch((err) => {
				setProducts(mock);
				console.log(err);
			});
	}, []);

	return (
		<ProductsContainer>
			<h1>Produtos</h1>
			<Products>
				{products?.map((product) => (
					<Product product={product} key={product._id} />
				))}
			</Products>
		</ProductsContainer>
	);
}

const ProductsContainer = styled.div`
	h1 {
		font-size: 30px;
		font-weight: 600;
	}
`;

const Products = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	width: 90%;
	height: 50%;
	margin: 0 auto;
	/* background-color: red; */
`;
