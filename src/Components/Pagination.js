import React from 'react';
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";

const Pagination = ({currentPage, firstPage, lastPage, totalResults, prevPage, nextPage}) =>{
    return(
        <nav className="paginationStyle">
            <button 
                className={`btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={prevPage}
                
            >
                <FaArrowLeft/>
            </button>
    <span>showing <strong>{firstPage}-{lastPage}</strong> of <strong>{totalResults}</strong> results</span>
            <button 
                className={`btn ${currentPage === totalResults ? 'disabled' : ''}`}
                onClick={nextPage}
            >
                <FaArrowRight/>
            </button>
        </nav>
    )
}

export default Pagination;