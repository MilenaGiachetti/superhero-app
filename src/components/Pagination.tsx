import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faAngleRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { usePagination } from '../hooks/usePagination';

interface Props {
    o?: {
        isCurrentPage: boolean
    }
}

const PaginationCtn = styled.div`
    padding: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button<Props>`
    cursor: pointer;
    margin: 0 5px;
    border-radius: 3px;
    width: 3rem;
    font-weight: 600;
    font-size: 1rem;
    transition: background-color .3s ease;
    height: 3rem;
    background-color:${props => props.o?.isCurrentPage ? '#135490' : 'transparent'};
    color: ${props => props.o?.isCurrentPage ? '#fff' : '#000'};
    padding: 0.5rem;
    &:hover {
        background-color:${props => props.o?.isCurrentPage ? '#135490' : 'rgba(19, 84, 144, 0.2)'};
    }
    &:active {
        background-color:${props => props.o?.isCurrentPage ? '#135490' : 'rgba(19, 84, 144, 0.5)'};
    }
`;
const IconButton = styled.button`
    cursor: pointer;
    margin: 0 5px;
    border-radius: 3px;
    // background-color: #EE964B;
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    &:hover {
        background-color: rgba(19, 84, 144, 0.2);
    }
    &:active {
        background-color: rgba(19, 84, 144, 0.5);
    }
`;
const Dots = styled.div`
    margin: 0 5px;
    border-radius: 3px;
    width: 3rem;
    height: 3rem;
    display: inline-block;
    padding: 0.8rem 1rem;
`;

const Pagination = ({total, currentPage, elementsByPage, changeCurrentPage}) => {
    const pagination = usePagination({
        currentPage,
        totalElements: total,
        elementsByPage,
        btnQuantity: 7 // min number = 5
    })

    const changePage = (page:number) => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        changeCurrentPage(page);
    }

    return (
        <PaginationCtn>
            {
                currentPage > 1 &&
                <>
                    <IconButton onClick={() => changePage(1)}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </IconButton>
                    <IconButton onClick={() => changePage(currentPage - 1)}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </IconButton>
                </>
            }
            {
                pagination.map((page, i) => {
                    if(page) {
                        return (
                            <Button onClick={() => changePage(page)} key={i} o={({isCurrentPage: currentPage === page})}>
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
                    <IconButton onClick={() => changePage(currentPage + 1)}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </IconButton>
                    <IconButton onClick={() => changePage(Math.ceil(total / elementsByPage))}>
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </IconButton>
                </>
            }
        </PaginationCtn>
    )
}

export default Pagination;