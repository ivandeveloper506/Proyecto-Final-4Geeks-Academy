import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/login.scss";
import { useForm } from "react-hook-form";

export default function Login() {
	const { store, actions } = useContext(Context);

	const {
		register,
		getValues,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: "onChange"
	});

	const handleLogin = data => {
		actions.login(data.email, data.password);
	};

	useEffect(() => {
		actions.userPasswordReset(false);
		actions.userPasswordValidate(false);

		actions.activeOption("/login");
	}, []);

	return (
		<div className="container-fluid container-login-main-class">
			<div className="form-row d-flex flex-row align-items-center justify-content-center">
				<div className="col" />
				<div className="col-sm-9 col-md-6 login-main-class">
					<div className="row d-flex flex-row align-items-center justify-content-center mt-3">
						<h2 className="text-white">Iniciar sesión</h2>
					</div>
					<hr className="line-class" />
					<div>
						<form onSubmit={handleSubmit(handleLogin)}>
							<div className="m-3">
								<label className="form-label text-white">Email</label>
								<input
									type="email"
									className="form-control"
									id="email"
									placeholder="Ingrese su email..."
									{...register("email", {
										required: "El email es requerido.",
										pattern: {
											value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
											message: "La dirección de email es inválida."
										}
									})}
								/>
								{errors.email && <p className="required-class1">{errors.email.message}</p>}
							</div>
							<div className="m-3">
								<label className="form-label text-white">Contraseña</label>
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="Ingrese su contraseña..."
									{...register("password", {
										required: "La contraseña es requerida."
									})}
								/>
								{errors.password && <p className="required-class1">{errors.password.message}</p>}
							</div>
							<div className="m-3">
								<button type="submit" className="btn btn-danger btn-block">
									Ingresar
								</button>
							</div>
							<div className="m-3 form-check">
								<div className="row">
									<div className="col-6 d-flex justify-content-start">
										<h6>
											<Link to="/recover">
												<h6>
													<span className="text-warning">¿Olvidó su contraseña?</span>
												</h6>
											</Link>
										</h6>
									</div>

									<div className="col-6 d-flex justify-content-end">
										<Link to="/register">
											<h6>
												<span className="text-warning">¿No tienes cuenta aún?</span>
											</h6>
										</Link>
									</div>
								</div>

								<div className="mt-3 row d-flex flex-row align-items-center justify-content-center"></div>
							</div>
						</form>
					</div>
				</div>
				<div className="col" />
			</div>
		</div>
	);
}
