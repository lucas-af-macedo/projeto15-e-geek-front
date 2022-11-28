import { accentColor, baseColor, detailColor, textBaseColor } from '../../constants/colors.js';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../../components/Loading.js';
import SearchContext from '../../contexts/SearchContext.js';
import UserContext from '../../contexts/UserContext.js';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert';

export default function SingleProductPage(props) {
	const navigate = useNavigate();
	const { userData, setUserData, setAfterSignInGoTo } = useContext(UserContext);
	const { setSearchInfo } = useContext(SearchContext);
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [form, setForm] = useState({ qty: 1, price: '' });
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		setSearchInfo({ tags: [] });

		setLoading(true);
		setAfterSignInGoTo(`/product/${id}`);
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/product/${id}`)
			.then((res) => {
				setLoading(false);
				if (!res.data) {
					swal({ text: 'Desculpe, não conseguimos encontrar esse produto', icon: 'warning' });
					navigate('/');
				} else {
					setProduct(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
				swal({ text: 'Desculpe, não conseguimos encontrar esse produto', icon: 'warning' });
				navigate('/');
			});
	}, [id, navigate]);

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

	function handleFormInput(e) {
		let { qty } = form;

		if (e.target.value >= 0) {
			qty = e.target.value;
		} else if (e.target.value === '') {
			qty = e.target.value;
		}
		setForm({ ...form, qty });
	}

	function handleFormInputLeave(e) {
		let { qty } = form;

		if (e.target.value < 1) {
			qty = 1;
		} else if (e.target.value === '') {
			qty = 1;
		}
		setForm({ ...form, qty });
	}

	function addCart() {
		setDisabled(true);
		const body = {
			amount: form.qty,
			productId: product._id,
		};

		if (userData) {
			const config = {
				headers: {
					authorization: `Bearer ${userData.token}`,
				},
			};

			axios
				.post(`${process.env.REACT_APP_API_BASE_URL}/cartItem`, body, config)
				.then((answer) => {
					swal('Produto adicionado ao carrinho com sucesso!', { icon: 'success' });
					setDisabled(false);
				})
				.catch((err) => {
					if (err.response.data.message === 'Produto ja adicionado ao carrinho!') {
						swal('Este produto ja está no seu carrinho!', { icon: 'error' });
					} else {
						swal('Houve um problema ao adicionar o produto ao carrinho!', { icon: 'error' });
					}
					console.log(err.response.data);
					setDisabled(false);
				});
		} else {
			axios
				.get(`${process.env.REACT_APP_API_BASE_URL}/NewSession`)
				.then((res) => {
					setUserData(res.data);
					const user = JSON.stringify(res.data);
					localStorage.setItem('userE-geek', user);
					const config = {
						headers: {
							authorization: `Bearer ${res.data.token}`,
						},
					};

					axios
						.post(`${process.env.REACT_APP_API_BASE_URL}/cartItem`, body, config)
						.then(answer=>{
					    swal("Produto adicionado ao carrinho com sucesso!", { icon: 'success' });
							setDisabled(false);
						})
						.catch((err) => {
							if (err.response.data.message === 'Produto ja adicionado ao carrinho!') {
								swal('Este produto ja está no seu carrinho!', { icon: 'error' });
							} else {
								swal('Houve um problema ao adicionar o produto ao carrinho!', { icon: 'error' });
							}
							console.log(err.response.data);
							setDisabled(false);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	return (
		<FalseBody>
			{loading ? (
				<Loading size={150} />
			) : (
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
							<h3>{product?.sizes?.join(' - ')}</h3>
							<AddCartBox>
								<h4>Quantidade:</h4>
								<form>
									<button id='decrement' type='button' onClick={handleForm}>
										&mdash;
									</button>
									<input
										type='number'
										value={form.qty}
										onChange={handleFormInput}
										onBlur={handleFormInputLeave}
									/>
									<button id='increment' type='button' onClick={handleForm}>
										&#xff0b;
									</button>
								</form>
								<AddCartButton onClick={addCart} disabled={disabled}>
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
			)}
		</FalseBody>
	);
}

const AddCartButton = styled.button`
	display: inline-flex;
	position: relative;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	height: 40px;
	margin-top: 1em;
	padding-right: 16px;
	padding-left: 16px;
	border-width: 0;
	border-radius: 7px;
	overflow: hidden;
	color: ${textBaseColor};
	font-size: 1em;
	line-height: 1;
	text-align: left;
	white-space: nowrap;
	cursor: pointer;
	background-color: ${baseColor};
	box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
		${detailColor} 0 -3px 0 inset;
	transition: box-shadow 0.15s, transform 0.15s;
	will-change: box-shadow, transform;
	appearance: none;
	touch-action: manipulation;
	:focus {
		box-shadow: ${detailColor} 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px, ${detailColor} 0 -3px 0 inset;
	}
	:hover {
		box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			${detailColor} 0 -3px 0 inset;
		transform: translateY(-2px);
	}
	:active {
		box-shadow: ${detailColor} 0 3px 7px inset;
		transform: translateY(2px);
	}
`;

const AddCartBox = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	h4 {
		margin-bottom: 2px;
		font-size: 15px;
	}
	form {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80px;
		max-width: 120px;
		margin-bottom: 5px;
		border-radius: 3px;
		font-size: 18px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		input {
			width: 60%;
			border: 0;
			border-top: 0 solid ${accentColor};
			border-bottom: 0 solid ${accentColor};
			text-align: center;
			-moz-appearance: textfield;
			::-webkit-outer-spin-button,
			::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
		input[type='number']::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}
		input[type='number'] {
			-moz-appearance: textfield;
			appearance: textfield;
		}
		button {
			width: 40%;
			height: 100%;
			border: 0 solid ${accentColor};
			color: ${textBaseColor};
			text-align: center;
			text-shadow: 0 1px 0 rgba(#fff, 0.6);
			cursor: pointer;
			background: white;
			&:hover {
				color: darken(${textBaseColor}, 20%);
				background: darken(${baseColor}, 10%);
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

const FalseBody = styled.div`
	width: 100vw;
	height: 100%;
	min-height: calc(100vh - 80px);
	margin-top: -10px;
`;

const Container = styled.div`
	width: 100vw;
	max-width: 100vw;
	margin: 0 auto;
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: ${baseColor};
	@media (min-width: 660px) {
		width: calc(100vw - 35px);
	}
`;

const SingleProductContainer = styled.div`
	background-color: white;
	//background-color: ${baseColor};
	width: 100vw;
	max-width: 100vw;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding-bottom: 10px;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	@media (min-width: 660px) {
		flex-direction: row;
		width: calc(100vw - 35px);
		max-width: 730px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const LeftDiv = styled.div`
	padding-left: 15px;
	padding-right: 15px;
	margin-top: 15px;
	font-size: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 15px;
	font-size: 20px;
	h1 {
		width: 100%;
	}
	p {
		width: 100%;
		margin-top: 15px;
		margin-bottom: 30px;
	}
	@media (min-width: 660px) {
		padding-left: 15px;
		padding-right: 15px;
		p {
			display: none;
		}
		h1 {
			display: none;
		}
	}
`;

const ImageBox = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	min-height: 250px;
	padding-bottom: 3px;
	//box-shadow: inset 0 -8px 3px -8px gray;
	img {
		width: 90vw;
		max-width: 450px;
		object-fit: contain;
	}
	@media (min-width: 660px) {
		img {
			max-width: 390px;
		}
	}
`;

const RightDiv = styled.div`
	padding-left: 15px;
	padding-right: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-height: 300px;
	p {
		display: none;
	}
	h1 {
		display: none;
	}
	h3 {
		display: ${(props) => (props.size === 'N/A' ? 'none' : 'block')};
	}
	@media (min-width: 660px) {
		padding-left: 0px;
		padding-right: 0px;
		margin-left: 20px;
		margin-top: 25px;
		width: 270px;
		margin-top: 25px;
		margin-bottom: 10px;
		margin-left: 20px;
		p {
			display: block;
			margin-top: 40px;
			font-size: 25px;
		}
		h1 {
			display: block;
			margin-bottom: 15px;
			font-size: 20px;
		}
	}
`;

const DescriptionBox = styled.div`
	padding-left: 15px;
	padding-right: 15px;
	margin-top: 20px;
	max-width: 100%;
	width: 100%;
	background-color: white;
	border-radius: 5px;
	padding-top: 10px;
	padding-bottom: 15px;
	h1 {
		font-size: 20px;
		width: 100%;
		font-size: 20px;
	}
	h2 {
		width: 100%;
		margin-top: 8px;
		padding-left: 15px;
		padding-right: 15px;
		width: 100%;
		margin-left: 5px;
	}
	@media (min-width: 660px) {
		max-width: 730px;
	}
`;
