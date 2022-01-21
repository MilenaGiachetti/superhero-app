import styled from 'styled-components'

export const Title = styled.h3`
	border-bottom: 2px solid #f2f2f2;
	padding-top: 2rem;
`

export const Subtitle = styled.h4`
	padding: 0.5rem 0;
`

export const HeroTitle = styled.div`
	background-color: #000;
	color: #fff;
	margin: 0 auto;
	max-width: 2200px;
	position: relative;
	.content {
		display: flex;
		flex-flow: column;
		margin: 0 auto;
		max-width: 1200px;
		padding: 0 1rem;
	}
	img {
		border-radius: 50%;
		height: 12rem;
		object-fit: cover; 
		object-position: 100% 0;
		width: 12rem;
	}
	.heroTitleContainer {
		align-items: center;
		display: flex;
		justify-content: space-between;
		text-align: right;
		p {
			color: #CCC;
			font-size: 1.5rem;
		}
		h2 {
			font-size: 3rem;
		}
		@media (max-width: 576px) {
			flex-flow: column;
			justify-content: center;
			text-align: center;
			p {
				padding-top: 2rem;
			}
		}
	}
`

export const SVGContainer = styled.div`
	max-height: 150px;
	overflow: hidden;
	width: 100%;
	svg {
		height: 100%;
		max-height: 150px;
		width: 100%;
	}
`

export const LeftContainer = styled.div`
	padding-right: 5rem;
	width: 100%;
	@media (max-width: 768px) {
		padding-right: unset;
    }
	.powerStats {
		max-width: 50vw;
		padding: 1rem 0;
		width: 600px;
		@media (max-width: 768px) {
			max-width: unset;
			padding-right: 4rem;
			width: 100%;
		}
	}
`

export const RightContainer = styled.div`
	width: 400px;
	text-align: center;
	h3 {
		display: inline-block;
		padding: 0.5rem 1rem;
		position: relative;
		top: 20px;
		z-index: 2;
		&:before {
			content: '';
			display: block;
			background-color: #fff;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}
	}
	@media (max-width: 768px) {
		width: 100%;
    }
`

export const HeroContent = styled.div`
	display: flex;
	padding: 0 1rem 5rem 1rem;
	margin: 0 auto;
	max-width: 1200px;
	@media (max-width: 768px) {
		flex-flow: column;
    }
`

export const BlockContainer = styled.div`
	text-align: left;
	border: 1px solid #CCC;
	border-radius: 3px;
	&.double-block {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
`

export const Block = styled.div`
	padding: 1rem 0.5rem;
	width: 100%;
	&:nth-child(1), &:nth-child(2) {
		padding-top: 2rem;
	}
	&.double {
		&:nth-child(2n) {
			border-left: 1px solid #ccc;
		}
	}
	h4 {
		font-size: 14px;
		color: #CCC;
		text-transform: uppercase;
	}
`
