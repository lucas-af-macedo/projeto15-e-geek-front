import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { accentColor, textBaseColor } from '../../constants/colors.js';
import { useContext, useEffect, useState } from 'react';

import Loading from '../../components/Loading.js';
import Product from '../../components/Product.js';
import SearchContext from '../../contexts/SearchContext.js';
import axios from 'axios';
import styled from 'styled-components';

export default function ProductsPage() {
	const { setSearchInfo } = useContext(SearchContext);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [changePage, setChangePage] = useState({ page: '1', limit: '20' });
	const [lastPage, setLastPage] = useState(false);

	// handleProducts
	useEffect(() => {
		setSearchInfo({ tags: [] });
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

	function handleLimit(value) {
		const newLimit = Number(value);
		console.log(newLimit);
		setChangePage({ ...changePage, limit: newLimit });
	}

	return (
		<ProductsContainer>
			<ProductsHeader>
				<h1>Produtos</h1>
				<div>
					<label htmlFor='id'>produtos por página:</label>
					<select name='limit' id='limit' onChange={(e) => handleLimit(e.target.value)}>
						<option value='20'>20</option>
						<option value='30'>30</option>
						<option value='40'>40</option>
						<option value='50'>50</option>
						<option value='60'>100</option>
					</select>
				</div>
			</ProductsHeader>
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
	justify-content: center;
	align-items: center;
	max-height: 100vh;
	margin: 0 25px 25px;
	@media (min-width: 660px) {
		margin: 50px 25px 0 25px;
	}
`;

const ProductsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
	h1 {
		font-weight: 600;
		font-size: 1.6em;
	}
	label {
		font-size: 1em;
		font-weight: 300;
		margin-right: 10px;
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
	@media (min-width: 660px) {
		justify-content: flex-start;
		height: fit-content;
		max-height: 80vh;
	}
`;

const ChangePages = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;
	margin-top: 10px;
	color: ${textBaseColor};
	font-weight: 500;
	font-size: 1rem;
	p {
		height: 1.5em;
		margin: 0 10px;
		line-height: 1.5em;
		text-align: center;
	}
`;

const PreviousPage = styled(FaArrowAltCircleLeft)`
	cursor: pointer;
`;

const NextPage = styled(FaArrowAltCircleRight)`
	cursor: pointer;
`;
