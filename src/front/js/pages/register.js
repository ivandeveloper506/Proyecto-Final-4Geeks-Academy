import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/register.scss";
import { useForm } from "react-hook-form";

export default function Register() {
	const { store, actions } = useContext(Context);
	// const [name, setName] = useState("");
	// const [firstSurname, setFirstSurname] = useState("");
	// const [secondSurname, setSecondSurname] = useState("");
	// const [birthDate, setBirthDate] = useState("");
	// const [telephoneNumber, setTelephoneNumber] = useState("");
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const inputNameRef = useRef("");

	// const handleRegister = e => {
	// 	e.preventDefault();

	// 	// Se manda a crear el usuario
	// 	const userBody = {
	// 		name: name,
	// 		first_surname: firstSurname,
	// 		second_surname: secondSurname,
	// 		birth_date: birthDate,
	// 		telephone_number: telephoneNumber,
	// 		user_image: "",
	// 		email: email,
	// 		password: password,
	// 		active: true
	// 	};

	// 	actions.register(userBody);
	// };

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: "onChange"
	});

	const onSubmit = data => {
		// 	// Se manda a crear el usuario
		const userBody = {
			name: data.name,
			first_surname: data.firstSurname,
			second_surname: data.secondSurname,
			birth_date: data.birthDate,
			telephone_number: data.telephoneNumber,
			user_image: "",
			email: data.email,
			password: data.password,
			active: true
		};

		actions.register(userBody);
	};

	// useEffect(() => {
	// 	inputNameRef.current.focus();
	// }, []);

	return (
		<div className="container-fluid container-register-main-class">
			<div className="row d-flex flex-row align-items-center justify-content-center">
				<div className="col" />
				<div className="col-sm-9 col-md-6 register-main-class">
					<div className="row d-flex flex-row align-items-center justify-content-center mt-3">
						<h2 className="text-white">Crear cuenta</h2>
					</div>
					<hr className="line-class" />
					<div>
						{/* <form onSubmit={handleRegister}> */}
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="m-3">
								<label className="form-label text-white">Nombre</label>
								<input
									type="text"
									className="form-control"
									id="name"
									placeholder="Ingrese su nombre..."
									{...register("name", {
										required: "El nombre es requerido."
									})}
								/>
								{errors.name && <p className="required-class1">{errors.name.message}</p>}
							</div>
							<div className="m-3">
								<label className="form-label text-white">Primer apellido</label>
								<input
									type="text"
									className="form-control"
									id="firstSurname"
									placeholder="Ingrese su primer apellido..."
									{...register("firstSurname", {
										required: "El primer apellido es requerido."
									})}
								/>
								{errors.firstSurname && (
									<p className="required-class1">{errors.firstSurname.message}</p>
								)}
							</div>
							<div className="m-3">
								<label className="form-label text-white">Segundo apellido</label>
								<input
									type="text"
									className="form-control"
									id="secondSurname"
									placeholder="Ingrese su segundo apellido..."
									{...register("secondSurname")}
								/>
							</div>
							<div className="m-3">
								<label className="form-label text-white">Fecha de nacimiento</label>
								<input
									type="date"
									className="form-control"
									id="birthDate"
									{...register("birthDate", {
										required: "El fecha de nacimiento es requerida."
									})}
								/>
								{errors.birthDate && <p className="required-class1">{errors.birthDate.message}</p>}
							</div>
							<div className="m-3">
								<label className="form-label text-white">Número de teléfono</label>
								<input
									type="number"
									className="form-control"
									id="telephoneNumber"
									placeholder="Ingrese su número de teléfono..."
									{...register("telephoneNumber", {
										required: "El número de teléfono es requerido."
									})}
								/>
								{errors.telephoneNumber && (
									<p className="required-class1">{errors.telephoneNumber.message}</p>
								)}
							</div>
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
