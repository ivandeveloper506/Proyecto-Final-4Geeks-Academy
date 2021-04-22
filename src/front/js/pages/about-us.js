import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.scss";

export default function AboutUs() {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<h1>AboutUs</h1>
		</div>
	);
}
