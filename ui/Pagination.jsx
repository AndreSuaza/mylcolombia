import { useLayoutEffect, useState } from "react";

export const Pagination = ({ page , totalCount , limit , currentPage = 0, isLoading }) => {
  
    const [pageNumber, setPageNumber] = useState([])

    useLayoutEffect(() => {       
        let pages = [];
        for (let i = 1; i <= Math.ceil(totalCount/limit); i++) {
            pages = [...pages, i];
        }
        setPageNumber(pages);
        console.log(totalCount, limit);
    }, [totalCount])

    return (
        !isLoading && 
            <ul className="pagination my-4">
                <li className={currentPage -1 > 0 ? "page-item": "page-item disabled"}>
                    <span 
                        className="page-link text-warning"
                        aria-label="Previous"
                        onClick={() =>  page(currentPage-1) }
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>
                { pageNumber.map((i) => {
                    if( i <=10 ) {
                        return <li key={i} className="page-item">
                            <span 
                                className={ i === currentPage ? "page-link text-warning bg-primary" : "page-link text-warning"}
                                onClick={() => page(i) }
                            >{i}</span>
                        </li>
                    }
                })}
                <li className={currentPage < pageNumber.length ? "page-item": "page-item disabled"}>
                    <span 
                        className="page-link text-warning" 
                        aria-label="Next"
                        onClick={() => page(currentPage+1) }
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            </ul>
             
  )
}
