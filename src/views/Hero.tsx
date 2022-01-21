import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import List from '../components/List/List';
import Loader from '../components/Loader/Loader';
import NotFound from '../components/NotFound/NotFound';
import SkillBarContainer from '../components/SkillBar/SkillBarContainer';
import { Block, BlockContainer, HeroContent, HeroTitle, LeftContainer, RightContainer, Subtitle, SVGContainer, Title } from '../styles/Hero.styles';
import { Hero as HeroType } from '../types/hero.types';

const Hero = () => {
	const [hero, setHero] = useState<HeroType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	let { id } = useParams();

	useEffect(() => {
		axios.get(`https://akabab.github.io/superhero-api/api/id/${id}.json`)
		.then(({data}) => {
			setHero(data);
			setIsLoading(false);
		})
		.catch(() => {
			setHero(null);
			setIsLoading(false);
		})
	}, [id]);

	const powerStats:JSX.Element[] = [];
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
				hero && !isLoading
				? <>
					<HeroTitle>
						<div className='content'>
							<GoBackBtn />
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
						<svg viewBox='0 0 500 150' preserveAspectRatio='none'><path d='M0.00,49.98 C246.32,94.23 248.02,38.97 537.52,12.33 L500.00,0.00 L0.00,0.00 Z' style={{stroke: 'none', fill: '#000'}}></path></svg>
					</SVGContainer>
					<HeroContent>
						<LeftContainer>
							<section>
								<Title>Power Stats</Title>
								<section className='powerStats'>
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
										<p style={{textTransform: 'capitalize'}}>{hero.biography.alignment}</p>
									</Block>
								</BlockContainer>
							</section>
						</RightContainer>
					</HeroContent>
				</>
				: ( 
						isLoading
					?
						<Loader />
					:
						<NotFound>Hero not found</NotFound>
				)
			}
		</>
	)
}

export default Hero;