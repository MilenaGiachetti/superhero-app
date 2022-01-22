import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
	let queries = useQuery();
	let pQuery = queries.get('page');
	let sQuery = queries.get('search');
	const navigate = useNavigate();
	let pageQuery = pQuery ? +pQuery : 1;
	const [search, setSearch] = useState<string>(sQuery ? sQuery : '');
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const elementsByPage = 24;

	// get all heroes only once
	useEffect(() => {
		axios.get('all.json')
		.then(({data}) => {
			console.log('search');
			setHeroes(data);
			setFilteredHeroes(data);
			setIsLoading(false);
		})
		.catch(error => {
			console.log(error);
			setIsLoading(false);
		})
	}, [])

	// filter heroes
	useEffect(() => {
		console.log('search2');
		if (search.trim()) {
			const filtered = heroes.filter(({name}) => {
				const re = new RegExp(search, "i")
				return name.match(re)
			})
			navigate(`?page=1&search=${search}`)
			setFilteredHeroes(filtered);
		} else {
			navigate(`?page=1&search=${search}`)
			setFilteredHeroes(heroes);
		}
	}, [heroes, search, navigate])

	// scroll to top on page change
	useEffect(() => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	}, [pageQuery])

	return (
		<>
			{
				!isLoading ?
				<>
					<input type='search' value={search} onChange={(e) => setSearch(e.target.value)}></input>
					<Grid>
						{ 
							filteredHeroes.slice(elementsByPage * (pageQuery - 1), elementsByPage * pageQuery).map(hero => {
								return (
									<GridItem hero={hero} key={hero.id} />
								)
							})
						} 
					</Grid>
					<Pagination total={filteredHeroes.length} currentPage={pageQuery} elementsByPage={elementsByPage} search={search} />
				</> 
				: ( 
					isLoading
					?
						<Loader />
					:
						<NotFound>{heroes.length ? 'Heroes not found' : `Hero '${search}' not found`}</NotFound>
				)
			}
		</>
	)
}

export default Home
