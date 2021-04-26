import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/recover.scss";

export default function Recover() {
	const { store, actions } = useContext(Context);

	return (
		<div className="row">
			<div className="container-fluid text-white row-class">
				<h1 className="">Recuperar contraseña</h1>
				<p className="font-italic">
					Por favor ingrese el correo electrónico asociado a su
					<br></br>
					cuenta, seguidamente presione el botón recuperar contraseña
				</p>
			</div>
			<div className=" col-md-4 col-sm-6" />
			<div className=" col-md-4 col-sm-6">
				<form>
					<div className="container-fluid text-white">
						<label htmlFor="example1">Correo electrónico</label>
						<input type="text" id="example1" className="form-control form-control-lg" />
					</div>
					<div className="container-fluid text-white"></div>
					<div className="m-3">
						<button type="submit" className="btn btn-danger btn-block">
							Recuperar contraseña
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
