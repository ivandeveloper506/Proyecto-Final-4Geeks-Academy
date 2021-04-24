import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/about-us.scss";

export default function AboutUs() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-white">
			<h1>About Us Page</h1>
		</div>
	);
}
