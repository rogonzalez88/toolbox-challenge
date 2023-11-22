import React, { useEffect } from 'react';

import { Container, Navbar, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFileList, fetchFileData } from '../store/slices/filesSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { fileList, isLoadingFileList } = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(fetchFileList());
  }, [dispatch]);

  const handleFilter = (newValue) => {
    if (newValue === 'all') {
      dispatch(fetchFileData());
    } else {
      dispatch(fetchFileData({ fileName: newValue }));
    }
    
  };

  return (
    <Navbar bg="light" expand="lg" fluid>
      <Container fluid>
        <Navbar.Brand>React Test App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Form.Group className="d-flex align-items-center w-25">
            <Form.Label className="w-50">Filter by </Form.Label>
            <Form.Select
              onChange={(event) => handleFilter(event.target.value)}
              disabled={isLoadingFileList}
              defaultValue="select"
            >
              <option value="select" disabled>
                Select file name
              </option>
              {fileList &&
                fileList.files.map((file, index) => (
                  <option value={file} key={index}>
                    {file}
                  </option>
                ))}
              <option value="all">
                All
              </option>
            </Form.Select>
          </Form.Group>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
