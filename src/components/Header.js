import { accentColor, detailColor, textAccentColor } from '../constants/colors';
import { useContext, useEffect, useState } from 'react';

import { GrSearch } from 'react-icons/gr';
import SearchContext from '../contexts/SearchContext.js';
import SideMenuComponent from './SideMenuComponent';
import { SlUserFemale } from 'react-icons/sl';
import UserContext from '../contexts/UserContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	const { userData } = useContext(UserContext);
	const { searchInfo, setSearchInfo } = useContext(SearchContext);
	const [searchInput, setSearchInput] = useState('');
	const [userMenu, setUserMenu] = useState(false);

	function searchGo(e) {
		e.preventDefault();
		const search = searchInput.toLowerCase().split(' ');

		setSearchInfo({ ...searchInfo, tags: search });
		setSearchInput('');
		navigate('/search');
	}

	function handleSearch(e) {
		setSearchInput(e.target.value);
	}

	return (
		<HeaderContainer>
			<SideMenuComponent />
			<Search>
				<GrSearch
					style={{ marginLeft: '0.5rem', position: 'absolute' }}
					color={detailColor}
					size='1.2em'
				/>
				<form onSubmit={searchGo}>
					<SearchBar
						id='search-bar'
						type='text'
						placeholder='Procurar'
						value={searchInput}
						onChange={handleSearch}
					/>
				</form>
			</Search>
			<UserMenuBox>
				{userData?.image && userData?.image?.length !== 0 ? (
					<>
						<img src={userData?.image} alt='User' onClick={() => setUserMenu(!userMenu)} />
					</>
				) : (
					<UserIcon size='1.8rem' color={textAccentColor} onClick={() => setUserMenu(!userMenu)} />
				)}
				<UserMenu display={userMenu ? 'true' : 'false'} hide={!userData?.isLogged ? 'true' : 'false'}>
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
	z-index: 3;
	position: sticky;
	top: 0;
	left: 0;
	justify-content: space-between; //horizontal
	align-items: center; //vertical
	width: 100%;
	height: 80px;
	margin-bottom: 10px;
	padding: 0 15px;
	color: ${textAccentColor};
	background-color: ${accentColor};
	box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Search = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	width: 50%;
	padding: 0.5rem;
	form {
		width: 100%;
	}
`;

const SearchBar = styled.input`
	width: 90%;
	padding: 0.8rem 0.8rem 0.8rem 2.5rem;
	border: 1px solid #fff;
	border-radius: 50px;
	:active,
	:focus {
		outline-color: ${detailColor};
	}
`;

const UserMenuBox = styled.div`
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
	width: 3rem;
	height: 3rem;
	border: 2px solid ${textAccentColor};
	border-radius: 50%;
	img {
		width: 3.5rem;
		height: 3.5rem;
		border: 2px solid ${textAccentColor};
		border-radius: 50%;
		cursor: pointer;
		object-fit: contain;
	}
`;
const UserIcon = styled(SlUserFemale)`
	cursor: pointer;
`;
const UserMenu = styled.ul`
	display: ${(props) => (props.display === 'true' ? 'initial' : 'none')};
	position: absolute;
	top: 3.5rem;
	right: 0;
	width: fit-content;
	max-width: 30vw;
	height: fit-content;
	border-radius: 5px;
	font-weight: 600px;
	font-size: 0.9em;
	background-color: ${detailColor};
	border: 1px solid ${textAccentColor};
	box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
	li {
		display: flex;
		align-items: center;
		margin: 0 10px;
		padding: 10px 0;
		border-bottom: 1px solid ${textAccentColor};
		text-align: center;
		text-transform: uppercase;
		cursor: pointer;
		:last-of-type {
			border: none;
		}
		:nth-child(1),
		:nth-child(2) {
			display: ${(props) => (props.hide === 'true' ? 'inherit' : 'none')};
		}
		:nth-child(4) {
			display: ${(props) => (props.hide === 'true' ? 'none' : 'inherit')};
		}
	}
`;
