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
		<Navbar expand="lg">
			<Navbar.Brand className="navbar-item-logo-class" href="/">
				QR+Service
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<NavLink className="navbar-item-class" to="/">
						Inicio
					</NavLink>
					<NavLink className="navbar-item-class" to="about-us">
						Quiénes somos
					</NavLink>
					<NavLink className="navbar-item-class" to="services">
						Servicios
					</NavLink>
					<NavLink className="navbar-item-class" to="contact">
						Contáctanos
					</NavLink>
				</Nav>
				<NavLink to="login">
					<Button variant="danger">Iniciar sesión</Button>
				</NavLink>
			</Navbar.Collapse>
		</Navbar>
	);
};
