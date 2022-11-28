import { useContext, useEffect, useState } from 'react';

import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import styled from 'styled-components';

export default function PurchaseHistoryPage() {
	const { userData, setUserData } = useContext(UserContext);
	const [purchases, setPurchases] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		let userSend = userData;
		if (userData === null) {
			const getUser = localStorage.getItem('userE-geek');
			if (getUser !== null) {
				setUserData(JSON.parse(getUser));
				userSend = JSON.parse(getUser);
			}
		}

		if (userSend !== null) {
			const config = {
				headers: {
					authorization: `Bearer ${userSend.token}`,
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
		}
	}, []);

	return (
		<PurchaseHistoryContainer>
			<h1>Histórico de Compras</h1>
			{purchases?.map(() => {
				return (
					<Purchases>
						<PurchasesTop>a</PurchasesTop>
						<PurchasesBottom>b</PurchasesBottom>
					</Purchases>
				);
			})}
		</PurchaseHistoryContainer>
	);
}

const PurchaseHistoryContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	max-height: 100vh;
	margin: 0 25px 25px;
	h1 {
		font-weight: 600;
		font-size: 1.3em;
	}
	@media (min-width: 660px) {
		margin: 50px 25px 0 25px;
	}
`;

const Purchases = styled.div``;

const PurchasesTop = styled.div``;

const PurchasesBottom = styled.div``;
