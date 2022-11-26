import { useEffect, useState } from 'react';

import Loading from '../../components/Loading.js';
import Product from './Product.js';
import axios from 'axios';
import styled from 'styled-components';

export default function ProductsPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/products`)
			.then((res) => {
				setLoading(false);
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<ProductsContainer>
			<h1>Produtos</h1>
			{loading ? (
				<Loading size={150} />
			) : (
				<Products>
					{products?.map((product) => (
						<Product product={product} key={product._id} />
					))}
				</Products>
			)}
		</ProductsContainer>
	);
}

const ProductsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	h1 {
		width: 100%;
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
