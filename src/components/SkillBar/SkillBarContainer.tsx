import styled from 'styled-components';

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

const SkillBarFill = styled.div`
    background: #135490;
    border-radius: 3px;
    height: 100%;
`
const SkillBarValue = styled.p`
    color: #135490;
    padding: 0 1rem;
    position: absolute;
    right: -4rem;
    top: 0;
`

function SkillBarContainer({title, val}) {
  return (
    <>
        <SkillTitle>{title}</SkillTitle>
        <SkillBar>
            <SkillBarFill style={{width: `${val}%`}}></SkillBarFill>
            <SkillBarValue>
                {`${val}%`}
            </SkillBarValue>
        </SkillBar>
    </>
  )
}

export default SkillBarContainer;
