import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import { useQuery } from '../hooks/useQuery';

const Grid = styled.ul`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    padding: 3rem 0;
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

const GridItem = styled(Link)`
    position: relative;
    transition: transform .3s ease;
    width: 100%;
    &:after {
        background: linear-gradient(
            0deg, 
            rgba(1,1,2,1) 0%, 
            rgba(1,1,2,0.5) 35%, 
            rgba(1,1,2,0.2) 60%, 
            rgba(1,1,2,0) 85%
        );
        border-radius: 1rem;
        content: '';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
    &:hover {
        transform: scale(1.05);
        &:before {
            background-color: #EE964B;
            border-radius: 3px 0 0 3px;
            color: #FFF;
            content: 'See More +';
            display: block;
            font-weight: bold;
            padding: 0.5rem 1rem;
            position: absolute;
            right: 0;
            top: 1rem;
        }
    }
`;

const GridItemImg = styled.img`
    border-radius: 1rem;
    width: 100%;
`;

const GridContent = styled.div`
    bottom: 0;
    color: #fff;
    left: 0;
    padding: 1rem;
    position: absolute;
    width: 100%;
    z-index: 2;
`

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
                            <GridItem to={`hero/${hero.id}`} key={hero.id}>
                                <GridItemImg src={hero.images.lg} alt={hero.name} />
                                <GridContent>
                                    <h2>{hero.name} {hero.id}</h2>
                                    <p>Height: {hero.appearance.height[1]}</p>
                                    <p>Weight: {hero.appearance.weight[1]}</p>
                                </GridContent>
                            </GridItem>
                        )
                    })
                }
            </Grid>
            <Pagination total={heroes.length} currentPage={pageQuery} elementsByPage={elementsByPage}/>
        </>
    )
}

export default Home
