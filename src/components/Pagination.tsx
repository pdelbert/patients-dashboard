interface PaginationProps {
    pagination: number
    handlePagination: (action: string) => void
}

const Pagination = ({ pagination, handlePagination }: PaginationProps) => {
    const disablePrev = pagination === 1;
    return (
        <div className="join mt-7">
            <button className="join-item btn btn-accent" disabled={disablePrev} onClick={() => handlePagination('prev')}>«</button>
            <button className="join-item btn ">Page {pagination}</button>
            <button className="join-item btn btn-accent" onClick={() => handlePagination('next')}>»</button>
        </div>
    )
}

export default Pagination