<<<<<<< HEAD
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="w-100 login-class">
			<div className=" col-md-4 col-sm-6">
				<form>
					<h3>Ingreso al sistema</h3>

					<div className="form-group">
						<label>Correo</label>
						<input type="email" className="form-control" placeholder="Correo Electrónico" />
					</div>

					<div className="form-group">
						<label>Contraseña</label>
						<input type="password" className="form-control" placeholder="Contraseña" />
					</div>

					<button type="submit" className="btn btn-primary btn-block">
						Ingresar
					</button>
				</form>
			</div>
		</div>
	);
};
=======
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/login.scss";

export default function Login() {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = e => {
		e.preventDefault();

		actions.login(email, password);
	};

	return (
		<div className="container-fluid container-login-main-class">
			<div className="row d-flex flex-row align-items-center justify-content-center">
				<div className="col" />
				<div className="col-md-6 login-main-class">
					<div className="row d-flex flex-row align-items-center justify-content-center mt-3">
						<h2 className="text-white">Iniciar sesión</h2>
					</div>
					<div>
						<form onSubmit={handleLogin}>
							<div className="m-3">
								<label className="form-label text-white">Email</label>
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Email"
									required
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div className="m-3">
								<label className="form-label text-white">Contraseña</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword1"
									placeholder="Contraseña"
									required
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<div className="m-3">
								<button type="submit" className="btn btn-danger btn-block">
									Ingresar
								</button>
							</div>
							<div className="m-3 form-check">
								<div className="row">
									<div className="col-6">
										<input type="checkbox" className="form-check-input" id="exampleCheck1" />
										<h6>
											<label className="form-check-label text-white">Recuérdame</label>
										</h6>
									</div>

									<div className="col-6">
										<Link to="/register">
											<h6>
												<span className="text-warning">¿No tienes cuenta aún?</span>
											</h6>
										</Link>
									</div>
								</div>

								<div className="mt-3 row d-flex flex-row align-items-center justify-content-center">
									<Link to="/recover">
										<h6>
											<span className="text-warning">¡Deseo recuperar mi contraseña!</span>
										</h6>
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="col" />
			</div>
		</div>
	);
}
>>>>>>> b5eb5ecfd162b459b871a35c50cfc1840d9a5b1c
