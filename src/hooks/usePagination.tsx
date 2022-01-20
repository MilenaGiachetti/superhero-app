import { useMemo } from 'react';

export const usePagination = ({
    totalElements,
    elementsByPage,
    currentPage,
    btnQuantity
}) => {
    const paginationBtns = useMemo(() => {
        const pageQuantity = Math.ceil(totalElements / elementsByPage);
        if(pageQuantity <= btnQuantity) {
            return Array.from({length: pageQuantity}, (x, i) => i + 1);
        } else {
            const btns:number[] = [1],
                siblings = Math.floor((btnQuantity - 2) / 2),
                fullSiblings = Math.floor(btnQuantity - 2);
            if(currentPage <= (1 + siblings)) {
                for(let i = 1; i < fullSiblings; i++) {
                    btns.push(i + 1);
                }
                btns.push(0);
            } else if (currentPage >= (pageQuantity - siblings)) {
                btns.push(0);
                for(let i = (pageQuantity - fullSiblings + 1); i < pageQuantity; i++) {
                    btns.push(i);
                }
            } else {
                btns.push(0);
                const middleSiblings = btnQuantity - 5,
                    leftSiblings = Math.floor(middleSiblings / 2),
                    rightSiblings = Math.ceil(middleSiblings / 2);
                for(let i = 0; i < leftSiblings; i++) {
                    btns.push(currentPage - leftSiblings + i);
                }
                btns.push(currentPage);
                for(let i = rightSiblings; i > 0; i--) {
                    btns.push(currentPage + rightSiblings - i + 1);
                }
                btns.push(0);
            }
            btns.push(pageQuantity);
            return btns;
        }
    }, [totalElements, elementsByPage, currentPage, btnQuantity]);

    return paginationBtns;
};