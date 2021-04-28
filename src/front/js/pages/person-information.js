import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/recover.scss";

export default function PersonInformation() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-white">
			<h1>Person Information Page</h1>
		</div>
	);
}
