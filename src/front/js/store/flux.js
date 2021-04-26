const baseURLApi = "https://3001-lavender-falcon-4o5qoovp.ws-us03.gitpod.io/api/";

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

							alert("SUCCESS - Se logró iniciar sesión.");

							return response.json();
						} else {
							alert("DANGER - Ha ocurrido un error y no se pudo iniciar sesión");
						}
					})
					.then(data => {
						localStorage.setItem("x-access-token", data.token);

						// Se obtienen los datos del usuario conectado.
						getActions().getProfileUser(data.user_id);

						// Se configura la opción del home
						getActions().activeOption("/dashboard");

						console.log("*** actions [login] ***");
						console.log(data);
					})
					.catch(error => {
						alert("DANGER - Ha ocurrido un error y no se pudo iniciar sesión");
						console.log(error);
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
							alert("SUCCESS - Usuario registrado satisfactoriamente.");

							// Se manda a crear la persona con los mismos datos del usuario que se registra
							// Siempre será la primera persona en el panel admin del usuario que se registra.
							// const personBody = {
							// 	name: name,
							// 	first_surname: firstSurname,
							// 	second_surname: secondSurname,
							// 	known_as: null,
							// 	telephone_number: null,
							// 	emergency_contact: null,
							// 	emergency_phone: null,
							// 	user_creation_id: userProfile.id
							// };

							// actions.personStore(personBody);

							// Se logró registrar correctamente, se llama inmediatamente a que se loguee de una vez
							getActions().login(userBody.email, userBody.password);

							return response.json();
						} else {
							alert("DANGER[response] - Ha ocurrido un error al tratar crear el usuario.");
						}
					})
					.catch(error => {
						alert("DANGER[error] - Ha ocurrido un error al tratar crear el usuario.");
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

						console.log("*** actions [getProfileUser] ***");
						console.log(data);
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
				setStore({ userLogged: false });
			}
		}
	};
};

export default getState;
