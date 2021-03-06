import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Hero } from '../../types/hero.types';

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`

const GridItemContainer = styled(Link)`
	animation: ${fadeIn} .5s linear;
	position: relative;
	transition: transform .5s ease;
	width: 100%;
	&:after {
		background:-webkit-linear-gradient(
			90deg, 
			rgba(1,1,2,1) 0%, 
			rgba(1,1,2,0.5) 35%, 
			rgba(1,1,2,0.2) 60%, 
			rgba(1,1,2,0) 85%
		);
		background: linear-gradient(
			0deg, 
			rgba(1,1,2,1) 0%, 
			rgba(1,1,2,0.5) 35%, 
			rgba(1,1,2,0.2) 60%, 
			rgba(1,1,2,0) 85%
		);
		border-radius: 1rem;
		content: '';
		display: block;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}
	&:hover {
		transform: scale(1.05);
		&:before {
			background-color: #EE964B;
			border-radius: 3px 0 0 3px;
			color: #FFF;
			content: 'See More +';
			display: block;
			font-weight: bold;
			padding: 0.5rem 1rem;
			position: absolute;
			right: 0;
			top: 1rem;
		}
	}
`;

const GridItemImg = styled.img`
	border-radius: 1rem;
	width: 100%;
`;

const GridContent = styled.div`
	bottom: 0;
	color: #fff;
	left: 0;
	padding: 1rem;
	position: absolute;
	width: 100%;
	z-index: 2;
`

function GridItem({hero} : {hero: Hero}) {
  return (
	<GridItemContainer to={`hero/${hero.id}`}>
		<GridItemImg src={hero.images.lg} alt={hero.name} />
		<GridContent>
			<h2>{hero.name}</h2>
			<p>Height: {hero.appearance.height[1]}</p>
			<p>Weight: {hero.appearance.weight[1]}</p>
		</GridContent>
	</GridItemContainer>
  );
}

export default GridItem;
