import Swal from "sweetalert2";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export default function PasswordResetValidate(store, actions) {
	let passwordResetToken = store.passwordReset.token;

	Swal.fire({
		title: "Ingrese código verificador enviado al correo",
		input: "text",
		inputAttributes: {
			autocapitalize: "off"
		},
		allowOutsideClick: false,
		allowEscapeKey: false,
		showCancelButton: true,
		confirmButtonText: "Validar",
		cancelButtonText: "Cancelar",
		showLoaderOnConfirm: true,
		preConfirm: code => {
			if (code != passwordResetToken) {
				Swal.showValidationMessage(`¡El código ingresado es incorrecto!`);
			}

			return true;
		},
		allowOutsideClick: () => !Swal.isLoading()
	}).then(result => {
		if (result.isConfirmed) {
			Swal.fire({
				title: `¡Código validado exitosamente!`
			});
		}

		actions.userPasswordValidate(true);
		actions.userPasswordReset(false);

		actions.activeOption("/recover");
	});
}
