import { ShowAlert } from "../component/alert";

const baseURLApi = "https://3001-orange-tiglon-67udrlwi.ws-us04.gitpod.io/api/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userProfile: [],
			userLogged: false,
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

						// Se configura la opción del home
						getActions().activeOption("/dashboard");
					})
					.catch(error => {
						// alert("DANGER - Ha ocurrido un error y no se pudo iniciar sesión");
						// console.log(error);
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
							alert("DANGER - Ha ocurrido un error al tratar de recuperar los datos del usuario.");
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
						alert("DANGER - Ha ocurrido un error al tratar de recuperar los datos del usuario.");
					});
			},
			personStore: async personBody => {
				await fetch(`${baseURLApi}person`, {
					method: "POST",
					body: JSON.stringify(personBody),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						if (response.status === 201) {
							alert("SUCCESS - Persona registrada satisfactoriamente.");

							return response.json();
						} else {
							alert("DANGER[response] - Ha ocurrido un error al tratar crear la persona.");
						}
					})
					.catch(error => {
						alert("DANGER[error] - Ha ocurrido un error al tratar crear la persona.");
					});
			},
			activeOption: option => {
				setStore({ activeOption: option });
			},
			logout: () => {
				localStorage.setItem("x-access-token", null);

				setStore({ userLogged: false });

				// Se configura la opción del home
				getActions().activeOption("/home");

				ShowAlert("top-end", "success", "", "¡Sesión cerrada exitosamente!", false, true, 2000);
			},
			getAPIExterna: async userID => {
				await fetch("https://cima.aemps.es/cima/rest/psuministro", {
					method: "GET"
					// headers: {
					// 	"Content-Type": "application/json"
					// }
				})
					.then(response => {
						if (response.status === 200) {
							return response.json();
						} else {
							alert("Error con API Externa");
						}
					})
					.then(data => {
						// setStore({ persons: data });

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
