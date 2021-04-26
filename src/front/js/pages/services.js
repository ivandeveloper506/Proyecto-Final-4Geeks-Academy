import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../styles/services.scss";

export default function Services() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-white">
			<h1>Services Page</h1>
			<div className="container-fluid main-services-class">
				<div className="row">
					<p>
						Qr+Service es una aplicación que te permite realizar un registro de tus datos personales,
						padecimientos y medicamentos para tener un mayor control de tu historia medica o la de tus seres
						queridos, a través del QR único generado para cada persona registrada.
					</p>
				</div>
				<h2>Ventajas de usar QR+Service</h2>
				<div className="row">
					<ul>
						<li>
							Puede ser utilizada por cualquier persona que desee tener un registro de sus datos en caso
							de emergencia.
						</li>
						<li>
							Es segura ya que solo usted podrá editar la información que irá en su QR o de las personas
							que haya registrado a su nombre.
						</li>
						<li>
							Muy útil para casos donde se deba cuidar de otras personas, con tan solo hacer la lectura
							del código QR tener acceso a información medica o contacto de emergencia.
						</li>
					</ul>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div>
							<NavLink to="register">
								<Button variant="btn btn-warning btn-lg">
									Quiero registrarme <i className="fas fa-pen" />
								</Button>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
