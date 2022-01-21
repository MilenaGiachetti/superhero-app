import { useMemo } from 'react';

interface Pagination {
	page: number,
	key: number
}

export const usePagination = ({
	totalElements,
	elementsByPage,
	currentPage,
	btnQuantity
}) : Pagination[] => {
	const paginationBtns = useMemo(() => {
		const pageQuantity = Math.ceil(totalElements / elementsByPage);
		let buttonKey = 0;
		if(pageQuantity <= btnQuantity) {
			return Array.from({length: pageQuantity}, (x, i) => ({page: i + 1, key: i}));
		} else {
			const btns:Pagination[] = [{page: 1, key: buttonKey}],
				siblings = Math.floor((btnQuantity - 2) / 2),
				fullSiblings = Math.floor(btnQuantity - 2);
			if(currentPage <= (1 + siblings)) {
				for(let i = 1; i < fullSiblings; i++) {
					btns.push({page: i + 1, key: ++buttonKey});
				}
				btns.push({page: 0, key: ++buttonKey});
			} else if (currentPage >= (pageQuantity - siblings)) {
				btns.push({page: 0, key: ++buttonKey});
				for(let i = (pageQuantity - fullSiblings + 1); i < pageQuantity; i++) {
					btns.push({page: i, key: ++buttonKey});
				}
			} else {
				btns.push({page: 0, key: ++buttonKey});
				const middleSiblings = btnQuantity - 5,
					leftSiblings = Math.floor(middleSiblings / 2),
					rightSiblings = Math.ceil(middleSiblings / 2);
				for(let i = 0; i < leftSiblings; i++) {
					btns.push({page: currentPage - leftSiblings + i, key: ++buttonKey});
				}
				btns.push({page: currentPage, key: ++buttonKey});
				for(let i = rightSiblings; i > 0; i--) {
					btns.push({page: currentPage + rightSiblings - i + 1, key: ++buttonKey});
				}
				btns.push({page: 0, key: ++buttonKey});
			}
			btns.push({page: pageQuantity, key: ++buttonKey});
			return btns;
		}
	}, [totalElements, elementsByPage, currentPage, btnQuantity]);

	return paginationBtns;
};