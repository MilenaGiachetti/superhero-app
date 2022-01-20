import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Avatar = styled.img`
	width: 7rem;
	height: 7rem;
	border-radius: 50%;
	object-fit: cover; 
	object-position: 100% 0;
`
const SkillTitle = styled.h4`
	text-transform: capitalize;
`
const SkillBar = styled.div`
	background: #f2f2f2;
	border-radius: 3px;
	height: 1rem;
	width: 100%;
`;

const SkillBarFill = styled.div`
	background: #EE964B;
	border-radius: 3px;
	height: 100%;
`;

const ListItem = styled.li`
	text-transform: capitalize;
	position: relative;
	&:before {
		content: '';
		position: absolute;
		border-radius: 1px;
		left: -15px;
		bottom: 5px;
		display: block;
		width: 5px;
		background-color: #135490;
		height: 5px;
	}
`

const Hero = () => {
	const navigate = useNavigate();
	const [hero, setHero] = useState<any>(null);
	let { id } = useParams();

	useEffect(() => {
		axios.get(`https://akabab.github.io/superhero-api/api/id/${id}.json`)
		.then(response => {
			console.log(response.data)
			setHero(response.data);
		})
		.catch(error => {
			console.log(error)
		})
	}, [id]);

	const powerStats:any[] = [];
	if (hero) {
		Object.entries(hero.powerstats).forEach(([key, val]) => {
			powerStats.push(
				<div key={key}>
					<SkillTitle>{key}</SkillTitle>
					<SkillBar>
						<SkillBarFill role='progressbar' style={{width: `${val}%`}}></SkillBarFill>
					</SkillBar>
				</div>
			)
		})
	}

	return (
		<>
			<button onClick={() => navigate(-1)}>go back</button>
			{
				hero 
				? 
				<>
					<h2>{hero.name}</h2>
					<Avatar src={hero.images.sm} alt={hero.name}></Avatar>
					<section>
						<h3>Appearance</h3>
						<p>Gender: {hero.appearance.gender}</p>
						<p>Race: {hero.appearance.race}</p>
						<p>Height: {hero.appearance.height[1]}</p>
						<p>Weight: {hero.appearance.weight[1]}</p>
						<p>Eye color: {hero.appearance.eyeColor}</p>
						<p>Hair color: {hero.appearance.hairColor}</p>
					</section>
					<section>
						<h3>Biography</h3>
						<p>Full name: {hero.biography.fullName}</p>
						<p>Alter egos: {hero.biography.alterEgos}</p>
						<p>Aliases: </p>
						{  
							hero.biography.aliases ?
							<ul>
								{ hero.biography.aliases.map((el) => {
									return <ListItem key={el}>{el}</ListItem>
								})
								}
							</ul>
							: null
						}
						<p>Place of birth: {hero.biography.placeOfBirth}</p>
						<p>First appearance: {hero.biography.firstAppearance}</p>
						<p>Publisher: {hero.biography.publisher}</p>
						<p>Alignment: {hero.biography.alignment}</p>
					</section>
					<section>
						<h3>Power Stats</h3>
						{powerStats}
					</section>
					<section>
						<h3>Work</h3>
						<h4>Base:</h4>
						<ul>
							{
								hero.work.base.split('; ').map((el) => {
									return <ListItem key={el}>{el}</ListItem>
								})
							}
						</ul>
						<h4>Occupation:</h4>
						<ul>
							{
								hero.work.occupation.split(', ').join(';').split(';').map((el) => {
									return <ListItem key={el}>{el}</ListItem>
								})
							}
						</ul>
					</section>
					<section>
						<h3>Connections</h3>
						<h4>Group Affiliation:</h4>
						<ul>
							{
								hero.connections.groupAffiliation.split('; ').join(',').split(',').map((el) => {
									return <ListItem key={el}>{el}</ListItem>
								})
							}
						</ul>
						<h4>Relatives:</h4>
						<ul>
							{
								hero.connections.relatives.split(/,(?!\sdeceased|\sseparated|\spaternal|\slegal)/).join(';').split(/;(?!\sunconfirmed)/).map((el) => {
									return <ListItem key={el}>{el}</ListItem>
								})
							}
						</ul>
					</section>
				</>
				: <p>Hero not found</p>
			}
		</>
	)
}

export default Hero;