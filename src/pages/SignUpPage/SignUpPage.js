import { accentColor, baseColor, detailColor, textBaseColor } from '../../constants/colors.js';

import { FiAlertTriangle } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUpPage() {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPass: '',
		cpf: '',
		birthdate: '',
		address: '',
	});
	const [registering, setRegistering] = useState(false);
	const [validate, setValidate] = useState(true);
	const [showPassword, setShowPassword] = useState(false);

	function signUp(e) {
		e.preventDefault();
		setRegistering(true);
		if (user.password !== user.confirmPass) {
			setValidate(false);
			setRegistering(false);
			return;
		} else {
			setValidate(true);
		}
		const body = { ...user };
		delete body.confirmPass;
		axios
			.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`, body)
			.then((res) => {
				swal(`Usuário cadastrado com sucesso`, '', { icon: 'success' });
				setRegistering(false);
				navigate('/');
			})
			.catch((err) => {
				setRegistering(false);
				handleError(err.response);
			});
	}

	function handleError(error) {
		switch (error.status) {
			case 401:
				swal(`${error.status} ${error.statusText}`, 'Já existe um usuário cadastrado com esse e-mail!', {
					icon: 'error',
				});
				break;
			case 422:
				console.log(error);
				let text = [];
				for (const e of error.data.errors) {
					console.log(e);
					switch (e.label) {
						case 'Name':
							if (!text.includes('Nome: ')) {
								text.push('Nome: ');
								text.push(`deve conter pelo menos 3 caracteres \n\n`);
							}
							break;
						case 'Password':
							if (!text.includes('Senha: ')) {
								text.push('Senha: ');
								text.push(
									'deve conter pelo menos 8 dígitos entre letras, número e caracteres especiais (@*#!.,$%) \n\n'
								);
							}
							break;
						case 'CPF':
							if (!text.includes('CPF: ')) {
								text.push('CPF: ');
								text.push('insira um CPF válido! \n\n');
							}
							break;
						case 'Address':
							if (!text.includes('Endereço: ')) {
								text.push('Endereço: ');
								text.push('insira um endereço válido! \n\n');
							}
							break;
						default:
							break;
					}
				}
				swal({ text: text.join(''), icon: 'warning' });
				break;
			default:
				break;
		}
	}

	function handleForm(e) {
		if (e.target.id === 'cpf') {
			const cpf = e.target.value
				.replace(/\D/g, '')
				.replace(/(\d{3})(\d)/, '$1.$2')
				.replace(/(\d{3})(\d)/, '$1.$2')
				.replace(/(\d{3})(\d{1,2})/, '$1-$2')
				.replace(/(-\d{2})\d+$/, '$1');
			setUser({ ...user, cpf });
		} else if (e.target.id === 'birthdate') {
			setUser({ ...user, [e.target.id]: e.target.value });
		} else {
			setUser({ ...user, [e.target.id]: e.target.value });
		}
	}
	console.log(registering);
	return (
		<SignUpContainer>
			<h1>Cadastro</h1>
			<SignUpForm
				onSubmit={signUp}
				display={validate ? 'none' : 'flex'}
				backColor={validate === true ? '#fff' : '#fae6e6'}>
				<label htmlFor='name'>Nome</label>
				<input
					id='name'
					type='text'
					placeholder='Nome'
					disabled={registering ? 'disabled' : ''}
					value={user.name}
					onChange={handleForm}
					required
				/>
				<label htmlFor='email'>E-mail</label>
				<input
					id='email'
					type='email'
					placeholder='E-mail'
					disabled={registering ? 'disabled' : ''}
					value={user.email}
					onChange={handleForm}
					required
				/>
				<label htmlFor='password'>Senha</label>
				<input
					id='password'
					type={showPassword ? 'text' : 'password'}
					placeholder='Senha'
					disabled={registering ? 'disabled' : ''}
					value={user.password}
					onChange={handleForm}
					required
				/>
				<label htmlFor='confirmPass'>Confirmar Senha</label>
				<input
					id='confirmPass'
					type={showPassword ? 'text' : 'password'}
					placeholder='Confirme a senha'
					disabled={registering ? 'disabled' : ''}
					value={user.confirmPass}
					onChange={handleForm}
					required
				/>
				<div>
					<FiAlertTriangle color='#ff3333' />
					<p>As senhas devem ser iguais</p>
				</div>
				<div>
					<input type='checkbox' id='showpassword' onChange={() => setShowPassword(!showPassword)} />
					<label htmlFor='showpassword'>Show Password</label>
				</div>
				<label htmlFor='CPF'>CPF</label>
				<input
					id='cpf'
					type='text'
					placeholder='CPF'
					disabled={registering ? 'disabled' : ''}
					value={user.cpf}
					onChange={handleForm}
					required
				/>
				<label htmlFor='birthdate'>Data de Nascimento</label>
				<input
					id='birthdate'
					type='date'
					placeholder='Data de Nascimento'
					disabled={registering ? 'disabled' : ''}
					value={user.birthdate}
					onChange={handleForm}
					required
				/>
				<label htmlFor='address'>Endereço</label>
				<input
					id='address'
					type='text'
					placeholder='Endereço (Rua...,  numero,  Cidade-Estado)'
					disabled={registering ? 'disabled' : ''}
					value={user.address}
					onChange={handleForm}
					required
				/>
				<button type='submit'>
					{registering ? <ThreeDots color={accentColor} width='60' /> : 'Cadastrar'}
				</button>
			</SignUpForm>
		</SignUpContainer>
	);
}

const SignUpContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 25px 25px 25px;
	h1 {
		font-weight: 400;
		font-size: 1.3em;
	}
	@media (min-width: 660px) {
		margin: 50px 25px 25px 25px;
	}
`;

const SignUpForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80vw;
	max-width: 660px;
	label,
	input {
		width: 100%;
		font-size: 16px;
	}
	label {
		margin: 1em 0 0.8em 0;
	}
	input {
		border: 1px solid ${accentColor};
		border-radius: 5px;
		height: 45px;
		padding: 0 0.8em;
	}
	input[type='password'] {
		background-color: ${(props) => props.backColor};
	}
	div {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: ${textBaseColor};
		width: 100%;
		height: 1em;
		margin: 10px;
		input[type='checkbox'] {
			height: 0.8em;
			width: 0.8em;
			margin-right: 10px;
		}
		label {
			font-size: 0.8em;
		}
		:first-of-type {
			display: ${(props) => props.display};
		}
		p {
			display: ${(props) => props.display};
			margin-left: 5px;
			font-size: 0.8em;
		}
	}
	button {
		display: inline-flex;
		position: relative;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
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
		/* font-family: 'JetBrains Mono', monospace; */
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
