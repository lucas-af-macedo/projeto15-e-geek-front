import { accentColor, textAccentColor } from '../../constants/colors';

import dayjs from 'dayjs';
import styled from 'styled-components';

export default function Purchase({ purchase }) {
	const date = dayjs(purchase.purchasedate).locale('pt-br').format('DD MMMM YYYY').split(' ');
	const sum = () => {
		let total = 0;
		for (const product of purchase.products) {
			total += product.price * product.amount;
		}
		return Number(total).toFixed(2);
	};
	return (
		<PurchaseBox>
			<PurchasesTop>
				<div>
					<h1>Data da Compra</h1>
					<p>
						{date[0]} de {date[1]} de {date[2]}
					</p>
				</div>
				<div>
					<h1>Total</h1>
					<p>R$ {sum()}</p>
				</div>
				<div>
					<h1>Pedido nº</h1>
					<p>{purchase._id}</p>
				</div>
			</PurchasesTop>
			<PurchasesBottom>
				{purchase?.products?.map((product) => {
					return (
						<Product>
							<span>
								<img src={product.mainimage} alt={product.name} />
							</span>
							<p>
								({product.amount} x) {product.name}
							</p>
							<p>R$ {Number(product.price).toFixed(2)}</p>
						</Product>
					);
				})}
			</PurchasesBottom>
		</PurchaseBox>
	);
}

const PurchaseBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-bottom: 1.5em;
	border-radius: 5px;
	padding: 0.8em;
	font-size: 1rem;
	border: 1px solid ${accentColor};
	background-color: ${textAccentColor};
	h1 {
		font-size: 0.8rem;
		text-transform: uppercase;
	}
	p {
		font-size: 1rem;
	}
`;

const PurchasesTop = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 0.8em;
	border-bottom: 1px solid ${accentColor};
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		:last-of-type {
			display: none;
		}
	}
	@media (min-width: 660px) {
		div {
			:last-of-type {
				display: flex;
			}
		}
	}
`;

const PurchasesBottom = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 0.8em;
	width: 100%;
`;

const Product = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	margin: 0 5px;
	border-bottom: 1px solid ${accentColor};
	padding: 0.8em 0;
	span {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 10%;
		img {
			border-radius: 3px;
			width: 100%;
			object-fit: contain;
		}
	}
	p {
		max-width: 60%;
		font-size: 0.8em;
	}
	:last-child {
		border-bottom: none;
	}
	@media (min-width: 660px) {
		p {
			font-size: 1em;
		}
	}
`;
