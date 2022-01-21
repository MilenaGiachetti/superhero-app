import styled, { keyframes } from 'styled-components';

interface Props {
	percentage?: number
}

const load = (props) => keyframes`
	0% {
		width: 0;
	}
	100% {
		width: ${props.percentage}%;
	}
`

const SkillTitle = styled.h4`
	text-transform: capitalize;
`

const SkillBar = styled.div`
	background: #f2f2f2;
	border-radius: 3px;
	height: 1.5rem;
	margin-bottom: 1rem;
	position: relative;
	width: 100%;
`

const SkillBarFill = styled.div<Props>`
	animation: ${load} .7s ease;
	background: #135490;
	border-radius: 3px;
	height: 100%;
	width: ${(props) => `${props.percentage}%`};
`
const SkillBarValue = styled.p`
	color: #135490;
	padding: 0 1rem;
	position: absolute;
	right: -4rem;
	top: 0;
`

function SkillBarContainer({title, val}:{title: string, val: number}) {
  return (
	<>
		<SkillTitle>{title}</SkillTitle>
		<SkillBar>
			<SkillBarFill percentage={val} />
			<SkillBarValue>
				{`${val}%`}
			</SkillBarValue>
		</SkillBar>
	</>
  )
}

export default SkillBarContainer;
