const Pagination = ({
  totalItem,
  itemPerPage,
  setCurrentPage,
  currentPage,
}: any) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalItem / itemPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav
      className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'
      aria-label='Pagination'>
      <div className='hidden sm:block'>
        <p className='text-sm text-gray-700'>
          Page <span className='font-medium'>{currentPage}</span> of{' '}
          <span className='font-medium'>{pages.length}</span> Showing{' '}
          <span className='font-medium'>{totalItem}</span> transactions{' '}
        </p>
      </div>
      <div className='flex-1 flex justify-between sm:justify-end'>
        {currentPage !== 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
            Previous
          </button>
        )}
        {/* {pages.map((page) => {
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${
                  currentPage === page
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                } ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md bg-white hover:text-gray-700`}>
                {page}
              </button>
            );
          })} */}
        {currentPage !== pages.length && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
            Next
          </button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
