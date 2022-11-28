import { accentColor, detailColor, textBaseColor } from '../constants/colors.js';

import { ThreeCircles } from 'react-loader-spinner';
import styled from 'styled-components';

export default function Loading({ size }) {
	return (
		<LoadingContainer>
			<ThreeCircles
				height={!size ? 130 : size}
				width={!size ? 130 : size}
				outerCircleColor={accentColor}
				innerCircleColor={detailColor}
				middleCircleColor={textBaseColor}
			/>
		</LoadingContainer>
	);
}

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: calc(80vh - 80px);
`;
