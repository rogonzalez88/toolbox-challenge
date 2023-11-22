import React from 'react';
import { Header, Table } from './components';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Container fluid>
      <Header />
      <Container>
        <Table />
      </Container>
    </Container>
  );
};

export default App;
