import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GridItem from '../components/GridItem/GridItem';
import Pagination from '../components/Pagination/Pagination';
import { useQuery } from '../hooks/useQuery';
import { Hero } from '../types/hero.types';
import Loader from '../components/Loader/Loader';
import NotFound from '../components/NotFound/NotFound';

const Grid = styled.ul`
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

const Home = () => {
	let query = useQuery().get('page');
	let pageQuery = query ? +query : 1;
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const elementsByPage = 24;

	useEffect(() => {
		axios.get('all.json')
		.then(response => {
			setHeroes(response.data);
			setIsLoading(false);
		})
		.catch(error => {
			console.log(error);
			setIsLoading(false);
		})
	}, [])

	useEffect(() => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	}, [pageQuery])

	return (
		<>
		 	{ heroes.length && !isLoading
				?
				<>
					<Grid>
						{
							heroes.slice(elementsByPage * (pageQuery - 1), elementsByPage * pageQuery).map(hero => {
								return (
									<GridItem hero={hero} key={hero.id} />
								)
							})
						}
					</Grid>
					<Pagination total={heroes.length} currentPage={pageQuery} elementsByPage={elementsByPage} />
				</>
				: ( 
					isLoading
					?
						<Loader />
					:
						<NotFound>Heroes not found</NotFound>
				)
			}
		</>
	)
}

export default Home
