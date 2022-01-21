import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SkillBarContainer from '../components/SkillBar/SkillBarContainer';
import List from '../components/List/List';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import NotFound from '../components/NotFound/NotFound';


const Title = styled.h3`
	border-bottom: 2px solid #f2f2f2;
	padding-top: 2rem;
`

const Subtitle = styled.h4`
	padding: 0.5rem 0;
`

const HeroTitle = styled.div`
	background-color: #000;
	color: #fff;
	margin: 0 auto;
	max-width: 2200px;
	position: relative;
	.content {
		display: flex;
		flex-flow: column;
		margin: 0 auto;
		max-width: 1200px;
		padding: 0 1rem;
	}
	img {
		border-radius: 50%;
		height: 12rem;
		object-fit: cover; 
		object-position: 100% 0;
		width: 12rem;
	}
	.heroTitleContainer {
		align-items: center;
		display: flex;
		justify-content: space-between;
		text-align: right;
		p {
			color: #CCC;
			font-size: 1.5rem;
		}
		h2 {
			font-size: 3rem;
		}
		@media (max-width: 576px) {
			flex-flow: column;
			justify-content: center;
			text-align: center;
			p {
				padding-top: 2rem;
			}
		}
	}
`

const SVGContainer = styled.div`
	max-height: 150px;
	overflow: hidden;
	width: 100%;
	svg {
		height: 100%;
		max-height: 150px;
		width: 100%;
	}
`

const LeftContainer = styled.div`
	padding-right: 5rem;
	width: 100%;
	@media (max-width: 768px) {
		padding-right: unset;
    }
	.powerStats {
		max-width: 50vw;
		padding: 1rem 0;
		width: 600px;
		@media (max-width: 768px) {
			max-width: unset;
			padding-right: 4rem;
			width: 100%;
		}
	}
`

const RightContainer = styled.div`
	width: 400px;
	text-align: center;
	h3 {
		display: inline-block;
		padding: 0.5rem 1rem;
		position: relative;
		top: 20px;
		z-index: 2;
		&:before {
			content: '';
			display: block;
			background-color: #fff;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
		}
	}
	@media (max-width: 768px) {
		width: 100%;
    }
`

const HeroContent = styled.div`
	display: flex;
	padding: 0 1rem 5rem 1rem;
	margin: 0 auto;
	max-width: 1200px;
	@media (max-width: 768px) {
		flex-flow: column;
    }
`

const BlockContainer = styled.div`
	text-align: left;
	border: 1px solid #CCC;
	border-radius: 3px;
	&.double-block {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
`

const Block = styled.div`
	padding: 1rem 0.5rem;
	width: 100%;
	&:nth-child(1), &:nth-child(2) {
		padding-top: 2rem;
	}
	&.double {
		&:nth-child(2n) {
			border-left: 1px solid #ccc;
		}
	}
	h4 {
		font-size: 14px;
		color: #CCC;
		text-transform: uppercase;
	}
`

const Hero = () => {
	const [hero, setHero] = useState<any>(null);
	let { id } = useParams();

	useEffect(() => {
		axios.get(`https://akabab.github.io/superhero-api/api/id/${id}.json`)
		.then(response => {
			console.log(response.data)
			setHero(response.data);
		})
		.catch(error => {
			setHero(null)
		})
	}, [id]);

	const powerStats:any[] = [];
	if (hero) {
		Object.entries(hero.powerstats).forEach(([key, val]) => {
			powerStats.push(
				<SkillBarContainer key={key} title={key} val={val}/>
			)
		})
	}

	return (
		<>
			{
				hero 
				? 
				<>
					<HeroTitle>
						<div className='content'>
							<GoBackBtn/>
							<div className='heroTitleContainer'>
								<img src={hero.images.sm} alt={hero.name}/>
								<div>
									<p>{hero.biography.fullName}</p>
									<h2>{hero.name}</h2>
								</div>
							</div>
						</div>
					</HeroTitle>
					<SVGContainer>
						<svg viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M0.00,49.98 C246.32,94.23 248.02,38.97 537.52,12.33 L500.00,0.00 L0.00,0.00 Z" style={{stroke: 'none', fill: '#000'}}></path></svg>
					</SVGContainer>
					<HeroContent>
						<LeftContainer>
							<section>
								<Title>Power Stats</Title>
								<section className="powerStats">
									{powerStats}
								</section>
							</section>
							<section>
								<Title>Work</Title>
								<Subtitle>Base:</Subtitle>
								<List array={hero.work.base.split('; ')}/>
								<Subtitle>Occupation:</Subtitle>
								<List array={hero.work.occupation.split(', ').join(';').split(';')}/>
							</section>
							<section>
								<Title>Connections</Title>
								<Subtitle>Group Affiliation:</Subtitle>
								<List array={hero.connections.groupAffiliation.split('; ').join(',').split(',')}/>
								<Subtitle>Relatives:</Subtitle>
								<List array={hero.connections.relatives.split(/,(?!\sdeceased|\sseparated|\spaternal|\slegal)/).join(';').split(/;(?!\sunconfirmed)/)}/>
							</section>
						</LeftContainer>
						<RightContainer>
							<section>
								<h3>Appearance</h3>
								<BlockContainer className='double-block'>
									<Block className='double'>
										<h4>Gender </h4>
										<p>{hero.appearance.gender}</p>
									</Block>
									<Block className='double'>
										<h4>Race </h4>
										<p>{hero.appearance.race}</p>
									</Block>
									<Block className='double'>
										<h4>Height </h4>
										<p>{hero.appearance.height[1]}</p>
									</Block>
									<Block className='double'>
										<h4>Weight </h4>
										<p>{hero.appearance.weight[1]}</p>
									</Block>
									<Block className='double'>
										<h4>Eye color </h4>
										<p>{hero.appearance.eyeColor}</p>
									</Block>
									<Block className='double'>
										<h4>Hair color </h4>
										<p>{hero.appearance.hairColor}</p>
									</Block>
								</BlockContainer>
							</section>
							<section>
								<h3>Biography</h3>
								<BlockContainer>
									<Block>
										<h4>Alter egos </h4>
										<p>{hero.biography.alterEgos}</p>
									</Block>
									<Block>
										<h4>Aliases </h4>
										{  
											hero.biography.aliases ?
											<List array={hero.biography.aliases}/>
											: null
										}
									</Block>
									<Block>
										<h4>Place of birth </h4>
										<p>{hero.biography.placeOfBirth}</p>
									</Block>
									<Block>
										<h4>First appearance </h4>
										<p>{hero.biography.firstAppearance}</p>
									</Block>
									<Block>
										<h4>Publisher </h4>
										<p>{hero.biography.publisher}</p>
									</Block>
									<Block>
										<h4>Alignment </h4>
										<p style={{textTransform: "capitalize"}}>{hero.biography.alignment}</p>
									</Block>
								</BlockContainer>
							</section>
						</RightContainer>
					</HeroContent>
				</>
				: 
				<NotFound>Hero not found</NotFound>
			}
		</>
	)
}

export default Hero;