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
				<div className="col-5 login-main-class">
					<div className="row d-flex flex-row align-items-center justify-content-center mt-3">
						<h1 className="text-white">Iniciar sesión</h1>
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
											<span className="text-warning">¡Necesito recuperar mi contraseña!</span>
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
