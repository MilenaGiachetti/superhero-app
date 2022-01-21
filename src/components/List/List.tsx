import styled from 'styled-components';

const ListContainer = styled.ul`
	padding-left: 10px;
`

const ListItem = styled.li`
	position: relative;
	text-transform: capitalize;
	&:before {
		background-color: #CCC;
		border-radius: 1px;
		content: '';
		display: block;
		height: 1px;
		left: -10px;
		position: absolute;
		top: 16px;
		width: 5px;
	}
`

function List({array} : {array: string[]}) {
	return (
		<ListContainer>
			{ array.map((el, i) => {
				return <ListItem key={i}>{el}</ListItem>
			})}
		</ListContainer>
	)
}

export default List;