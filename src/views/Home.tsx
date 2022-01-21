import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import GridItem from '../components/GridItem/GridItem';
import Pagination from '../components/Pagination/Pagination';
import { useQuery } from '../hooks/useQuery';
import { Hero } from '../types/hero.types';
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
	const elementsByPage = 24;

	const getFiltered = useCallback((data) => {
		if (search.trim()) {
			const filtered = data.filter(({name}) => {
				const re = new RegExp(search, "i")
				return name.match(re)
			})
			navigate(`?page=1&search=${search}`)
			setFilteredHeroes(filtered);
		} else if (!search.trim()) {
			navigate(`?page=1&search=${search}`)
			setFilteredHeroes(data);
		}
	}, [navigate, sQuery, search]);
	

	useEffect(() => {
		axios.get('https://akabab.github.io/superhero-api/api/all.json')
		.then(({data}) => {
			setHeroes(data);
			getFiltered(data);
		})
		.catch(error => {
			console.log(error)
		})
	}, [getFiltered])

	useEffect(() => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	}, [pageQuery])

	useEffect(() => {
		let timer = setTimeout(() => {
			getFiltered(heroes);
		}, 1000)
		return () => clearTimeout(timer);
	}, [getFiltered])

	return (
		<>
			<input type='search' value={search} onChange={(e) => setSearch(e.target.value)}></input>
				{
					filteredHeroes.length ?
					<Grid>
						{ 
							filteredHeroes.slice(elementsByPage * (pageQuery - 1), elementsByPage * pageQuery).map(hero => {
								return (
									<GridItem hero={hero} key={hero.id} />
								)
							})
						} 
					</Grid>
					:
					<NotFound>Hero '{search}' not found</NotFound>
				}
			<Pagination total={filteredHeroes.length} currentPage={pageQuery} elementsByPage={elementsByPage} search={search} />
		</>
	)
}

export default Home
