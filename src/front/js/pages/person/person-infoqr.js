import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";

export default function PersonInfoQr() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-white">
			<h1>Información del Código QR de la Persona</h1>
		</div>
	);
}
