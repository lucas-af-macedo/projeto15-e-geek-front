import { useEffect, useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';

export default function PurchaseHistoryPage() {
	const [purchases, setPurchases] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchases`).then().catch();
	});

	return (
		<PurchaseHistoryContainer>
			<h1>Histórico de Compras</h1>
			<Purchases>
				<PurchasesTop></PurchasesTop>
				<PurchasesBottom></PurchasesBottom>
			</Purchases>
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
