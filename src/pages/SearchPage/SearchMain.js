import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { accentColor, textBaseColor } from '../../constants/colors';

import { MdOutlineSearchOff } from 'react-icons/md';
import Product from '../../components/Product';
import styled from 'styled-components';

export default function SearchMain({ products, handlePage, changePage }) {
	return (
		<>
			{products.length === 0 ? (
				<span>
					<MdOutlineSearchOff size='4em' style={{ marginBottom: '10px' }} color={accentColor} />
					Nenhum produto encontrado!
				</span>
			) : (
				<>
					<Products>
						{products?.map((product) => (
							<Product product={product} key={product._id} />
						))}
					</Products>

					<ChangePages>
						<PreviousPage
							size='1.5em'
							color={accentColor}
							id='descrease'
							onClick={() => handlePage('previous')}
						/>
						<p>Página {changePage.page}</p>
						<NextPage
							size='1.5em'
							color={accentColor}
							id='increase'
							onClick={() => handlePage('next')}
						/>
					</ChangePages>
				</>
			)}
		</>
	);
}

const Products = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	width: fit-content;
	height: fit-content;
	max-height: 75vh;
	margin: 0 auto;
	overflow-y: auto;
	@media (min-width: 660px) {
		justify-content: flex-start;
		height: fit-content;
		max-height: 80vh;
	}
`;

const ChangePages = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;
	margin-top: 10px;
	color: ${textBaseColor};
	font-weight: 500;
	font-size: 1rem;
	p {
		height: 1.5em;
		margin: 0 10px;
		line-height: 1.5em;
		text-align: center;
	}
`;

const PreviousPage = styled(FaArrowAltCircleLeft)`
	cursor: pointer;
`;

const NextPage = styled(FaArrowAltCircleRight)`
	cursor: pointer;
`;
