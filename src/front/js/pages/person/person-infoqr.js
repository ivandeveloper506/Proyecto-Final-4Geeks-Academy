import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/qrstyles.scss";
import { format, compareAsc } from "date-fns";
// import { addYears, formatWithOptions } from "date-fns/fp";
import { es } from "date-fns/locale";
// import toUpper from "lodash/fp/toUpper";

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

	function getDateFormat(date, type) {
		let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

		if (type === "S") {
			return date.toLocaleDateString("es-ES");
		} else {
			return date.toLocaleDateString("es-ES", options);
		}
	}

	return (
		<div className="container-fluid main-info-qr-class">
			<div className="row info-qr-title1-class">
				<div className="col mt-3">
					<h3>{personData != undefined ? personData["full_name"] : ""}</h3>
					<h6>Conocido como (CC): {personData != undefined ? personData["known_as"] : ""}</h6>
				</div>
			</div>

			<div className="info-qr-title2-class mt-2">
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
			<div className="info-qr-title3-class mt-3">
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
			<div className="info-qr-title3-class mt-3">
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
							<div className="col-4">
								<p>1° Dosis:</p>
							</div>
							<div className="col-8">
								<p>
									{personData != undefined
										? getDateFormat(new Date(personData["vaccine1_date"]), "L")
										: ""}
								</p>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="row">
							<div className="col-4">
								<p>2° Dosis:</p>
							</div>
							<div className="col-8">
								<p>
									{personData != undefined
										? getDateFormat(new Date(personData["vaccine2_date"]), "L")
										: ""}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="row m-3">
				<div className="col d-flex justify-content-center">
					<NavLink className="text-primary" to="/home">
						<h4>Ir a Qr+Services</h4>
					</NavLink>
				</div>
			</div>
		</div>
	);
}
