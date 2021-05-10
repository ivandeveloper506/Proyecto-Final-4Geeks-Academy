import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/qrstyles.scss";

export default function PersonInfoQr() {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const personId = parseInt(params.personId);
	let personData = [];
	let personMedicine = [];

	useEffect(() => {
		actions.activePersonInfoQR(personId);
	}, []);

	if (store.PersonInfoQR.results != undefined) {
		console.log("*** PersonInfoQr [store.PersonInfoQR] ***");
		console.log(store.PersonInfoQR.results);
		personData = store.PersonInfoQR.results;
		personMedicine = store.PersonInfoQR.medicine;
	}

	return (
		<div className="container-fluid main-info-qr-class">
			<div className="row info-qr-title1-class">
				<div className="col mt-3">
					<h3>{personData != undefined ? personData["full_name"] : ""}</h3>
				</div>
			</div>

			<div className="info-qr-title2-class">
				<div className="row">
					<div className="col mt-3">
						<h4>En caso de emergencia</h4>
					</div>
				</div>
				<div className="row">
					<div className="col-4">
						<h6>Contactar a:</h6>
					</div>
					<div className="col-8">
						<h6>{personData != undefined ? personData["emergency_contact"] : ""}</h6>
					</div>
				</div>
				<div className="row">
					<div className="col-4">
						<h6>Teléfono:</h6>
					</div>
					<div className="col-8">
						<h6>{personData != undefined ? personData["emergency_phone"] : ""}</h6>
					</div>
				</div>
			</div>

			<hr />
			<div className="info-qr-title3-class">
				<div className="row">
					<div className="col">
						<h4>Medicamentos</h4>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col">
					{personMedicine.map((item, index) => {
						return (
							<div key={index}>
								<div className="info-qr-card-class">
									<div className="row">
										<div className="col-4">
											<p>Nombre:</p>
										</div>
										<div className="col-8">
											<p>{item.description}</p>
										</div>
									</div>
									<div className="row">
										<div className="col-4">
											<p>Frecuencia:</p>
										</div>
										<div className="col-8">
											<p>{item.frequency}</p>
										</div>
									</div>
									<div className="row">
										<div className="col-4">
											<p>Observaciones:</p>
										</div>
										<div className="col-8">
											<p>{item.observation}</p>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<hr />
			<div className="info-qr-title3-class">
				<div className="row">
					<div className="col">
						<p>
							<h4>Vacunación COVID-19</h4>
						</p>
					</div>
				</div>
			</div>
			<div className="info-qr-card-class">
				<div className="row">
					<div className="col-md-6">
						<div className="row">
							<div className="col-6">
								<p>Primera Dosis:</p>
							</div>
							<div className="col-6">
								<p>{personData != undefined ? personData["vaccine_covid1_date"] : ""}</p>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="row">
							<div className="col-6">
								<p>Segunda Dosis:</p>
							</div>
							<div className="col-6">
								<p>{personData != undefined ? personData["vaccine_covid2_date"] : ""}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
