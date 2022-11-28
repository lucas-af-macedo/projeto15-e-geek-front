import { detailColor, textAccentColor } from '../constants/colors';
import { useContext, useState } from 'react';

import { GiPillow } from 'react-icons/gi';
import { GrMenu } from 'react-icons/gr';
import { IoShirtOutline } from 'react-icons/io5';
import { MdOutlineSmartToy } from 'react-icons/md';
import SearchContext from '../contexts/SearchContext';
import logo from '../assets/images/logo.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function SideMenuComponent() {
	const navigate = useNavigate();
	const { setSearchInfo } = useContext(SearchContext);
	const [sideMenu, setSideMenu] = useState(false);

	function handleSearch(id) {
		console.log(id);
		const tag = id.toLowerCase();
		setSearchInfo({ tags: [tag] });
		navigate('/search');
	}

	return (
		<SideMenuBox>
			<MenuIcon size='1.2rem' color={textAccentColor} onClick={() => setSideMenu(!sideMenu)} />
			<img src={logo} alt='Logo' />
			<h1 onClick={() => navigate('/')}>E-GEEK</h1>
			<SideMenu display={sideMenu ? 'true' : 'false'}>
				<li onClick={() => handleSearch('Vestuário')}>
					<IoShirtOutline style={{ marginRight: '0.4em' }} />
					Vestuário
				</li>
				<li onClick={() => handleSearch('Decoração')}>
					<GiPillow style={{ marginRight: '0.4em' }} />
					Decoração
				</li>
				<li onClick={() => handleSearch('Funko')}>
					<MdOutlineSmartToy style={{ marginRight: '0.4em' }} />
					Funko Pop!
				</li>
			</SideMenu>
		</SideMenuBox>
	);
}

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
	display: ${(props) => (props.display === 'true' ? 'initial' : 'none')};
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
		display: ${(props) => (props.display === 'true' ? 'flex' : 'none')};
		justify-content: space-around;
		width: 100vw;
		max-width: 100vw;
		height: fit-content;
		li {
			border: none;
		}
	}
`;
