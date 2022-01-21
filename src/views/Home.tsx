import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Pagination from '../components/Pagination/Pagination';
import { useQuery } from '../hooks/useQuery';
import GridItem from '../components/GridItem/GridItem';

const Grid = styled.ul`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    padding: 3rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
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
    let query = useQuery().get("page");
    let pageQuery = query ? +query : 1;
    const [heroes, setHeroes] = useState<any[]>([]);
    const elementsByPage = 24;

    useEffect(() => {
        axios.get('https://akabab.github.io/superhero-api/api/all.json')
        .then(response => {
            setHeroes(response.data);
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [pageQuery])

    return (
        <>
            <Grid>
                {
                    heroes.map.length &&
                    heroes.slice(elementsByPage * (pageQuery - 1), elementsByPage * pageQuery).map(hero => {
                        return (
                            <GridItem hero={hero} key={hero.id}/>
                        )
                    })
                }
            </Grid>
            <Pagination total={heroes.length} currentPage={pageQuery} elementsByPage={elementsByPage}/>
        </>
    )
}

export default Home
