import { accentColor } from '../../constants/colors';
import styled from 'styled-components';

export default function ItemCheckout({ item }) {
	return (
		<Container>
			<ImageBox>
				<img src={item.mainimage} alt={item.name} />
			</ImageBox>
			<Information>
				<TopBox>
					<h1>{item.name}</h1>
				</TopBox>
				<BottonBox>
					<h1>Itens: {item.amount}</h1>
					<h2>{String((item.amount * item.price).toFixed(2)).replace('.', ',')}</h2>
				</BottonBox>
			</Information>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	height: 100px;
	border-bottom: 1px solid ${accentColor};
	&:first-of-type {
		border-top: 1px solid ${accentColor};
	}
`;

const TopBox = styled.div`
	display: flex;
	justify-content: space-between;
	h1 {
		font-size: 14px;
	}
`;

const BottonBox = styled.div`
	display: flex;
	justify-content: space-between;
	h2 {
		font-size: 16px;
	}
`;

const ImageBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 80px;
	height: 80px;
	background-color: #fff;
	img {
		height: 50px;
	}
`;

const Information = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 70px;
	margin-left: 15px;
	padding-right: 20px;
`;
