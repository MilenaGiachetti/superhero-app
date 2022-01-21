import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const GoBack = styled.button`
	background-color: #EE964B;
	border-radius: 3px;
	color: #FFF;
	font-weight: bold;
	margin: 2rem 0 4rem auto;
	padding: 0.5rem 1rem;
	span {
		margin-left: 10px;
	}
`

function GoBackBtn() {
	const navigate = useNavigate();
	return (
		<GoBack onClick={() => navigate(-1)}>
			<FontAwesomeIcon icon={faAngleLeft} />
			<span>
				Go back
			</span>
		</GoBack>
	)
}

export default GoBackBtn;