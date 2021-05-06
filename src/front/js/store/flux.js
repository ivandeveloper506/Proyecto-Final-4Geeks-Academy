import { ShowAlert } from "../component/alert";
import Swal from "sweetalert2";

const baseURLApi = "https://3001-teal-herring-fc34stwp.ws-us04.gitpod.io/api/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userProfile: [],
			persons: [],
			passwordReset: [],
			userLogged: false,
			userPasswordReset: false,
			userPasswordValidate: false,
			userEmailPasswordReset: "",
			activeOption: ""
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
						getActions().activeOption("/dashboard/person");
					})
					.catch(error => {
						ShowAlert(
							"top-end",
							"error",
							"Oops...",
							"Ha ocurrido un error y no se pudo iniciar sesión.",
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
			handlePersonDelete: (personID, userID) => {
				Swal.fire({
					title: "¿Está seguro que desea eliminar el registro?",
					text: "Esta acción no se podrá revertir y se eliminara toda la información asociada a la persona.",
					icon: "warning",
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
			logout: () => {
				localStorage.setItem("x-access-token", null);

				setStore({ userLogged: false });

				// Se configura la opción del home
				getActions().activeOption("/home");

				ShowAlert("top-end", "success", "", "¡Sesión cerrada exitosamente!", false, true, 2000);
			}
		}
	};
};

export default getState;
