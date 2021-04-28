import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/recover.scss";

export default function Person() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
			<div className="row dashboard-main-title-class">
				<div className="col">Titulo</div>
			</div>

			<div className="row">
				<div className="col">
					<div className="dashboard-main-class">
						<div className="row">
							<div className="col-md-4 person-left-class">col 1</div>
							{/* <div className="col-md-9 bg-primary">col 2</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
