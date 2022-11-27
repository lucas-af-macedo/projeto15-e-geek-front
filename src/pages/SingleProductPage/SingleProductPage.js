import { accentColor, baseColor, textBaseColor } from '../../constants/colors.js';
import { useEffect, useState, useContext } from 'react';

import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext.js';

export default function SingleProductPage(props) {
	const { userData, setUserData } = useContext(UserContext);
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [form, setForm] = useState({ qty: 1, price: '' });

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`)
			.then((res) => {
				setProduct(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	function handleForm(e) {
		let { qty } = form;

		if (e.target.id === 'increment') {
			qty++;
		} else {
			if (qty <= 1) return;
			qty--;
		}
		setForm({ ...form, qty });
	}

	function handleFormInput(e){
		let { qty } = form;
		
		if (e.target.value>=0){
			qty = e.target.value
		} else if (e.target.value === ''){
			qty = e.target.value
		}
		setForm({ ...form, qty });
	}

	function handleFormInputLeave(e){
		let { qty } = form;

		if (e.target.value<1){
			qty = 1
		} else if (e.target.value === ''){
			qty = 1
		}
		setForm({ ...form, qty });
	}

	function addCart(){
		const body = {
			amount: form.qty,
			productId: product._id
		}

		if(userData){
			const config = {
				headers: {
					authorization: `Bearer ${userData.token}`
				}
			}
			
			axios
				.post(`${process.env.REACT_APP_API_BASE_URL}/cartItem`, body, config)
				.catch((err) => {
					console.log(err);
				});
			
		}else{
			axios
				.get(`${process.env.REACT_APP_API_BASE_URL}/NewSession`)
				.then((res) => {
					setUserData(res.data);
					const config = {
						headers: {
							authorization: `Bearer ${res.data.token}`
						}
					}
					axios
						.post(`${process.env.REACT_APP_API_BASE_URL}/cartItem`, body, config)
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}



	return (
		<FalseBody>
			<Container>
				<SingleProductContainer>
					<LeftDiv>
						<h1>{product.name}</h1>
						<ImageBox>
							<img src={product.mainimage} alt={product.name} />
						</ImageBox>
						<p>R$ {Number(product.price).toFixed(2).replace('.', ',')}</p>
					</LeftDiv>
					<RightDiv size={product?.sizes?.join(' ')}>
						<h1>{product.name}</h1>
						<p>R$ {Number(product.price).toFixed(2).replace('.', ',')}</p>
						<h3>{product?.sizes?.join(' ')}</h3>
						<AddCartBox>
							<h4>Quantidade:</h4>
							<form>
								<button id='decrement' type='button' onClick={handleForm}>
									&mdash;
								</button>
								<input type='number' value={form.qty} onChange={handleFormInput} onBlur={handleFormInputLeave} />
								<button id='increment' type='button' onClick={handleForm}>
									&#xff0b;
								</button>
							</form>
							<AddCartButton onClick={addCart}>
								Adicionar ao Carrinho
							</AddCartButton>
						</AddCartBox>
					</RightDiv>
				</SingleProductContainer>
				<DescriptionBox>
					<h1>Descrição</h1>
					<h2>{product.description}</h2>
				</DescriptionBox>
			</Container>
		</FalseBody>
	);
}

const AddCartButton =  styled.button`
	height: 40px;
	width: 100%;
	border-radius: 7px;
	margin-top: 15px;
`

const AddCartBox = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	h4{
		margin-bottom: 2px;
		font-size: 15px;
	}
	form {
		display: flex;
		margin-bottom: 5px;
		justify-content: center;
		align-items: center;
		width: 80px;
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
`

const FalseBody = styled.div`
	margin-top: -10px;
	width: 100vw;
	min-height: calc(100vh - 80px);
	height: 100%;
`

const Container = styled.div`
	background-color: white;
	width: calc(100vw - 35px);
	max-width: 100vw;
	margin: 0 auto;
	display: flex;
	align-items: center;
	flex-direction: column;
`

const SingleProductContainer = styled.div`
	background-color: white;
	width: calc(100vw - 35px);
	max-width: 100vw;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;

	@media (min-width: 660px) {
		flex-direction: row;
	}
`;

const LeftDiv = styled.div`
	margin-top: 15px;
	font-size: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	h1{
		width: 100%;
	}
	p{
		width: 100%;
		margin-bottom: 30px;
		margin-top: 15px;
	}
	@media (min-width: 660px) {
		p{
			display: none;
		}
		h1{
			display: none;
		}
	}
`;

const ImageBox = styled.div`
	width: 100%;
	display: flex;
	min-height: 250px;
	justify-content: center;
	//box-shadow: inset 0 -8px 3px -8px gray;
	padding-bottom: 3px;
	img {
		width: 90vw;
		max-width: 450px;
		object-fit: contain;
	}
	@media (min-width: 660px) {
		img{
			max-width: 390px;
		}
	}
`

const RightDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-height: 300px;
	p{
		display: none;
	}
	h1{
		display: none;
	}
	h3{
		display: ${props => (props.size === 'N/A')? 'none':'block' };
	}
	@media (min-width: 660px) {
		margin-left: 20px;
		margin-top: 25px;
		width: 270px;
		margin-bottom: 10px;
		p{
			font-size: 25px;
			margin-top: 40px;
			display: block;
		}
		h1{
			font-size: 20px;
			display: block;
			margin-bottom: 15px;
		}
	}
`;

const DescriptionBox = styled.div`
	margin-top: 30px;
	max-width: 660px;
	width: 100%;
	h1{
		font-size: 20px;
		width: 100%;
	}
	h2{
		margin-top: 8px;
		margin-left: 5px;
		width: 100%;
	}
`
