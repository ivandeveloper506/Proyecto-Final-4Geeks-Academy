const baseURLApi = "https://3001-aquamarine-cod-ic9447ij.ws-us03.gitpod.io/api/";

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

						console.log("*** actions [login] ***");
						console.log(data);
					})
					.catch(error => {
						alert("DANGER - Ha ocurrido un error y no se pudo iniciar sesión");
						console.log(error);
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
			logout: () => {
				setStore({ userLogged: false });
			}
		}
	};
};

export default getState;
