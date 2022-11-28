import React, { useContext } from 'react';
import { baseColor, detailColor, textBaseColor } from '../../constants/colors';

import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
	const navigate = useNavigate();
	const { userData, setUserData, afterSignInGoTo } = useContext(UserContext);
	const baseURL = process.env.REACT_APP_API_BASE_URL;
	const [disabled, setDisabled] = React.useState(false);
	const [form, setForm] = React.useState({
		email: '',
		password: '',
	});

	function postLogin(event) {
		setDisabled(true);
		event.preventDefault();
		const URL = `${baseURL}/sign-in`;
        let body;
        if (userData?.token !== undefined && !userData?.isLogged){
            body = { 
                ...form,
                oldToken: `Bearer ${userData.token}`
            };
        }else{
            body = {...form}
        }
        

		const request = axios.post(URL, body);

		request.then((answer) => {
			const user = JSON.stringify(answer.data);
			localStorage.setItem('userE-geek', user);
			setUserData(answer.data);
			navigate(afterSignInGoTo);
		});
		request.catch((answer) => {
			console.log('error'); //add alert
			setDisabled(false);
		});
	}

	function handleForm(event) {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}

	return (
		<Container>
			<h1>Login</h1>
			<SignInContainer onSubmit={postLogin}>
				<input
					placeholder='Email'
					type='email'
					name='email'
					onChange={handleForm}
					value={form.email}
					required
					disabled={disabled}
				/>
				<input
					placeholder='Senha'
					type='password'
					name='password'
					minLength='8'
					onChange={handleForm}
					required
					value={form.password}
					disabled={disabled}
				/>
				<button type='submit' disabled={disabled}>
					Entrar
				</button>
			</SignInContainer>
		</Container>
	);
}

const Container = styled.div`
	width: 100vw;
	height: calc(100vh - 95px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	h1 {
		font-weight: 400;
		font-size: 1.3em;
		margin-bottom: 20px;
	}
`;

const SignInContainer = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 450px;
	margin: 0 10px;
	input {
		width: 100%;
		height: 45px;
		margin-bottom: 10px;
		border: 0px;
		border-radius: 4px;
		outline: 0px;
		padding: 0 0.8em;
	}
	button {
		display: inline-flex;
		position: relative;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 50%;
		height: 48px;
		margin-top: 1em;
		padding-right: 16px;
		padding-left: 16px;
		border-width: 0;
		border-radius: 5px;
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
