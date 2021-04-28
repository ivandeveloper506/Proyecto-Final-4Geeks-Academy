import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import AvatarLoginUser from "./avatar-login-user";

export const NavbarMain = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		if (store.userLogged) {
			history.push(store.activeOption);
		} else {
			history.push("/");
		}
	});

	return (
		<div className="text-white">
			{store.userLogged ? (
				<Navbar expand="lg">
					<NavLink className="navbar-item-logo-class" to="/">
						QR+Service
					</NavLink>
					<Navbar.Toggle className="bg-white" />
					<Navbar.Collapse>
						<Nav className="mr-auto">
							<NavLink className="navbar-item-class" to="person">
								<i className="fas fa-users"></i> Personas
							</NavLink>
							<NavLink className="navbar-item-class" to="person-info">
								<i className="fas fa-address-book"></i> Información Personas
							</NavLink>
							<NavLink className="navbar-item-class" to="person-generate-qr">
								<i className="fas fa-qrcode"></i> Generar QR
							</NavLink>
						</Nav>
						<AvatarLoginUser />
					</Navbar.Collapse>
				</Navbar>
			) : (
				<Navbar expand="lg">
					<NavLink className="navbar-item-logo-class" to="/">
						QR+Service
					</NavLink>
					<Navbar.Toggle className="bg-white" />
					<Navbar.Collapse>
						<Nav className="mr-auto">
							<NavLink className="navbar-item-class" to="/">
								<i className="fas fa-home"></i> Inicio
							</NavLink>
							<NavLink className="navbar-item-class" to="about-us">
								<i className="fas fa-users"></i> Quiénes somos
							</NavLink>
							<NavLink className="navbar-item-class" to="services">
								<i className="fas fa-boxes"></i> Servicios
							</NavLink>
							<NavLink className="navbar-item-class" to="contact">
								<i className="fas fa-envelope"></i> Contáctenos
							</NavLink>
						</Nav>
						<AvatarLoginUser />
					</Navbar.Collapse>
				</Navbar>
			)}
		</div>
	);
};
