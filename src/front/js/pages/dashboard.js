import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/dashboard.scss";

export default function Dashboard() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
			<div className="dashboard-class"></div>
		</div>
	);
}
