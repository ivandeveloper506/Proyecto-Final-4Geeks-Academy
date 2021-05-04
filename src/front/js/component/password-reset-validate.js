import Swal from "sweetalert2";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export default function PasswordResetValidate(passwordResetToken) {
	Swal.fire({
		title: "Ingrese el código de validación enviado al correo.",
		input: "text",
		inputAttributes: {
			autocapitalize: "off"
		},
		showCancelButton: true,
		confirmButtonText: "Validar",
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
				title: `¡El código fue validado correctamente!`
			});
		}
	});
}
