import React, { useContext, useEffect } from 'react';
import { baseColor, detailColor, textBaseColor } from '../../constants/colors.js';

import ItemCart from './ItemCart.js';
import Loading from '../../components/Loading.js';
import SearchContext from '../../contexts/SearchContext.js';
import UserContext from '../../contexts/UserContext.js';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
	const { userData, setUserData, setAfterSignInGoTo } = useContext(UserContext);
	const { setSearchInfo } = useContext(SearchContext);
	const [cartItens, setCartItens] = React.useState([]);
	const [total, setTotal] = React.useState(0);
	const [disableBuy, setDisableBuy] = React.useState(false);
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(false);

	useEffect(() => {
		setSearchInfo({ tags: [] });
		setLoading(true);
		setAfterSignInGoTo('/cart');
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
				.get(`${process.env.REACT_APP_API_BASE_URL}/cartItens`, config)
				.then((answer) => {
					setLoading(false);
					setCartItens(answer.data);
					let totalCart = 0;
					answer.data.forEach((element) => {
						totalCart = totalCart + element.price * element.amount;
					});
					setTotal(totalCart);
				})
				.catch((answer) => {
					setLoading(false);
					console.log(answer.data);
				});
		} else {
			setLoading(false);
		}
	}, []);

	function reloadComponent() {
		setDisableBuy(true);
		const config = {
			headers: {
				authorization: `Bearer ${userData.token}`,
			},
		};

		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/cartItens`, config)
			.then((answer) => {
				setDisableBuy(false);
				setCartItens(answer.data);
				let totalCart = 0;
				answer.data.forEach((element) => {
					totalCart = totalCart + element.price * element.amount;
				});
				setTotal(totalCart);
			})
			.catch((answer) => {
				setDisableBuy(false);
				console.log(answer.data);
			});
	}

	function goToCheckout() {
		navigate('/checkout');
	}

	function goToSignIn() {
		navigate('/sign-in');
	}

	return (
		<Container>
			{loading ? (
				<Loading size={150} />
			) : cartItens.length ? (
				<>
					<CartBox>
						<H1>Carrinho</H1>
						{cartItens.map((element) => (
							<ItemCart
								key={element._id}
								item={element}
								reloadComponent={reloadComponent}
								setDisableBuy={setDisableBuy}
							/>
						))}
						<TotalBox>
							<h1>Total:</h1>
							<h2>R$ {String(total.toFixed(2).replace('.', ','))}</h2>
						</TotalBox>
					</CartBox>
					<CloseCart>
						{userData?.isLogged ? (
							<button onClick={goToCheckout} disabled={disableBuy}>
								Comprar
							</button>
						) : (
							<button onClick={goToSignIn} disabled={disableBuy}>
								Fazer Login
							</button>
						)}
					</CloseCart>
				</>
			) : (
				<Nothing>
					<h1>O seu carrinho esta vazio</h1>
				</Nothing>
			)}
		</Container>
	);
}

const H1 = styled.h1`
	font-size: 1.5em;
	width: calc(100% - 50px);
	margin-bottom: 25px;
`;

const Container = styled.div`
	height: 100%;
	margin-top: -10px;
	min-height: calc(100vh - 80px);
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CartBox = styled.div`
	min-width: 300px;
	max-width: 660px;
	width: 100vw;
	height: 100%;
	background-color: white;
	padding: 20px;
`;

const TotalBox = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px;
	h1 {
		font-size: 19px;
	}
	h2 {
		font-size: 19px;
	}
`;

const CloseCart = styled.div`
	button {
		display: inline-flex;
		position: relative;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 120%;
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
	}
`;

const Nothing = styled.div`
	height: calc(100vh - 80px);
	display: flex;
	align-items: center;
	justify-content: center;
	h1 {
		font-size: 22px;
		color: silver;
	}
`;
