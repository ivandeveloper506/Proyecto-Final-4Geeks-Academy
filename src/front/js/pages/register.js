import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/register.scss";

export default function Register() {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [firstSurname, setFirstSurname] = useState("");
	const [secondSurname, setSecondSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = e => {
		e.preventDefault();

		const userBody = {
			name: name,
			first_surname: firstSurname,
			second_surname: secondSurname,
			user_image: "",
			email: email,
			password: password,
			is_active: true
		};

		actions.register(userBody);
	};

	return (
		<div className="container-fluid container-register-main-class">
			<div className="row d-flex flex-row align-items-center justify-content-center">
				<div className="col" />
				<div className="col-5 register-main-class">
					<div className="row d-flex flex-row align-items-center justify-content-center mt-3">
						<h1 className="text-white">Registro nuevo usuario</h1>
					</div>
					<div>
						<form onSubmit={handleRegister}>
							<div className="m-3">
								<label className="form-label text-white">Nombre</label>
								<input
									type="name"
									className="form-control"
									id="inputName"
									placeholder="Ingrese su nombre..."
									required
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</div>
							<div className="m-3">
								<label className="form-label text-white">Primer Apellido</label>
								<input
									type="firstSurname"
									className="form-control"
									id="firstSurname"
									placeholder="Ingrese su primer apellido..."
									required
									value={firstSurname}
									onChange={e => setFirstSurname(e.target.value)}
								/>
							</div>
							<div className="m-3">
								<label className="form-label text-white">Segundo Apellido</label>
								<input
									type="secondSurname"
									className="form-control"
									id="secondSurname"
									placeholder="Ingrese su segundo apellido..."
									value={secondSurname}
									onChange={e => setSecondSurname(e.target.value)}
								/>
							</div>
							<div className="m-3">
								<label className="form-label text-white">Email</label>
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail"
									placeholder="Ingrese su Email..."
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
									placeholder="Ingrese su contraseña..."
									required
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<div className="m-3">
								<button type="submit" className="btn btn-danger btn-block">
									Registrar
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="col" />
			</div>
		</div>
	);
}
