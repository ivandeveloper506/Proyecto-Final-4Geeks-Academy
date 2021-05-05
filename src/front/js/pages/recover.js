import { ShowAlert } from "../component/alert";
import Swal from "sweetalert2";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/recover.scss";
import PasswordResetValidate from "../component/password-reset-validate";

export default function Recover() {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const inputEmailRef = useRef("");
	const inputPasswordRef = useRef("");

	const handleRecover = e => {
		e.preventDefault();

		const userBody = {
			email: email
		};

		actions.forgot(userBody);
	};

	const handlePasswordReset = e => {
		if (password != passwordConfirm) {
			Swal.fire({
				icon: "error",
				title: "Validando contraseña",
				text: "Las contraseñas no coinciden"
			});

			actions.activeOption("/recover");
		} else {
			const userBody = {
				email: store.userEmailPasswordReset,
				password: password
			};

			actions.passwordReset(userBody, store.passwordReset.token);
		}
	};

	useEffect(() => {
		if (store.userPasswordValidate) {
			inputPasswordRef.current.focus();
		} else {
			inputEmailRef.current.focus();
		}
	}, []);

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
								<form onSubmit={handlePasswordReset}>
									<div className="m-3">
										<label className="form-label text-white">Contraseña</label>
										<input
											ref={inputPasswordRef}
											type="password"
											className="form-control"
											id="inputPassword"
											placeholder="Ingrese la nueva contraseña..."
											required
											value={password}
											onChange={e => setPassword(e.target.value)}
										/>
									</div>
									<div className="m-3">
										<label className="form-label text-white">Confirmar contraseña</label>
										<input
											type="password"
											className="form-control"
											id="inputPasswordConfirm"
											placeholder="Confirme la nueva contraseña..."
											required
											value={passwordConfirm}
											onChange={e => setPasswordConfirm(e.target.value)}
										/>
									</div>
									<div className="m-3">
										<button type="submit" className="btn btn-danger btn-block">
											Actualizar contraseña
										</button>
									</div>
									{/* <div className="mt-3 row d-flex flex-row align-items-center justify-content-center">
								<h6>
									<span className="text-warning">
										Digite el correo asociado a la cuenta para recibir su contraseña de recuperación
									</span>
								</h6>
							</div> */}
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
								<form onSubmit={handleRecover}>
									<div className="m-3">
										<label className="form-label text-white">Email</label>
										<input
											ref={inputEmailRef}
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

		// <div className="container-fluid container-recover-main-class">
		// 	<div className="form-row d-flex flex-row align-items-center justify-content-center">
		// 		<div className="col" />
		// 		<div className="col-sm-9 col-md-6 recover-main-class">
		// 			<div className="row d-flex flex-row align-items-center justify-content-center mt-3">
		// 				<h2 className="text-white">Recuperar contraseña</h2>
		// 			</div>
		// 			<hr className="line-class" />
		// 			<div>
		// 				<form onSubmit={handleRecover}>
		// 					<div className="m-3">
		// 						<label className="form-label text-white">Email</label>
		// 						<input
		// 							ref={inputEmailRef}
		// 							type="email"
		// 							className="form-control"
		// 							id="exampleInputEmail1"
		// 							aria-describedby="emailHelp"
		// 							placeholder="Email"
		// 							required
		// 							value={email}
		// 							onChange={e => setEmail(e.target.value)}
		// 						/>
		// 					</div>
		// 					<div className="m-3">
		// 						<button type="submit" className="btn btn-danger btn-block">
		// 							Recuperar contraseña
		// 						</button>
		// 					</div>
		// 					<div className="mt-3 row d-flex flex-row align-items-center justify-content-center">
		// 						<h6>
		// 							<span className="text-warning">
		// 								Digite el correo asociado a la cuenta para recibir su contraseña de recuperación
		// 							</span>
		// 						</h6>
		// 					</div>
		// 				</form>
		// 			</div>
		// 		</div>
		// 		<div className="col" />
		// 	</div>
		// </div>
	);
}
