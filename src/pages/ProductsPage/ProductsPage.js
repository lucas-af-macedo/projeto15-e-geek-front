import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { accentColor, baseColor, textBaseColor } from '../../constants/colors.js';
import { useEffect, useState } from 'react';

import Loading from '../../components/Loading.js';
import Product from './Product.js';
import axios from 'axios';
import styled from 'styled-components';

export default function ProductsPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [changePage, setChangePage] = useState({ page: '1', limit: '20' });
	const [lastPage, setLastPage] = useState(false);

	// handleProducts
	useEffect(() => {
		setLoading(true);
		axios
			.get(
				`${process.env.REACT_APP_API_BASE_URL}/products?page=${changePage.page}&limit=${changePage.limit}`
			)
			.then((res) => {
				setLoading(false);
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [changePage]);

	// handleLastPage
	useEffect(() => {
		if (products.length < changePage.limit && products.length !== 0) {
			setLastPage(true);
		} else {
			setLastPage(false);
		}
	}, [products, changePage.limit]);

	function handlePage(action) {
		let newPage = Number(changePage.page);
		if (action === 'next') {
			if (lastPage === false) {
				newPage++;
				setChangePage({ ...changePage, page: newPage });
			}
		} else {
			if (newPage <= 1) {
				return;
			} else {
				newPage--;
				setChangePage({ ...changePage, page: newPage });
			}
		}
	}
	console.log(
		'length   :',
		products.length,
		'\nlimit   :',
		Number(changePage.limit),
		'\nlastPage   :',
		lastPage
	);

	return (
		<ProductsContainer>
			<h1>Produtos</h1>
			{loading ? (
				<Loading size={150} />
			) : (
				<>
					<Products>
						{products?.map((product) => (
							<Product product={product} key={product._id} />
						))}
					</Products>

					<ChangePages>
						<PreviousPage
							size='1.5em'
							color={accentColor}
							id='descrease'
							onClick={() => handlePage('previous')}
						/>
						<p>Página {changePage.page}</p>
						<NextPage
							size='1.5em'
							color={accentColor}
							id='increase'
							onClick={() => handlePage('next')}
						/>
					</ChangePages>
				</>
			)}
		</ProductsContainer>
	);
}

const ProductsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 25px 25px;
	max-height: 100vh;
	h1 {
		width: 100%;
		font-size: 30px;
		font-weight: 600;
		margin-bottom: 10px;
	}
	@media (min-width: 660px) {
		margin: 50px 25px 0 25px;
	}
`;

const Products = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	width: fit-content;
	height: fit-content;
	max-height: 75vh;
	margin: 0 auto;
	overflow-y: auto;
	/* background-color: red; */

	@media (min-width: 660px) {
		height: fit-content;
		max-height: 80vh;
		justify-content: flex-start;
	}
`;

const ChangePages = styled.div`
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	font-weight: 500;
	color: ${textBaseColor};
	margin-top: 10px;
	p {
		text-align: center;
		height: 1.5em;
		line-height: 1.5em;
		margin: 0 10px;
	}
`;

const PreviousPage = styled(FaArrowAltCircleLeft)`
	cursor: pointer;
`;

const NextPage = styled(FaArrowAltCircleRight)`
	cursor: pointer;
`;
