import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/recover.scss";

export default function Recover() {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");

	const handleRecover = e => {
		e.preventDefault();

		const userBody = {
			email: email
		};
		actions.recoveryPass(userBody);
		alert("Ingreso a recuperar contraseña");
	};

	return (
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
										Digite el correo asociado a la cuenta para recibir su contraseña de recuperación
									</span>
								</h6>
							</div>
						</form>
					</div>
				</div>
				<div className="col" />
			</div>
		</div>
	);
}
