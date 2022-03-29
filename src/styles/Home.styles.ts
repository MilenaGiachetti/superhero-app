import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.div`
	margin: 0 auto;
	max-width: 1200px;
	padding: 3rem 1rem;
`
export const InputContainer = styled.div`
	position: relative;
`
export const Input = styled.input`
	border: 2px solid #135490;
	border-radius: .5rem;
	height: 2.5rem;
	padding: 0 1rem 0 3rem;
	width: 100%;
`
export const SearchIcon = styled(FontAwesomeIcon)`
	position: absolute;
	left: 1rem;
	top: .75rem;
`
export const Grid = styled.ul`
	display: grid;
	gap: 2rem;
	grid-template-columns: repeat(4, 1fr);
	margin: 0 auto;
	max-width: 1200px;
	padding: 3rem 1rem;
	@media (max-width: 992px) {
		gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
	}
	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 450px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;