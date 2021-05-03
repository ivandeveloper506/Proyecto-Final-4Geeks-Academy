import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// export default function PersonDetail() {
// 	const params = useParams();
// 	const personId = parseInt(params.id);
// 	const { store, actions } = useContext(Context);

// 	console.log("*** PersonDetail ***");
// 	console.log(personId);
// 	console.log(store.persons);

// 	return (
// 		<div className="container">
// 			{store.persons.map((item, index) => {
// 				if (personId === index) {
// 					return <div className="text-white">{item.full_name}</div>;
// 				}
// 			})}
// 		</div>
// 	);
// }

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "300px",
			background: "white"
		}
	}
}));

export default function PersonDetail() {
	const classes = useStyles();

	return (
		<div className="container container-detail-class">
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					required="true"
					type="text"
					id="name"
					label="Nombre"
					variant="outlined"
					placeholder="Ingrese el nombre..."
				/>
				<TextField
					required="true"
					type="text"
					id="firstSurname"
					label="Primer apellido"
					variant="outlined"
					placeholder="Ingrese el primer apellido..."
				/>
				<TextField
					type="text"
					id="secondSurname"
					label="Segundo apellido"
					variant="outlined"
					placeholder="Ingrese el segundo apellido..."
				/>
			</form>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					required="true"
					type="text"
					id="knownAs"
					label="Conocido como"
					variant="outlined"
					placeholder="Ingrese el conocido como..."
				/>
				<TextField
					required="true"
					type="text"
					id="birthDate"
					label="Fecha nacimiento"
					variant="outlined"
					placeholder="Ingrese la fecha nacimiento..."
				/>
				<TextField
					type="text"
					id="telephoneNumber"
					label="Número de teléfono"
					variant="outlined"
					placeholder="Ingrese el número de teléfono..."
				/>
			</form>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					required="true"
					type="text"
					id="emergencyContact"
					label="Contacto de emergencia"
					variant="outlined"
					placeholder="Ingrese el nombre del contacto de emergencia..."
				/>
				<TextField
					required="true"
					type="text"
					id="emergencyPhone"
					label="Teléfono de emergencia"
					variant="outlined"
					placeholder="Ingrese el teléfono de emergencia..."
				/>
			</form>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					type="text"
					id="userImage"
					label="Foto"
					variant="outlined"
					placeholder="Ingrese la foto..."
				/>
			</form>
		</div>
	);
}
