import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/contact.scss";

export default function Recover() {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");

	const [name, setName] = useState("");

	const [phone, setPhone] = useState("");

	const [message, setMessage] = useState("");

	const handleRecover = e => {
		e.preventDefault();

		const messageBody = {
			name: name,
			email: email,
			phone: phone,
			message: message
		};
		actions.registrarMensaje(messageBody);
		alert("Ingreso a registrar mensaje");
	};

	return (
		<div className="container-fluid container-contact-main-class">
			<div className="form-row d-flex flex-row align-items-center justify-content-center">
				<div className="col" />
				<div className="col-sm-9 col-md-6 contact-main-class">
					<div className="row d-flex flex-row align-items-center justify-content-center mt-3">
						<h2 className="text-white">Contáctenos</h2>
						<i className="fa fa-envelope fa-3x fa-fw"></i>
					</div>
					<hr className="line-class" />
					<div>
						<form onSubmit={handleRecover}>
							<div className="m-3">
								<label className="form-label text-white">Nombre</label>
								<input
									type="text"
									className="form-control"
									id="exampleInputname1"
									aria-describedby="nameHelp"
									placeholder="nombre"
									required
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</div>
							<div className="m-3">
								<label className="form-label text-white">Email</label>
								<input
									type="text"
									className="form-control"
									id="exampleInputemail1"
									aria-describedby="emailHelp"
									placeholder="email"
									required
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div className="m-3">
								<label className="form-label text-white">Teléfono</label>
								<input
									type="text"
									className="form-control"
									id="exampleInputphone1"
									aria-describedby="phoneHelp"
									placeholder="Teléfono"
									required
									value={phone}
									onChange={e => setPhone(e.target.value)}
								/>
							</div>
							<div className="m-3">
								<label className="form-label text-white">Mensaje</label>
								<textarea
									className="form-control"
									id="exampleInputphone1"
									aria-describedby="phoneHelp"
									placeholder="Mensaje"
									required
									value={message}
									onChange={e => setMessage(e.target.value)}
									rows="3"
								/>
							</div>
							<div className="m-3">
								<button type="submit" className="btn btn-primary btn-block">
									Enviar mensaje
								</button>
							</div>
							<div className="m-3 row d-flex flex-row align-items-center justify-content-center text-white">
								<h6>
									<span>
										Su opinión es importante para nosotros. Por favor llene la información
										solicitada y nos pondremos encontacto con usted a la mayor brevedad.
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
