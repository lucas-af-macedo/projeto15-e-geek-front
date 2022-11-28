import { GrMenu, GrSearch } from 'react-icons/gr';
import { accentColor, detailColor, textAccentColor } from '../constants/colors';

import { GiPillow } from 'react-icons/gi';
import { IoShirtOutline } from 'react-icons/io5';
import { MdOutlineSmartToy } from 'react-icons/md';
import { SlUserFemale } from 'react-icons/sl';
import logo from '../assets/images/logo.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
	const navigate = useNavigate();
	const [sideMenu, setSideMenu] = useState(false);
	const [userMenu, setUserMenu] = useState(false);

	return (
		<HeaderContainer>
			<SideMenuBox>
				<MenuIcon size='1.2rem' color={textAccentColor} onClick={() => setSideMenu(!sideMenu)} />
				<img src={logo} alt='Logo' />
				<h1 onClick={() => navigate('/')}>E-GEEK</h1>
				<SideMenu display={sideMenu}>
					<li>
						<IoShirtOutline style={{ marginRight: '0.4em' }} />
						Vestuário
					</li>
					<li>
						<GiPillow style={{ marginRight: '0.4em' }} />
						Decoração
					</li>
					<li>
						<MdOutlineSmartToy style={{ marginRight: '0.4em' }} />
						Funko Pop!
					</li>
				</SideMenu>
			</SideMenuBox>
			<Search>
				<GrSearch
					style={{ marginLeft: '0.5rem', position: 'absolute' }}
					color={detailColor}
					size='1.2em'
				/>
				<SearchBar id='search-bar' type='text' placeholder='Procurar'></SearchBar>
			</Search>
			<UserMenuBox>
				<UserIcon size='1.3rem' color={textAccentColor} onClick={() => setUserMenu(!userMenu)} />
				<UserMenu display={userMenu}>
					<li onClick={() => navigate('/sign-in')}>LogIn</li>
					<li onClick={() => navigate('/sign-up')}>Cadastro</li>
					<li onClick={() => navigate('/cart')}>Carrinho</li>
					<li onClick={() => navigate('/history')}>Histórico</li>
				</UserMenu>
			</UserMenuBox>
		</HeaderContainer>
	);
}

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between; //horizontal
	align-items: center; //vertical
	height: 80px;
	width: 100%;
	background-color: ${accentColor};
	padding: 0 15px;
	margin-bottom: 10px;
	box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 3;
	color: ${textAccentColor};
`;

const SideMenuBox = styled.div`
	display: flex;
	align-items: center;
	h1 {
		font-size: 25px;
		font-family: 'Bangers', cursive;
		cursor: pointer;
	}
	img {
		width: 30px;
		height: 30px;
		margin-right: 5px;
		filter: invert(100%) sepia(0%) saturate(7433%) hue-rotate(65deg) brightness(115%) contrast(103%);
	}
`;
const MenuIcon = styled(GrMenu)`
	cursor: pointer;
	margin-right: 15px;
	transition: all 0.5s;
	color: ${textAccentColor};
	background-color: ${textAccentColor};
	:hover {
		transform: rotate(180deg);
	}
`;
const SideMenu = styled.ul`
	display: ${(props) => (props.display ? 'initial' : 'none')};
	position: absolute;
	background-color: ${detailColor};
	width: 200px;
	max-width: 50vw;
	height: calc(100vh - 85px);
	font-size: 1.3em;
	font-weight: 600px;
	top: 80px;
	left: 0;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
	li {
		display: flex;
		align-items: center;
		border-bottom: 1px solid ${textAccentColor};
		padding: 10px 0;
		margin: 0 10px;
		cursor: pointer;
		text-transform: uppercase;
		text-align: center;
		:last-of-type {
			border: none;
		}
	}
	@media (min-width: 660px) {
		display: ${(props) => (props.display ? 'flex' : 'none')};
		justify-content: space-around;
		width: 100vw;
		max-width: 100vw;
		height: fit-content;
		li {
			border: none;
		}
	}
`;

const Search = styled.div`
	padding: 0.5rem;
	position: relative;
	display: flex;
	align-items: center;
	width: 50%;
`;

const SearchBar = styled.input`
	padding: 0.8rem 0.8rem 0.8rem 2.5rem;
	width: 90%;
	border: 1px solid #fff;
	border-radius: 50px;
	:active,
	:focus {
		outline-color: ${detailColor};
	}
`;

const UserMenuBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	border-radius: 50%;
	border: 1px solid ${textAccentColor};
	width: 2rem;
	height: 2rem;
`;
const UserIcon = styled(SlUserFemale)`
	cursor: pointer;
`;
const UserMenu = styled.ul`
	display: ${(props) => (props.display ? 'initial' : 'none')};
	position: absolute;
	background-color: ${detailColor};
	width: fit-content;
	max-width: 30vw;
	height: fit-content;
	font-size: 0.9em;
	font-weight: 600px;
	top: 2.4rem;
	right: 0;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
	border-radius: 5px;
	li {
		display: flex;
		align-items: center;
		border-bottom: 1px solid ${textAccentColor};
		padding: 10px 0;
		margin: 0 10px;
		cursor: pointer;
		text-transform: uppercase;
		text-align: center;
		:last-of-type {
			border: none;
		}
	}
`;
