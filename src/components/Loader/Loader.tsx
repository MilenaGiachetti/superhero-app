import styled, { keyframes } from 'styled-components';

const spin = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`

const Container = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	margin: 0 auto;
	max-width: 1200px;
	min-height: calc(100vh - 119px);
	width: 100%;
`

const Spinner = styled.div`
	width: 7rem;
	height: 7rem;
	margin: 0;
	background: transparent;
	border-top: 4px solid #135490;
	border-right: 4px solid transparent;
	border-radius: 50%;
	animation: 1s ${spin} linear infinite;
`

function Loader() {
	return (
		<Container>
			<Spinner />
		</Container>
	) 
}

export default Loader;