import { Link } from 'react-router-dom';
import styled from 'styled-components';
import notFound from '../../assets/images/not_found.svg';

const Container = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const Content = styled.div`
	background-color: #fff;
	padding: 0 5rem;
	text-align: center;
`

const Image = styled.img`
	max-height: 60vh;
`

const Title = styled.h2`
	font-size: 2rem;
`

const Button = styled(Link)`
	background-color: #EE964B;
	border-radius: 3px;
	color: #FFFFFF;
	display: inline-block;
	font-size: 1rem;
	font-weight: bold;
	margin: 1rem 0 5rem 0;
	padding: 0.5rem 1rem;
	text-decoration: unset;
`

function NotFound({children}) {
    return (
		<Container>
			<Image src={notFound} alt="Not found"/>
			<Content>
				<Title>{children}</Title>
				<Button to="/">Go Home</Button>
			</Content>
		</Container>
	)
}

export default NotFound;
