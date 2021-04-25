import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/recover.scss";

export default function Recover() {
	const { store, actions } = useContext(Context);

	return (
		<div className="row">
			<div className="container-fluid text-white ">
				<h1>Recuperar su contraseña</h1>
			</div>
			<div className=" col-md-4 col-sm-6" />
			<div className=" col-md-4 col-sm-6">
				<form>
					<div className="form-group">
						<label htmlFor="example1">Correo electrónico</label>
						<input type="text" id="example1" className="form-control form-control-lg" />
					</div>
					<div className="form-group">
						<label htmlFor="example2">Nombre</label>
						<input type="text" id="example2" className="form-control form-control-lg" />
					</div>
				</form>
			</div>
		</div>
	);
}
