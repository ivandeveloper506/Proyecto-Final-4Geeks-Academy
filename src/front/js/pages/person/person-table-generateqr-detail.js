import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import { Link, NavLink, useHistory } from "react-router-dom";
import "../../../styles/qrstyles.scss";
import Tooltip from "@material-ui/core/Tooltip";

export default function PersonGenerateQr() {
	const { store, actions } = useContext(Context);

	const handleGenerate = index => {
		// let personDelete = store.persons[index];

		alert("Entro a generar el código QR");

		// actions.generateQR(personDelete.id, store.userProfile.id);
	};

	return (
		<div className="container">
			<div className="container-fluid qr-main-class">
				<div className="row qr-title-main-class">
					<div className="col-md-9">
						<h4>Generar Código QR []</h4>
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
