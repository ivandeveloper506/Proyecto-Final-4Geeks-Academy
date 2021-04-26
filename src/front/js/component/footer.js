import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import "../../styles/footer.scss";
import { Link, NavLink } from "react-router-dom";

export const Footer = () => (
	<div className="container-fluid main-footer-class">
		<footer>
			<div className="row">
				<div className="col-md-4">
					<div className="row">
						<div className="col">
							<h3>Acerca de</h3>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<p>
								Un QR es su enlace físico. Es una acción rápida y sencilla. Un QR es fácil de crear y
								existen diferentes versiones y tipos, así como los hay estáticos y dinámicos. Inclusive
								un QR puede hasta sufrir daños y aún funcionar. No lo piense más, QR+Service es su mejor
								opción.
							</p>
						</div>
					</div>
				</div>

				<div className="col-md-4">
					<div className="row">
						<div className="col">
							<h3>Contáctenos</h3>
						</div>
					</div>
					<div className="row">
						<div className="col social-media-class">
							<p>
								<i className="fa fa-map-marker" /> Torre Mercedes San José, Costa Rica
							</p>
							<p>
								<i className="fa fa-phone" /> (+506) 2222-2222
							</p>
							<div className="row">
								<div className="col">
									<NavLink to="contact">
										<i
											className="fa fa-envelope fa-3x mr-3"
											title="Formulario de Contacto"
											aria-hidden="true"></i>
									</NavLink>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-4">
					<div className="row">
						<div className="col">
							<h3>QR+Service</h3>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<img
								src="https://i.imgur.com/0Vy3kHL.jpg"
								className="img-fluid"
								width="80px"
								height="80px"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
);
