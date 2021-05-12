import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../../../styles/qrstyles.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { QRCode } from "react-qrcode-logo";

export default function PersonGenerateQr() {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const personId = parseInt(params.personId);

	let personDetail = store.persons[personId];

	const handleGenerate = index => {
		// Se manda a crear el usuario
		const personQRBody = {
			url: `${store.URLCodeQR}${personDetail.id}`,
			person_id: personDetail.id,
			user_creation_id: store.userProfile.id
		};

		actions.generateQR(personQRBody);
	};

	useEffect(() => {
		const personQRBody = {
			person_id: personDetail.id
		};

		actions.getQRCodePerson(personQRBody);

		console.log("*** PersonGenerateQr [store.QRCodePerson] ***");
		console.log(store.QRCodePerson);
		console.log("*** PersonGenerateQr [store.QRCodePerson.length] ***");
		console.log(store.QRCodePerson.length);

		actions.activeOption(`/dashboard/person/generateqr/detail/${personId}`);
	}, []);

	return (
		<div className="container">
			<div className="col-md-2" />
			<div className="col-md-8 container-fluid qr-main-class">
				<div className="row qr-title-main-class">
					<div className="col-md-7">
						<h6>Generar Código QR [{personDetail.full_name}]</h6>
					</div>
					<div className="col-md-5">
						<Tooltip title="Generar Código" aria-label="Generar Código">
							<button className="mt-1 btn btn-success" onClick={event => handleGenerate()}>
								<i className="fas fa-plus"></i> Generar
							</button>
						</Tooltip>
						<Tooltip title="Regresar" aria-label="Regresar">
							<NavLink to="/dashboard/person/generateqr">
								<button className="btn btn-primary ml-3">
									<i className="fas fa-arrow-left"></i> Regresar
								</button>
							</NavLink>
						</Tooltip>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-md-5">
						{/* <p>Generar código QR</p> */}
						{store.QRCodePerson.length === 0 ? (
							<p>
								Utilice la opión del botón Generar para generar el Código QR con la información de la
								persona.
							</p>
						) : (
							<p>
								El Código QR contiene la información que sea desea compartir, de la persona{" "}
								{personDetail.full_name} .
							</p>
						)}
					</div>
					{/* <div className=""></div> */}

					<div className="col-md person-qr-info-class">
						<div className="row">
							<div className="col">
								{store.QRCodePerson.length === 0 ? (
									""
								) : (
									<QRCode
										className="col qr-info-cardL-class"
										value={store.QRCodePerson.url}
										size="150"
										ecLevel="H"
										qrStyle="square"
										fgColor="#003E7E"
										bgColor="#C4F1FE"
										enableCORS="true"
									/>
								)}

								{/* <QRCode
									className="col qr-info-cardL-class"
									value={store.QRCodePerson.url}
									size="150"
									ecLevel="H"
									qrStyle="square"
									fgColor="#003E7E"
									bgColor="#C4F1FE"
									enableCORS="true"
								/> */}
							</div>
							<div className="col qr-info-cardR-class">
								<p className="mt-3">{personDetail.full_name}</p>
								{store.QRCodePerson.length === 0 ? "" : <h5>ESCANEA EL</h5>}
								{store.QRCodePerson.length === 0 ? "" : <h3>CÓDIGO QR</h3>}

								{/* <h5>ESCANEA EL</h5>
								<h3>CÓDIGO QR</h3> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-2" />
		</div>
	);
}
