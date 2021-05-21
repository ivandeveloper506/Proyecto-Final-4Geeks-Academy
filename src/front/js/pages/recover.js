import { ShowAlert } from "../component/alert";
import Swal from "sweetalert2";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/recover.scss";
import PasswordResetValidate from "../component/password-reset-validate";
import { useForm } from "react-hook-form";

export default function Recover() {
	const { store, actions } = useContext(Context);

	const {
		register,
		getValues,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: "onChange"
	});

	const handleRecover = data => {
		const userBody = {
			email: data.email
		};

		actions.forgot(userBody);
	};

	const handlePasswordReset = data => {
		const userBody = {
			email: store.userEmailPasswordReset,
			password: data.password
		};

		actions.passwordReset(userBody, store.passwordReset.token);
	};

	// useEffect(() => {
	// 	if (store.userPasswordValidate) {
	// 		inputPasswordRef.current.focus();
	// 	} else {
	// 		inputEmailRef.current.focus();
	// 	}
	// }, []);

	useEffect(() => {
		if (store.userPasswordReset) {
			PasswordResetValidate(store, actions);
		}
	});

	return (
		<div>
			{store.userPasswordValidate ? (
				<div className="container-fluid container-recover-main-class">
					<div className="form-row d-flex flex-row align-items-center justify-content-center">
						<div className="col" />
						<div className="col-sm-9 col-md-6 recover-main-class1">
							<div className="row d-flex flex-row align-items-center justify-content-center mt-3">
								<h2 className="text-white">Recuperar contraseña</h2>
							</div>
							<hr className="line-class" />
							<div>
								<form onSubmit={handleSubmit(handlePasswordReset)}>
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
										{errors.password && (
											<p className="required-class1">{errors.password.message}</p>
										)}
									</div>
									<div className="m-3">
										<label className="form-label text-white">Confirmar contraseña</label>
										<input
											type="password"
											className="form-control"
											id="passwordConfirmation"
											placeholder="Confirme su contraseña..."
											{...register("passwordConfirmation", {
												required: "La confirmación de la contraseña es requerida.",
												validate: {
													matchesPreviousPassword: value => {
														const { password } = getValues();
														return password === value || "Las contraseñas no coinciden.";
													}
												}
											})}
										/>
										{errors.passwordConfirmation && (
											<p className="required-class1">{errors.passwordConfirmation.message}</p>
										)}
									</div>
									<div className="m-3">
										<button type="submit" className="btn btn-danger btn-block">
											Actualizar contraseña
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className="col" />
					</div>
				</div>
			) : (
				<div className="container-fluid container-recover-main-class">
					<div className="form-row d-flex flex-row align-items-center justify-content-center">
						<div className="col" />
						<div className="col-sm-9 col-md-6 recover-main-class">
							<div className="row d-flex flex-row align-items-center justify-content-center mt-3">
								<h2 className="text-white">Recuperar contraseña</h2>
							</div>
							<hr className="line-class" />
							<div>
								<form onSubmit={handleSubmit(handleRecover)}>
									<div className="m-3">
										<label className="form-label text-white">Email</label>
										<input
											type="email"
											className="form-control"
											id="email"
											placeholder="Ingrese su Email..."
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
										<button type="submit" className="btn btn-danger btn-block">
											Recuperar contraseña
										</button>
									</div>
									<div className="mt-3 row d-flex flex-row align-items-center justify-content-center">
										<h6>
											<span className="text-warning">
												Digite el correo asociado a la cuenta para recibir su contraseña de
												recuperación
											</span>
										</h6>
									</div>
								</form>
							</div>
						</div>
						<div className="col" />
					</div>
				</div>
			)}
		</div>
	);
}
