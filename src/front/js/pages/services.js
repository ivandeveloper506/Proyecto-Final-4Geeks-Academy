import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.scss";
import "../../styles/services.scss";
import imgService1 from "../../img/img-service-1.png";
import imgService2 from "../../img/img-service-2.png";

export default function Conctat() {
	const { store, actions } = useContext(Context);

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
								personales, la lista de medicamentos y un registro de control de vacunas del COVID-19,
								información que permitirá generar un Código QR para tener de forma digitalizada tan
								importante información.
							</p>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-md-6">
						<div className="card-class">
							<p>
								Puede ser utilizada por cualquier persona que desee tener un registro de sus datos en
								caso de emergencia.
							</p>
							<p>
								Es segura ya que solo usted podrá editar la información que irá en su QR o de las
								personas que haya registrado a su nombre.
							</p>
							<p>
								Muy útil para casos donde se deba cuidar de otras personas, con tan solo hacer la
								lectura del código QR tener acceso a información medica o contacto de emergencia.
							</p>
						</div>
					</div>
					<div className="col-md-6 text-white">
						<div className="img-card-class">
							<img src={imgService2} alt="Image Services 2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
