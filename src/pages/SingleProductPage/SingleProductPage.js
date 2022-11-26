import { accentColor, baseColor, textBaseColor } from '../../constants/colors.js';
import { useEffect, useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

export default function SingleProductPage(props) {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [form, setForm] = useState({ qty: 0, price: '' });

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`)
			.then((res) => {
				console.log(res.data);
				setProduct(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	function handleForm(e) {
		let { qty } = form;
		console.log(qty);

		if (e.target.id === 'increment') {
			qty++;
		} else {
			if (qty <= 0) return;
			qty--;
		}
		console.log(qty);
		setForm({ ...form, qty });
	}

	return (
		<SingleProductContainer>
			<LeftDiv>
				<h1>{product.name}</h1>
				<img src={product.mainimage} alt={product.name} />
			</LeftDiv>
			<RightDiv>
				<h2>{product.description}</h2>
				<h2>{product?.sizes?.join(' ')}</h2>
				<form>
					<button id='decrement' type='button' onClick={handleForm}>
						&mdash;
					</button>
					<input type='text' value={form.qty} />
					<button id='increment' type='button' onClick={handleForm}>
						&#xff0b;
					</button>
				</form>
				<p>R$ {Number(product.price).toFixed(2).replace('.', ',')}</p>
			</RightDiv>
		</SingleProductContainer>
	);
}

const SingleProductContainer = styled.div`
	width: fit-content;
	max-width: 100vw;
	margin: 0 auto;
	display: flex;
	flex-direction: column;

	@media (min-width: 660px) {
		flex-direction: row;
	}
`;

const LeftDiv = styled.div`
	img {
		max-width: 90vw;
		object-fit: contain;
	}
`;

const RightDiv = styled.div`
	display: flex;
	flex-direction: column;

	form {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30vw;
		max-width: 120px;
		border-radius: 3px;
		font-size: 18px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		input {
			width: 60%;
			border: 0;
			border-top: 0 solid ${accentColor};
			border-bottom: 0 solid ${accentColor};
			text-align: center;
		}
		button {
			width: 40%;
			border: 0 solid ${accentColor};
			color: ${textBaseColor};
			text-align: center;
			text-shadow: 0 1px 0 rgba(#fff, 0.6);
			cursor: pointer;
			background: ${baseColor};
			&:hover {
				background: darken(${baseColor}, 10%);
				color: darken(${textBaseColor}, 20%);
			}
			&--left {
				border-radius: 3px 0 0 3px;
			}
			&--right {
				border-radius: 0 3px 3px 0;
			}
		}
	}
`;
