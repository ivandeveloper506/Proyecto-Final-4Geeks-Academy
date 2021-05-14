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
import { QRCode } from "react-qrcode-logo";

export const NavbarMain = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		history.push(store.activeOption);
	});

	const AppLogo = () => {
		return (
			<QRCode
				value="medicQR"
				size="55"
				ecLevel="M"
				qrStyle="dots"
				quietZone="3"
				logoOpacity="3"
				enableCORS="true"
			/>
		);
	};

	return (
		<div>
			{store.infoQRActive ? (
				""
			) : (
				<div className="text-white">
					{store.userLogged ? (
						<Navbar expand="lg">
							<NavLink className="navbar-item-logo-class" to="/dashboard/person">
								<AppLogo />
							</NavLink>
							<Navbar.Toggle className="bg-white" />
							<Navbar.Collapse>
								<Nav className="mr-auto">
									<NavLink className="navbar-item-class" to="/dashboard/person">
										<i className="fas fa-users"></i> Personas
									</NavLink>
									<NavLink className="navbar-item-class" to="/dashboard/person/generateqr">
										<i className="fas fa-qrcode"></i> Generar QR
									</NavLink>
								</Nav>
								<AvatarLoginUser />
							</Navbar.Collapse>
						</Navbar>
					) : (
						<Navbar expand="lg">
							<NavLink className="navbar-item-logo-class" to="/">
								<AppLogo />
							</NavLink>
							<Navbar.Toggle className="bg-white" />
							<Navbar.Collapse>
								<Nav className="mr-auto">
									<NavLink className="navbar-item-class" to="/home">
										<i className="fas fa-home"></i> Inicio
									</NavLink>
									<NavLink className="navbar-item-class" to="/about-us">
										<i className="fas fa-users"></i> Quiénes somos
									</NavLink>
									<NavLink className="navbar-item-class" to="/services">
										<i className="fas fa-boxes"></i> Servicios
									</NavLink>
									<NavLink className="navbar-item-class" to="/contact">
										<i className="fas fa-envelope"></i> Contáctenos
									</NavLink>
								</Nav>
								<AvatarLoginUser />
							</Navbar.Collapse>
						</Navbar>
					)}
				</div>
			)}
		</div>
	);
};
