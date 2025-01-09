import Card from './Card/Card';
import { useState, useEffect } from 'react';

const List = ({dataset}) => {
    const [data] = useState(dataset);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;
        
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when search query changes
    }, [searchQuery]);

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
      };

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
                {/* <div className="listControls_view-toggle">
                    <button 
                        className={`primary-button ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => handleViewModeChange('list')}>
                        List View
                    </button>
                    <button 
                        className={`top-tv-shows__view-button ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => handleViewModeChange('grid')}>
                            Grid View
                    </button>
                </div> */}
            </div>

            <div className={`list-content__flexWrap`}>
                {paginatedData.map((item, i) => (
                    <Card 
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