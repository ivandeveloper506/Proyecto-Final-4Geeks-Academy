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
		closeOnClickOutside: false,
		showCancelButton: true,
		confirmButtonText: "Validar",
		cancelButtonText: "Cancelar",
		showLoaderOnConfirm: true,
		preConfirm: code => {
			if (code != passwordResetToken) {
				Swal.showValidationMessage(`¡El código ingresado es incorrecto!`);
			}

			return true;
		}
	}).then(result => {
		console.log("*** validando password result***");
		console.log(result);

		if (result.isConfirmed) {
			Swal.fire({
				title: `¡Código validado exitosamente!`
			});
		}

		if (result.isDismissed) {
			actions.userPasswordValidate(false);
			actions.userPasswordReset(false);
			actions.activeOption("/recover");
		} else {
			actions.userPasswordValidate(true);
			actions.userPasswordReset(false);
		}

		actions.activeOption("/recover");
	});
}
