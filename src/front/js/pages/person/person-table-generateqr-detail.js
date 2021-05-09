import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../../../styles/qrstyles.scss";
import Tooltip from "@material-ui/core/Tooltip";

export default function PersonGenerateQr() {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const personId = parseInt(params.personId);

	let personDetail = store.persons[personId];

	const handleGenerate = index => {
		// let personDelete = store.persons[index];

		alert("Entro a generar el código QR");

		console.log("*** handleGenerate ***");
		console.log(personDetail);
		console.log(`${store.URLCodeQR}${personDetail.id}`);

		// Se manda a crear el usuario
		const personQRBody = {
			url: `${store.URLCodeQR}${personDetail.id}`,
			person_id: personDetail.id,
			user_creation_id: store.userProfile.id
		};

		actions.generateQR(personQRBody);
	};

	useEffect(() => {
		console.log("*** PersonGenerateQr [useEffect] - Entro a generar el código QR ***");

		const personQRBody = {
			person_id: personDetail.id
		};

		actions.getQRCodePerson(personQRBody);

		console.log("*** PersonGenerateQr [QRCodePerson] ***");
		console.log(store.QRCodePerson);

		actions.activeOption(`/dashboard/person/generateqr/detail/${personId}`);
	}, []);

	return (
		<div className="container">
			<div className="container-fluid qr-main-class">
				<div className="row qr-title-main-class">
					<div className="col-md-9">
						<h4>Generar Código QR [{personDetail.full_name}]</h4>
					</div>
					<div className="col-md-3">
						<Tooltip title="Generar Código" aria-label="Generar Código">
							{/* <NavLink to={`/dashboard/person/medicine/detail/${personIdParam}/-1`}> */}
							<button className="mt-1 btn btn-success" onClick={event => handleGenerate()}>
								<i className="fas fa-plus"></i> Generar
							</button>
							{/* </NavLink> */}
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
			</div>
		</div>
	);
}
