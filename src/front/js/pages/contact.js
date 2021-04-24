import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/contact.scss";

export default function Conctat() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-white">
			<h1>Contact Page</h1>
		</div>
	);
}
