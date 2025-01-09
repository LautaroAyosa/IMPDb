import MovieCard from './Card/MovieCard';
import { useState, useEffect } from 'react';

const List = ({dataset}) => {
    const [data] = useState(dataset);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 36;
        
    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when search query changes
    }, [searchQuery]);

    const handlePagination = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='list-container'>
            <div className='list-controls'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='list-controls-search input'
                />
            </div>

            <div className={`list-content__flexWrap`}>
                {paginatedData.map((item, i) => (
                    <MovieCard
                        key={i} 
                        data={item}
                    />
                ))}
            </div>

            <div className='list_pagination-container'>
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => handlePagination('prev')}
                    className='paginationButton_prev'>
                    Previous
                </button>
                <span className='paginationInfo'>Page {currentPage} of {totalPages}</span>
                <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => handlePagination('next')}
                    className='paginationButton_next'>
                    Next
                </button>
            </div>
        </div>
    )
}

export default List