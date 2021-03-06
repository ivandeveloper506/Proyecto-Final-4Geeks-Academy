import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/register.scss";
import { useForm } from "react-hook-form";

export default function Register() {
	const { store, actions } = useContext(Context);

	const {
		register,
		getValues,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: "onChange"
	});

	const onSubmit = data => {
		// Se manda a crear el usuario
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
								<label className="form-label text-white">N??mero de tel??fono</label>
								<input
									type="number"
									className="form-control"
									id="telephoneNumber"
									placeholder="Ingrese su n??mero de tel??fono..."
									{...register("telephoneNumber", {
										required: "El n??mero de tel??fono es requerido."
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
									placeholder="Ingrese su email..."
									{...register("email", {
										required: "El email es requerido.",
										pattern: {
											value: /^[a-zA-Z0-9.!#$%&???*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
											message: "La direcci??n de email es inv??lida."
										}
									})}
								/>
								{errors.email && <p className="required-class1">{errors.email.message}</p>}
							</div>
							<div className="m-3">
								<label className="form-label text-white">Contrase??a</label>
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="Ingrese su contrase??a..."
									{...register("password", {
										required: "La contrase??a es requerida."
									})}
								/>
								{errors.password && <p className="required-class1">{errors.password.message}</p>}
							</div>
							<div className="m-3">
								<label className="form-label text-white">Confirmar contrase??a</label>
								<input
									type="password"
									className="form-control"
									id="passwordConfirmation"
									placeholder="Confirme su contrase??a..."
									{...register("passwordConfirmation", {
										required: "La confirmaci??n de la contrase??a es requerida.",
										validate: {
											matchesPreviousPassword: value => {
												const { password } = getValues();
												return password === value || "Las contrase??as no coinciden.";
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
