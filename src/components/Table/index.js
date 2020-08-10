/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import styled from 'styled-components';

const Table = styled.table`
width: 100%;
border-collapse: collapse;
border: 3px solid var(--primary);
margin: 30px 0;
`;

const THead = styled.thead`
font-weight: bold;
font-size: 20px;
color: var(--white);
}
`;

const TH = styled.th`
 border: 3px solid var(--primary);
`;

const TD = styled.td`
border: 2px solid var(--grayLight);
height: 100%;
text-align: left;
padding: 5px 2px;
`;

const Button = styled.button`
  padding:  8px 10px;
  border: none;
  border-radius: 2px;
  font-weight: bold;
  margin: 0 0 10px 0;
  background: var(--grayLight);
  &:focus{
    background: var(--primary);
  }
`;

const Span = styled.span`
  font-size: 20px;
  margin: 0 0 0 10px;
`;
const Input = styled.input`
    padding:  5px 0;
`;
const Select = styled.select`
    padding: 5px 0;
`;

const Pagination = styled.div`
  margin: 0 0 20px 0;
`;

export function TableContainer({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
  );
  return (
    <>
      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TH {...column.getHeaderProps()}>{column.render('Header')}</TH>
              ))}
            </tr>
          ))}
        </THead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => <TD {...cell.getCellProps()}>{cell.render('Cell')}</TD>)}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Pagination>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>
        {' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>
        {' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>
        {' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>
        {' '}
        <Span>
          Página
          {' '}
          <strong>
            {pageIndex + 1}
            {' '}
            of
            {' '}
            {pageOptions.length}
          </strong>
          {' '}
        </Span>
        <Span>
          | Ir para a página:
          {' '}
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pages = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pages);
            }}
            style={{ width: '100px' }}
          />
        </Span>
        {' '}
        <Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20, 50, 100].map((pageSizes) => (
            <option key={pageSizes} value={pageSizes}>
              Show
              {' '}
              {pageSizes}
            </option>
          ))}
        </Select>
      </Pagination>
    </>
  );
}

TableContainer.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableContainer;
