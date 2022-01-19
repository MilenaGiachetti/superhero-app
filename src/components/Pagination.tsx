import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faAngleRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { usePagination } from '../hooks/usePagination';

const Button = styled.button`
    padding: 0.5rem;
`;
const IconButton = styled.button`
    padding: 0.5rem;
`;
const Dots = styled.div`
    display: inline-block;
    padding: 0.5rem;
`;

const Pagination = ({total}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const elementsByPage = 10;
    const pagination = usePagination({
        currentPage,
        totalElements: total,
        elementsByPage,
        btnQuantity: 6 // min number = 5
    })
    // first character A-Bomb 1
    // last character Zoom 731

    useEffect(() =>{
        console.log(pagination);
        console.log(total);
    }, [total, pagination])

    const changePage = (page:number) => {
        setCurrentPage(page)
    }

    return (
        <>
        {currentPage}
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
                            <Button onClick={() => changePage(page)} key={i}>
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
        </>
    )
}

export default Pagination;