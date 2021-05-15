import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from "react-bootstrap/Button";
import {LinkContainer} from 'react-router-bootstrap'

class NavbarCafe extends Component {
    render() {
        return (
            <div>
                <Navbar fixed='top' bg="light" expand="lg">
                    <Navbar.Brand href="#home">Cafe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to='/transaksi'>
                                <Nav.Link>Transaksi Cafe</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/laporan'>
                                <Nav.Link>Laporan Cafe Jurnal</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/master'>
                                <Nav.Link>Master Menu</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/voucher'>
                                <Nav.Link>Voucher Cafe</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/gudang'>
                                <Nav.Link>Transaksi Gudang</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavbarCafe