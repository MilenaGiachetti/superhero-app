import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GridItem from '../components/GridItem/GridItem';
import Pagination from '../components/Pagination/Pagination';
import { useQuery } from '../hooks/useQuery';
import { Hero } from '../types/hero.types';
import Loader from '../components/Loader/Loader';
import NotFound from '../components/NotFound/NotFound';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Grid, Container, InputContainer, Input, SearchIcon} from '../styles/Home.styles';

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
	const inputRef = useRef<HTMLInputElement | null>(null);

	const elementsByPage = 24;

	// get all heroes only once
	useEffect(() => {
		axios.get('all.json')
		.then(({data}) => {
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
        const timer = setTimeout(() => {
            if (search === inputRef.current?.value){
				if (search.trim()) {
					const filtered = heroes.filter(({name}) => {
						const re = new RegExp(search, "i")
						return name.match(re)
					})
					if (Math.ceil(filtered.length / elementsByPage) < pageQuery) {
						navigate(`?page=1&search=${search}`)
					} else {
						navigate(`?page=${pageQuery}&search=${search}`)
					}
					setFilteredHeroes(filtered);
				} else {
					navigate(`?page=${pageQuery ? pageQuery : 1}`)
					setFilteredHeroes(heroes);
				}
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [heroes, navigate, search, inputRef, pageQuery])

	// scroll to top on page change
	useEffect(() => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	}, [pageQuery])

	return (
		<>
			{
				!isLoading 
				? <>
					<Container>
						<InputContainer>
							<SearchIcon icon={faSearch} />
							<Input type='search' placeholder='Search' ref={inputRef} value={search} onChange={(e) => setSearch(e.target.value)} />
						</InputContainer>
					</Container>
					{	filteredHeroes.length 
						? <Grid>
							{ 
								filteredHeroes.slice(elementsByPage * (pageQuery - 1), elementsByPage * pageQuery).map(hero => {
									return (
										<GridItem hero={hero} key={hero.id} />
									)
								})
							} 
						</Grid>
						: <NotFound onClick={() => {setSearch("")}}>{heroes.length ? `Hero '${search}' not found` : 'Heroes not found'}</NotFound>
					}
					<Pagination total={filteredHeroes.length} currentPage={pageQuery} elementsByPage={elementsByPage} search={search} />
				</> 
				: <Loader />
			}
		</>
	)
}

export default Home
