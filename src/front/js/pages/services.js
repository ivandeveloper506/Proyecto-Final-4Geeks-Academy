import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.scss";
import "../../styles/services.scss";
import imgService1 from "../../img/img-service-1.png";
import imgService2 from "../../img/img-service-2.png";
import { QRCode } from "react-qrcode-logo";
import { Table } from "react-bootstrap";

export default function Conctat() {
	const { store, actions } = useContext(Context);

	const Like = () => {
		return <i className="fas fa-thumbs-up" />;
	};

	return (
		<div className="container-fluid main-div-class">
			<div className="container">
				<div className="row">
					<div className="col title-page-class">
						<h1>Servicios</h1>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-md-6 text-white">
						<div className="img-card-class">
							<img src={imgService1} alt="Image Services 1" />
						</div>
					</div>
					<div className="col-md-6">
						<div className="card-class">
							<p>
								<strong>Qr+Service</strong> es una aplicación que te permite registrar tus datos
								personales, la lista de medicamentos y un registro de control de vacunas. Información
								que permitirá generar un Código QR para tener de forma digitalizada tan importante
								información.
							</p>
						</div>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col text-white">
						<QRCode
							value="QR+Service. ¡Registrese y sea parte de este gran beneficio!"
							size="200"
							ecLevel="H"
							qrStyle="squares"
							quietZone="20"
							fgColor="#263238"
							enableCORS="true"
						/>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col-md-7">
						<div className="card-class">
							<h2 className="p-3">¿Para que puedo usar QR+Services?</h2>

							<Table variant="transparent">
								<tbody>
									<tr>
										<td width="5">
											<Like />
										</td>
										<td className="td-main-class">
											Para cuando necesites cuidar de otras personas.
										</td>
									</tr>
									<tr>
										<td width="5">
											<Like />
										</td>
										<td className="td-main-class">
											Para disponer información importante generando un Código QR.
										</td>
									</tr>
									<tr>
										<td width="5">
											<Like />
										</td>
										<td className="td-main-class">
											Para registrar los medicamentos que usas diariamente.
										</td>
									</tr>
									<tr>
										<td width="5">
											<Like />
										</td>
										<td className="td-main-class">Para llevar tu control de vacunas.</td>
									</tr>
									<tr>
										<td width="5">
											<Like />
										</td>
										<td className="td-main-class">
											Para registrar información de contacto en caso de emergencia.
										</td>
									</tr>
								</tbody>
							</Table>

							{/* <p>
								<i className="fas fa-thumbs-up"></i> Para cuando necesites cuidar de otras personas.
							</p>
							<p>
								<i className="fas fa-thumbs-up"></i> Para disponer tu información importante generando
								un Código QR.
							</p>
							<p>
								<i className="fas fa-thumbs-up"></i> Para registrar los medicamentos que usas
								diariamente.
							</p>
							<p>
								<i className="fas fa-thumbs-up"></i> Para llevar tu control de vacunas.
							</p>
							<p>
								<i className="fas fa-thumbs-up"></i> Para registrar información de contacto en caso de
								emergencia.
							</p> */}
						</div>
					</div>
					<div className="col-md-5 text-white">
						<div className="img-card-class">
							<img src={imgService2} alt="Image Services 2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
