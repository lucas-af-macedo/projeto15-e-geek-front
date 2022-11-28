import { useContext, useEffect, useState } from 'react';

import Loading from '../../components/Loading.js';
import Purchase from './Purchase';
import SearchContext from '../../contexts/SearchContext.js';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function PurchaseHistoryPage() {
	const navigate = useNavigate();
	const { userData } = useContext(UserContext);
	const { setSearchInfo } = useContext(SearchContext);
	const [purchases, setPurchases] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setSearchInfo({ tags: [] });
		setLoading(true);

		if (userData && userData?.isLogged) {
			const config = {
				headers: {
					authorization: `Bearer ${userData.token}`,
				},
			};
			axios
				.get(`${process.env.REACT_APP_API_BASE_URL}/purchases`, config)
				.then((res) => {
					setLoading(false);
					setPurchases(res.data);
				})
				.catch((err) => {
					setLoading(false);
					console.log(err.response);
				});
		} else {
			swal({ text: 'Você precisa estar logado para acessar essa página', icon: 'warning' });
			navigate('/');
		}
	}, [navigate, setSearchInfo]);

	function renderPurchases() {
		return (
			<Purchases>
				{purchases?.map((purchase) => (
					<Purchase purchase={purchase} key={purchase._id} />
				))}
			</Purchases>
		);
	}

	return (
		<PurchaseHistoryContainer>
			<PurchaseHistoryHeader>
				<h1>Histórico de Compras</h1>
			</PurchaseHistoryHeader>
			{loading ? <Loading /> : renderPurchases()}
		</PurchaseHistoryContainer>
	);
}

const PurchaseHistoryHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
	h1 {
		font-weight: 600;
		font-size: 1.6em;
	}
`;

const PurchaseHistoryContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 85vh;
	max-height: 90vh;
	margin: 0 25px 25px;
	h1 {
		font-weight: 600;
		font-size: 1.3em;
	}
	@media (min-width: 660px) {
		height: 90vh;
		margin: 50px 25px 0 25px;
	}
`;

const Purchases = styled.div`
	width: 100%;
	height: 90%;
	@media (min-width: 660px) {
		height: 85%;
		max-width: 80%;
	}
`;
