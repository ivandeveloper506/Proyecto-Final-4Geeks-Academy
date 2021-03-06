import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/contact.scss";
import imgContact from "../../img/img-contact.png";

export default function Recover() {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");
	const inputNameRef = useRef(null);

	const handleMessage = e => {
		e.preventDefault();

		const messageBody = {
			name: name,
			email: email,
			phone: phone,
			message: message
		};
	};

	useEffect(() => {
		inputNameRef.current.focus();
	}, []);

	return (
		<div className="container-fluid main-div-class">
			<div className="container">
				<div className="row mt-3">
					<div className="col-md-7">
						<div className="contact-main-class">
							<div className="row d-flex flex-row align-items-center justify-content-center mt-3">
								<h2 className="mt-3 text-white">Formulario de Contacto</h2>
								<div className="ml-3 mr-3 row d-flex flex-row align-items-center justify-content-center text-white">
									<h6>
										<span>Su opinión es importante para nosotros.</span>
									</h6>
									<h6>
										<span>
											Complete el formulario y nos pondremos en contacto a la mayor brevedad.
										</span>
									</h6>
								</div>
							</div>
							<hr className="line-class" />
							<div>
								<form onSubmit={handleMessage}>
									<div className="m-3">
										<label className="form-label text-white">Nombre y apellidos</label>
										<input
											ref={inputNameRef}
											type="text"
											className="form-control"
											id="exampleInputname1"
											aria-describedby="nameHelp"
											placeholder="Ingrese su nombre y apellidos..."
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
											placeholder="Ingrese su email..."
											required
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>
									</div>
									<div className="m-3">
										<label className="form-label text-white">Teléfono</label>
										<input
											type="number"
											className="form-control"
											id="exampleInputphone1"
											aria-describedby="phoneHelp"
											placeholder="Ingrese su teléfono..."
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
											placeholder="Ingrese su mensaje..."
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
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-5 text-white">
						<div className="img-card-contact-class">
							<img src={imgContact} alt="Image Services 2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
