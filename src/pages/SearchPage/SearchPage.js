import { accentColor, detailColor } from '../../constants/colors.js';
import { useContext, useEffect, useState } from 'react';

import Loading from '../../components/Loading.js';
import SearchContext from '../../contexts/SearchContext.js';
import SearchMain from './SearchMain.js';
import axios from 'axios';
import styled from 'styled-components';

export default function SearchPage() {
	const { searchInfo } = useContext(SearchContext);
	const [products, setProducts] = useState([]);
	const [changePage, setChangePage] = useState({ page: '1', limit: '20' });
	const [lastPage, setLastPage] = useState(false);
	const [loading, setLoading] = useState(false);
	console.log(searchInfo);

	useEffect(() => {
		setLoading(true);
		axios
			.get(
				`${process.env.REACT_APP_API_BASE_URL}/search?page=${changePage.page}&limit=${changePage.limit}${
					searchInfo.tags.length === 0 ? '' : `&tags=${searchInfo.tags}`
				}`
			)
			.then((res) => {
				setLoading(false);
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [changePage, searchInfo.tags]);

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
		<SearchContainer>
			<SearchHeader>
				<h1>Pesquisa</h1>
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
			</SearchHeader>
			<SearchDescription>
				Procurando por: <p>{searchInfo.tags.join(' ')}</p>
			</SearchDescription>
			{loading ? (
				<Loading size={150} />
			) : (
				<SearchMain products={products} handlePage={handlePage} changePage={changePage} />
			)}
		</SearchContainer>
	);
}

const SearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-height: 100vh;
	margin: 0 25px 25px;
	span {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 70vh;
		color: ${accentColor};
	}
	@media (min-width: 660px) {
		margin: 50px 25px 0 25px;
	}
`;
const SearchHeader = styled.div`
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

const SearchDescription = styled.div`
	display: inline-flex;
	width: 100%;
	color: ${detailColor};
	font-weight: 300;
	font-size: 1em;
	p {
		margin-left: 0.5em;
		text-transform: capitalize;
	}
`;
