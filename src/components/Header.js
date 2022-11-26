import { GrMenu, GrSearch } from 'react-icons/gr';

import { SlUserFemale } from 'react-icons/sl';
import { accentColor } from '../constants/colors';
import logo from '../assets/images/logo.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	return (
		<HeaderContainer>
			<div>
				<GrMenu size='1.2rem' />
				<img src={logo} alt='Logo' onClick={() => navigate('/')} />
				<h1 onClick={() => navigate('/')}>E-GEEK</h1>
			</div>
			<Search>
				<GrSearch style={{ marginLeft: '0.5rem', position: 'absolute' }} color='#623CEA' size='1.2em' />
				<SearchBar id='search-bar' type='text' placeholder='Procurar'></SearchBar>
			</Search>
			<div>
				<SlUserFemale size='1.3rem' />
			</div>
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
	div {
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
			margin: 0 5px 0 15px;
			cursor: pointer;
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
`;
