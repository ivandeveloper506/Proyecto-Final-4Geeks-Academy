import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export const NavbarMain = () => {
	return (
		<Navbar className="fixed-top" bg="light" expand="lg">
			<Navbar.Brand href="/">QR+Services</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<NavLink className="m-3" to="/">
						Inicio
					</NavLink>
					<NavLink className="m-3" to="about-us">
						Quiénes somos
					</NavLink>
					<NavLink className="m-3" to="services">
						Servicios
					</NavLink>
					<NavLink className="m-3" to="contact">
						Contáctanos
					</NavLink>
				</Nav>
				<Form inline>
					<Nav.Link href="login">
						<Button variant="danger">Iniciar sesión</Button>
					</Nav.Link>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
};
