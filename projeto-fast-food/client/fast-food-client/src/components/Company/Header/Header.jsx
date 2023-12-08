// Header.js
import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; 

const Header = ({ onSearch, onLogout }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <img
          src="/fastfood-high-resolution-logo-transparent.png"
          alt="Bitz Logo"
          width="30"
          height="30"
          className="d-inline-block align-top"
          style={{ marginRight: '8px' }}
        />
        FastFood
      </Navbar.Brand>
      <Form style={{ width: '100%' }}>
        <FormControl
          type="text"
          placeholder="Pesquisar Empresa"
          className="mr-sm-2 w-100 no-shadow" 
          onChange={(e) => onSearch(e.target.value)}
        />
      </Form>
      <Button
        className="ml-auto" 
        onClick={onLogout}
      >
        Sair
      </Button>
    </Navbar>
  );
};

export default Header;
