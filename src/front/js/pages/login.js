import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="w-100" style={{ display: "flex", justifyContent: "center" }}>
			<form>
				<h3>Ingreso al sistema</h3>

				<div className="form-group">
					<label>Correo</label>
					<input type="email" className="form-control" placeholder="Enter email" />
				</div>

				<div className="form-group">
					<label>Contraseña</label>
					<input type="password" className="form-control" placeholder="Enter password" />
				</div>

				<button type="submit" className="btn btn-primary btn-block">
					Ingresar
				</button>
			</form>
		</div>
	);
};
