import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';

function App () {
  return (
    <>
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <Outlet/>
      </Container>
    </div>
    </>
  );
}

export default App;
