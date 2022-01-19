import { Link } from "react-router-dom";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faAngleRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { usePagination } from '../hooks/usePagination';

interface Props {
    o?: {
        isCurrentPage: boolean
    }
}

const PaginationCtn = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 2rem 0;
`;

const Button = styled(Link)<Props>`
    background-color:${props => props.o?.isCurrentPage ? '#135490' : 'transparent'};
    border-radius: 3px;
    color: ${props => props.o?.isCurrentPage ? '#fff' : '#000'};
    cursor: pointer;
    display: block;
    font-size: 1rem;
    font-weight: 600;
    height: 3rem;
    margin: 0 5px;
    padding: 0.8rem 0;
    text-align: center;
    text-decoration: none;
    transition: background-color .3s ease;
    width: 3rem;
    &:hover {
        background-color:${props => props.o?.isCurrentPage ? '#135490' : 'rgba(19, 84, 144, 0.2)'};
    }
    &:active {
        background-color:${props => props.o?.isCurrentPage ? '#135490' : 'rgba(19, 84, 144, 0.5)'};
    }
`;
const IconButton = styled(Link)`
    border-radius: 3px;
    color: #000;
    cursor: pointer;
    height: 3rem;
    margin: 0 5px;
    padding: 0.8rem 0;
    text-align: center;
    width: 3rem;
    &:hover {
        background-color: rgba(19, 84, 144, 0.2);
    }
    &:active {
        background-color: rgba(19, 84, 144, 0.5);
    }
`;
const Dots = styled.div`
    border-radius: 3px;
    display: inline-block;
    height: 3rem;
    margin: 0 5px;
    padding: 0.8rem 1rem;
    width: 3rem;
`;

const Pagination = ({total, currentPage, elementsByPage}) => {
    const pagination = usePagination({
        currentPage,
        totalElements: total,
        elementsByPage,
        btnQuantity: 7 // min number = 5
    })

    return (
        <PaginationCtn>
            {
                currentPage > 1 &&
                <>
                    <IconButton to="?page=1">
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </IconButton>
                    <IconButton to={`?page=${currentPage - 1}`}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </IconButton>
                </>
            }
            {
                pagination.map((page, i) => {
                    if(page) {
                        return (
                            <Button 
                                to={`?page=${page}`}
                                // onClick={() => changePage(page)} 
                                key={i} 
                                o={({isCurrentPage: currentPage === page})}>
                                    {page}
                            </Button>
                        )
                    } else {
                        return (
                            <Dots>
                                <FontAwesomeIcon icon={faEllipsisH} key={i}/>
                            </Dots>
                        )
                    }
                })
            }
            {
                currentPage < Math.ceil(total / elementsByPage) && 
                <>
                    <IconButton to={`?page=${currentPage + 1}`}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </IconButton>
                    <IconButton to={`?page=${Math.ceil(total / elementsByPage)}`}>
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </IconButton>
                </>
            }
        </PaginationCtn>
    )
}

export default Pagination;