import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export default function PersonInfoQr() {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const personId = parseInt(params.personId);

	let personDetail = store.persons[personId];

	useEffect(() => {
		actions.activeOption(`/person/infoqr/${personId}`);
	}, []);

	return (
		<div className="container-fluid text-white">
			<h1 className="text-white">Información del Código QR de la Persona</h1>
		</div>
	);
}
