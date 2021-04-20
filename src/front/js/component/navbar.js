import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-warning">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					Por qué QR+
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarText"
					aria-controls="navbarText"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">
								Ingresar
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Acerca de
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Registrarse
							</a>
						</li>
					</ul>
					<span className="navbar-text">QR+</span>
				</div>
			</div>
		</nav>
	);
};
