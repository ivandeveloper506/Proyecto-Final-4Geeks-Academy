import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/services.scss";

export default function Services() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-white">
			<h1>Services Page</h1>
		</div>
	);
}
