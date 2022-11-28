import { accentColor, detailColor, textAccentColor } from '../constants/colors';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Product({ product }) {
	const { name, price, mainimage, _id } = product;
	const navigate = useNavigate();
	const newName = name.split(' - ');

	return (
		<ProductBox onClick={() => navigate(`/product/${_id}`)}>
			<span>
				{newName.map((text, i) => (
					<p key={i}>{text}</p>
				))}
			</span>
			<span>
				<img src={mainimage} alt={name} />
			</span>
			<p> R$ {Number(price).toFixed(2).replace('.', ',')} </p>
			<CartOptions>
				<button>Adicionar ao carrinho</button>
			</CartOptions>
		</ProductBox>
	);
}

const ProductBox = styled.li`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 150px;
	height: 300px;
	margin: 5px;
	padding: 5px;
	border-radius: 5px;
	text-align: center;
	cursor: pointer;
	background-color: #fff;
	box-shadow: rgba(20, 30, 97, 0.16) 0px 1px 4px;
	position: relative;
	p {
		overflow-y: hidden;
		color: #000;
	}
	span:first-of-type {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: fit-content;
		margin: 0 auto;
	}
	span {
		width: 145px;

		img {
			width: 100%;
			background-color: #fff;
			object-fit: contain;
		}
	}
`;

const CartOptions = styled.div`
	display: ${(props) => (props.display ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	background-color: ${accentColor};
	opacity: 0.5;
	border-radius: 5px;
	button {
		box-shadow: none;
		border: none;
		width: fit-content;
		height: fit-content;
		z-index: 3;
		background-color: ${detailColor};
		border-radius: 5px;
		color: ${textAccentColor};
		cursor: pointer;
	}
`;
