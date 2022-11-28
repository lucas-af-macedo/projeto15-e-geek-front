import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Product({ product }) {
	const { name, price, mainimage, _id } = product;
	const navigate = useNavigate();
	const newName = name.split(' - ');

	return (
		<ProductBox onClick={() => navigate(`/product/${_id}`)}>
			<div>
				{newName.map((text) => (
					<p>{text}</p>
				))}
			</div>
			<div>
				<img src={mainimage} alt={name} />
			</div>
			<p> R$ {Number(price).toFixed(2).replace('.', ',')} </p>
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
	p {
		overflow-y: hidden;
		color: #000;
	}
	div:first-of-type {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: fit-content;
		margin: 0 auto;
	}
	div {
		width: 145px;

		img {
			width: 100%;
			background-color: #fff;
			object-fit: contain;
		}
	}
`;
