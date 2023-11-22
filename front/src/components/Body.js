import React, { useEffect } from 'react';

import { Table, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { fetchFileData } from '../store/slices/filesSlice';

const Body = () => {
  const dispatch = useDispatch();
  const { tableData, isLoadingTableData } = useSelector(({ files }) => files);
  
  useEffect(() => {
    dispatch(fetchFileData());
  }, [dispatch]);

  if (isLoadingTableData)
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );

  const tableBody = tableData
    .map((file) => file)
    .map(({ lines }) => lines)
    .flat();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {tableData.length > 0 && tableData[0].lines.length > 0 ? (
            Object.keys(tableData[0].lines[0]).map((header, index) => (
              <th className="text-capitalize" key={index}>
                {header}
              </th>
            ))
          ) : (
            <th>No Results</th>
          )}
        </tr>
      </thead>
      <tbody>
        {tableBody.map((content, index) => (
          <tr key={index}>
            {Object.values(content).map((value, valueIndex) => (
              <td key={valueIndex}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Body;
