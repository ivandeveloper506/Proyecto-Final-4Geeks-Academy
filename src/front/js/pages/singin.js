import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Singin = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="row">
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
					<div className="form-group">
						<label htmlFor="example3">Contraseña</label>
						<input type="text" id="example3" className="form-control form-control-lg" />
					</div>
					<div className="form-group">
						<label htmlFor="example3">Dirección</label>
						<input type="text" id="example4" className="form-control form-control-lg" />
					</div>
				</form>
			</div>
		</div>
	);
};
