import { GrMenu, GrSearch } from 'react-icons/gr';

import { SlUserFemale } from 'react-icons/sl';
import { accentColor } from '../constants/colors';
import logo from '../assets/images/logo.svg';
import styled from 'styled-components';

export default function Header() {
	return (
		<HeaderContainer>
			<div>
				<GrMenu size='1.2rem' />
				<img src={logo} alt='Logo' />
				<h1>E-GEEK</h1>
			</div>
			<Search>
				<GrSearch style={{ marginLeft: '0.5rem', position: 'absolute' }} color='#623CEA' size='1.2em' />
				<SearchBar id='search-bar' type='text' placeholder='Search'></SearchBar>
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
	div {
		display: flex;
		align-items: center;
		h1 {
			font-size: 30px;
			font-family: 'Bangers', cursive;
		}
		img {
			width: 30px;
			height: 30px;
			margin: 0 5px 0 15px;
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
	padding: 1rem 1rem 1rem 2.5rem;
	width: 100%;
	border: 1px solid #fff;
	border-radius: 50px;
`;
