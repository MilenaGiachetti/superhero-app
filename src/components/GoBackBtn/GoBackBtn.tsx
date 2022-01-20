import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const GoBack = styled.button`
	padding: 0.5rem 1rem;
	margin: 2rem 0 4rem auto;
	font-weight: bold;
	border-radius: 3px;
	color: #FFF;
	background-color: #EE964B;
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
