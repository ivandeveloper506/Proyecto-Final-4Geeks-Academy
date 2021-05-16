import { ShowAlert } from "../component/alert";
import Swal from "sweetalert2";

const baseURLApi = "https://3001-teal-roundworm-x0tnn5gs.ws-us04.gitpod.io/api/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			URLCodeQR: "https://3000-teal-roundworm-x0tnn5gs.ws-us04.gitpod.io/person/infoqr/",
			QRCodePerson: [],
			PersonInfoQR: [],
			infoAPIExterna: [],
			message: null,
			userProfile: [],
			persons: [],
			personMedicine: [],
			personVaccine: [],
			passwordReset: [],
			userLogged: false,
			userPasswordReset: false,
			userPasswordValidate: false,
			userEmailPasswordReset: "",
			activeOption: "",
			infoQRActive: false
		},
		actions: {
			login: async (email, password) => {
				const body = {
					email: email,
					password: password
				};

				await fetch(`${baseURLApi}users/login`, {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						if (response.status === 200) {
							setStore({ userLogged: true });

							return response.json();
						} else {
							// alert("DANGER - Ha ocurrido un error y no se pudo iniciar sesión");
							// alert(error);
						}
					})
					.then(data => {
						localStorage.setItem("x-access-token", data.token);

						// Se obtienen los datos del usuario conectado.
						getActions().getProfileUser(data.user_id);

						// Se configuran el false las variables de recuperación de contraseña
						getActions().userPasswordReset(false);
						getActions().userPasswordValidate(false);

						// Se configura la opción del home
						// getActions().activeOption("/dashboard/person");
						getActions().activeOption("/dashboard");
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ha ocurrido un error y no se pudo iniciar sesión. El email o la contraseña no son válidos.",
							false,
							true,
							2000
						);
					});
			},
			register: async userBody => {
				await fetch(`${baseURLApi}users/register`, {
					method: "POST",
					body: JSON.stringify(userBody),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						if (response.status === 201) {
							ShowAlert(
								"top-end",
								"success",
								userBody.full_name,
								"Su cuenta fue creada exitosamente!",
								false,
								true,
								2000
							);

							// Se logró registrar correctamente, se llama inmediatamente a que se loguee de una vez
							getActions().login(userBody.email, userBody.password);

							return response.json();
						} else {
							alert("DANGER[response] - Ha ocurrido un error al tratar crear el usuario.");
						}
					})
					.catch(error => {
						// alert("DANGER[error] - Ha ocurrido un error al tratar crear el usuario.");
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ha ocurrido un error al tratar de crear la cuenta.",
							false,
							true,
							2000
						);
					});
			},
			forgot: async userBody => {
				await fetch(`${baseURLApi}users/forgot`, {
					method: "POST",
					body: JSON.stringify(userBody),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						if (response.status === 200) {
							// ShowAlert(
							// 	"top-end",
							// 	"success",
							// 	userBody.full_name,
							// 	"Su cuenta fue creada exitosamente!",
							// 	false,
							// 	true,
							// 	2000
							// );

							return response.json();
						}
					})
					.then(data => {
						setStore({ passwordReset: data.results });

						getActions().userPasswordReset(true);

						// Se actualiza el correo electronico usado para recuperar la contraseña
						// ya que se utilizara para actualizar el mismo
						getActions().userEmailPasswordReset(userBody.email);

						getActions().activeOption("/recover");

						console.log("*** forgot password ***");
						console.log(data.results);
					})
					.catch(error => {
						alert("DANGER[error] - Ha ocurrido un error al tratar de recuperar la contraseña.");

						// ShowAlert(
						// 	"top-end",
						// 	"error",
						// 	"Oops...",
						// 	"Ha ocurrido un error al tratar de crear la cuenta.",
						// 	false,
						// 	true,
						// 	2000
						// );
					});
			},
			passwordReset: async (userBody, passwordResetToken) => {
				await fetch(`${baseURLApi}users/password-reset/${"passwordResetToken"}`, {
					method: "PUT",
					body: JSON.stringify(userBody),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						if (response.status === 200) {
							ShowAlert("top-end", "success", "", "¡Contraseña actualizada!", false, true, 2000);

							return response.json();
						} else {
							ShowAlert("top-end", "error", "Oops...", "Error actualizando contraseña", true, true, 2000);
						}
					})
					.catch(error => {
						ShowAlert("top-end", "error", "Oops...", "Error actualizando contraseña", true, true, 2000);
					});
			},
			getProfileUser: async userID => {
				await fetch(`${baseURLApi}users/${userID}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 200) {
							return response.json();
						} else {
							ShowAlert(
								"top-end",
								"error",
								"Oops...",
								"Ha ocurrido un error al tratar de recuperar los datos del perfil del usuario.",
								false,
								true,
								2000
							);
						}
					})
					.then(data => {
						setStore({ userProfile: data });

						ShowAlert(
							"top-end",
							"success",
							data.full_name,
							"¡Sesión iniciada exitosamente!",
							false,
							true,
							2000
						);
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ha ocurrido un error al tratar de recuperar los datos del perfil del usuario.",
							false,
							true,
							2000
						);
					});
			},
			getPerson: async userID => {
				// await fetch(`${baseURLApi}person/users/${userID}`, {
				await fetch(`${baseURLApi}person`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 200) {
							return response.json();
						} else {
							ShowAlert(
								"top-end",
								"error",
								"Oops...",
								"Ha ocurrido un error al tratar de recuperar los datos de las personas.",
								false,
								true,
								2000
							);
						}
					})
					.then(data => {
						setStore({ persons: data });

						//Se actualiza la variable que controla las actualizaciones de las personas.
						setStore({ retrievePerson: false });
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ha ocurrido un error al tratar de recuperar los datos de las personas.",
							false,
							true,
							2000
						);
					});
			},
			getPersonMedicine: async personBody => {
				await fetch(`${baseURLApi}person_medicine/person`, {
					method: "POST",
					body: JSON.stringify(personBody),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 200) {
							return response.json();
						}
					})
					.then(data => {
						console.log("*** getPersonMedicine [then(data] ***");
						console.log(data);

						setStore({ personMedicine: data });
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ha ocurrido un error al tratar de recuperar los datos de los medicamentos de las personas.",
							false,
							true,
							2000
						);
					});
			},
			personStore: async personBody => {
				await fetch(`${baseURLApi}person`, {
					method: "POST",
					body: JSON.stringify(personBody),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 201) {
							ShowAlert(
								"top-end",
								"success",
								"",
								"¡La persona ha sido registrada exitosamente!",
								false,
								true,
								2000
							);

							return response.json();
						} else {
							ShowAlert(
								"top-end",
								"error",
								"Oops...",
								"Ha ocurrido un error al tratar de crear la persona.",
								true,
								true,
								2000
							);
						}
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ha ocurrido un error al tratar de crear la persona.",
							true,
							true,
							2000
						);
					});
			},
			personUpdate: async (personBody, personID) => {
				await fetch(`${baseURLApi}person/${personID}`, {
					method: "PUT",
					body: JSON.stringify(personBody),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 200) {
							ShowAlert(
								"top-end",
								"success",
								"",
								"¡Los datos de la persona han sido actualizados exitosamente!",
								false,
								true,
								2000
							);

							return response.json();
						} else {
							ShowAlert(
								"top-end",
								"error",
								"Oops...",
								"Ha ocurrido un error al tratar de guardar los datos de la persona.",
								true,
								true,
								2000
							);
						}
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ha ocurrido un error al tratar de guardar los datos de la persona.",
							true,
							true,
							2000
						);
					});
			},
			personMedicineStore: async personMedicineBody => {
				await fetch(`${baseURLApi}person_medicine`, {
					method: "POST",
					body: JSON.stringify(personMedicineBody),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 201) {
							ShowAlert(
								"top-end",
								"success",
								"",
								"¡El medicamento de la persona ha sido registrado exitosamente!",
								false,
								true,
								2000
							);

							return response.json();
						} else {
							ShowAlert(
								"top-end",
								"error",
								"Oops...",
								"Ha ocurrido un error al tratar de crear el medicamento de la persona.",
								true,
								true,
								2000
							);
						}
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ha ocurrido un error al tratar de crear el medicamento de la persona.",
							true,
							true,
							2000
						);
					});
			},
			personMedicineUpdate: async (personMedicineBody, personMedicineID) => {
				await fetch(`${baseURLApi}person_medicine/${personMedicineID}`, {
					method: "PUT",
					body: JSON.stringify(personMedicineBody),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 200) {
							ShowAlert(
								"top-end",
								"success",
								"",
								"¡Los datos del medicamento de la persona han sido actualizados exitosamente!",
								false,
								true,
								2000
							);

							return response.json();
						} else {
							ShowAlert(
								"top-end",
								"error",
								"Oops...",
								"Ha ocurrido un error al tratar de guardar los datos del medicamento de la persona.",
								true,
								true,
								2000
							);
						}
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ha ocurrido un error al tratar de guardar los datos del medicamento de la persona.",
							true,
							true,
							2000
						);
					});
			},
			handlePersonDelete: (personID, userID) => {
				Swal.fire({
					title: "¿Está seguro que desea eliminar el registro?",
					text: "Esta acción no se podrá revertir y se eliminara toda la información asociada a la persona.",
					icon: "warning",
					allowOutsideClick: false,
					allowEscapeKey: false,
					closeOnClickOutside: false,
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "¡Si, eliminarlo!",
					cancelButtonText: "Cancelar"
				}).then(result => {
					if (result.isConfirmed) {
						// Si la respuesta es positiva se invoca la función que procesa el delete.
						getActions().personDelete(personID, userID);
					}
				});
			},
			personDelete: async (personID, userID) => {
				await fetch(`${baseURLApi}person/${personID}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 200) {
							Swal.fire("Eliminado!", "La persona ha sido eliminada exitosamente.", "success");

							// Se obtienen los datos de las personas asociadas al usuario.
							getActions().getPerson(userID);

							getActions().activeOption("/dashboard/person");

							return response.json();
						} else {
							Swal.fire("Error!", "Ha ocurrido un error al tratar de eliminar la persona.", "error");
						}
					})
					.catch(error => {
						Swal.fire("Error!", "Ha ocurrido un error al tratar de eliminar la persona.", "error");
					});
			},
			handlePersonMedicineDelete: (personBody, personMedicineID, personIndex) => {
				Swal.fire({
					title: "¿Está seguro que desea eliminar el registro?",
					text: "Esta acción no se podrá revertir y se eliminara el medicamento asociado a la persona.",
					icon: "warning",
					showCancelButton: true,
					allowOutsideClick: false,
					allowEscapeKey: false,
					closeOnClickOutside: false,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "¡Si, eliminarlo!",
					cancelButtonText: "Cancelar"
				}).then(result => {
					if (result.isConfirmed) {
						// Si la respuesta es positiva se invoca la función que procesa el delete.
						getActions().personMedicineDelete(personBody, personMedicineID, personIndex);
					}
				});
			},
			personMedicineDelete: async (personBody, personMedicineID, personIndex) => {
				await fetch(`${baseURLApi}person_medicine/${personMedicineID}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 200) {
							Swal.fire(
								"Eliminado!",
								"El medicamento de la persona ha sido eliminado exitosamente.",
								"success"
							);

							// Se obtienen los datos de los medicamentos de las personas asociadas al usuario.
							getActions().getPersonMedicine(personBody);

							getActions().activeOption(`/dashboard/person/medicine/${personIndex}`);

							return response.json();
						} else {
							Swal.fire(
								"Error!",
								"Ha ocurrido un error al tratar de eliminar el medicamento de la persona.",
								"error"
							);
						}
					})
					.catch(error => {
						Swal.fire(
							"Error!",
							"Ha ocurrido un error al tratar de eliminar el medicamento de la persona.",
							"error"
						);
					});
			},
			getQRCodePerson: async personQRBody => {
				await fetch(`${baseURLApi}person/qr`, {
					method: "POST",
					body: JSON.stringify(personQRBody),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 200) {
							return response.json();
						} else {
							ShowAlert(
								"top-end",
								"error",
								"",
								"¡Ocurrio un error al tratar de obtener el Código QR de la persona",
								false,
								true,
								2000
							);
						}
					})
					.then(data => {
						setStore({ QRCodePerson: data });
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"",
							"¡Ocurrio un error al tratar de obtener el Código QR de la persona",
							false,
							true,
							2000
						);
					});
			},
			getPersonInfoQR: async personId => {
				await fetch(`${baseURLApi}person/infoqr/${personId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						if (response.status === 200) {
							return response.json();
						}
					})
					.then(data => {
						setStore({ PersonInfoQR: data });
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ocurrido un error al tratar de recuperar la información del Código QR de la persona.",
							false,
							true,
							2000
						);
					});
			},
			generateQR: async personQRBody => {
				await fetch(`${baseURLApi}personqr`, {
					method: "POST",
					body: JSON.stringify(personQRBody),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("x-access-token")}`
					}
				})
					.then(response => {
						if (response.status === 201) {
							ShowAlert(
								"top-end",
								"success",
								"",
								"¡El Código QR fue generado exitosamente!",
								false,
								true,
								2000
							);

							return response.json();
						} else {
							ShowAlert(
								"top-end",
								"error",
								"",
								"¡Ocurrio un error al tratar de generar el Código QR.",
								false,
								true,
								2000
							);
						}
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"",
							"¡Ocurrio un error al tratar de generar el Código QR.",
							false,
							true,
							2000
						);
					});
			},
			activePersonInfoQR: personId => {
				getActions().infoQRActive(true);
				getActions().activeOption(`/person/infoqr/${personId}`);
				getActions().getPersonInfoQR(personId);
			},
			activeOption: option => {
				setStore({ activeOption: option });
			},
			userPasswordReset: option => {
				setStore({ userPasswordReset: option });
			},
			userPasswordValidate: option => {
				setStore({ userPasswordValidate: option });
			},
			userEmailPasswordReset: email => {
				setStore({ userEmailPasswordReset: email });
			},
			infoQRActive: active => {
				setStore({ infoQRActive: active });
			},
			logout: () => {
				localStorage.setItem("x-access-token", null);

				setStore({ userLogged: false });

				ShowAlert("top-end", "success", "", "¡Sesión cerrada exitosamente!", false, true, 2000);

				// Se configura la opción del home
				getActions().activeOption("/home");
			},
			getAPIExterna: async userID => {
				await fetch("https://cima.aemps.es/cima/rest/psuministro", {
					method: "GET"
				})
					.then(response => {
						if (response.status === 200) {
							return response.json();
						} else {
							alert("Error con API Externa");
						}
					})
					.then(data => {
						setStore({ infoAPIExterna: data.resultados });

						console.log("*** getAPIExterna ***");
						console.log(data.resultados);
					})
					.catch(error => {
						alert("Error con API Externa");
					});
			}
		}
	};
};

export default getState;
