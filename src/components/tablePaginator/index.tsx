import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';

interface ITablePaginatorProps {
    onPageChange: (page: number) => void,
    pageCount: number,
}

export function TablePaginator({ onPageChange, pageCount }: ITablePaginatorProps) {
    return (
        <ReactPaginate
            pageCount={pageCount}
            previousLabel="<"
            nextLabel=">"
            pageRangeDisplayed={2}
            onPageChange={(e) => onPageChange(e.selected + 1)}
            breakClassName={styles.break}
            activeClassName={styles.active}
            nextClassName={styles.nextPage}
            previousClassName={styles.prevPage}
            pageClassName={styles.page}
            className={styles.paginator}
            containerClassName={styles.paginator}
            renderOnZeroPageCount={null}
        />
    )
}