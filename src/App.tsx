import axios from 'axios';
import React from 'react';
import { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import Loader from './components/Loader/Loader';
const Hero = React.lazy(() => import('./views/Hero'));
const Home = React.lazy(() => import('./views/Home'));
const NotFound = React.lazy(() => import('./views/RouteNotFound'));

axios.defaults.baseURL = 'https://akabab.github.io/superhero-api/api/';

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		font-family: 'Open Sans', sans-serif;
		margin: 0;
		padding: 0;
	}
	img {
		vertical-align: bottom;
	}
	ul {
		list-style: none;
	}
	button {
		background: none;
		border: none;
	}
`;

const Header = styled.header`
	background-color: #000;
	color: #fff;
	margin: 0 auto;
	max-width: 2200px;
`

const TitleContainer = styled.div`
	margin: 0 auto;
	max-width: 1200px;
	padding: 1rem 1rem;
`

const Title = styled(Link)`
	color: #fff;
	display:inline-block;
	font-size: 0.75rem;
	text-decoration: none;
	&:visited, &:active {
		color: #fff;
	}
`

const Main = styled.main`
	min-height: calc(100vh - 119px);
`

const Footer = styled.footer`
	background-color: #000;
	color: #fff;
	margin: 0 auto;
	max-width: 2200px;
`
const FooterContent = styled.p`
	text-align: right;
	margin: 0 auto;
	max-width: 1200px;
	padding: 1rem 1rem;
`

const CustomLink = styled.a`
	color: #EE964B;
	&:visited, &:active {
		color: rgba(238, 150, 75, 0.95);
	}
`

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Header>
				<TitleContainer>
					<Title to='/'>
						<h1>Superhero App</h1>
					</Title>
				</TitleContainer>
			</Header>
			<Main>
				<Routes>
					<Route path='/' element={
						<Suspense fallback={<Loader/>}>
							<Home />
						</Suspense>
					}/>
					<Route path='/hero/:id' element={
						<Suspense fallback={<Loader/>}>
							<Hero />
						</Suspense>
					}/>
					<Route path='*' element={
						<Suspense fallback={<Loader/>}>
							<NotFound />
						</Suspense>
					}/>
				</Routes>
			</Main>
			<Footer>
				<FooterContent>
				Developed by <CustomLink href='https://www.linkedin.com/in/milena-giachetti/' rel='noopener' target='_blank'>Milena Giachetti</CustomLink>
				</FooterContent>
			</Footer>
		</>
  	);
}

export default App;