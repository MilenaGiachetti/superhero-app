import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Grid = styled.ul`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
`;

const GridItem = styled.li`
    position: relative;
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
`;

const GridItemImg = styled.img`
    border-radius: 1rem;
    width: 100%;
`;

const GridContent = styled.div`
    bottom: 0;
    left: 0;
    padding: 1rem;
    position: absolute;
    width: 100%;
    color: #fff;
    z-index: 2;
`

const Home:React.FC = () => {
    const [heroes, setHeroes] = useState<any[]>([]);
    useEffect(() => {
        axios.get('https://akabab.github.io/superhero-api/api/all.json')
        .then(response => {
            console.log(response.data[6]);
            setHeroes(response.data);
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <Grid>
            {
                heroes.map.length &&
                heroes.map(hero => {
                    return (
                        <GridItem key={hero.id}>
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
    )
}

export default Home
