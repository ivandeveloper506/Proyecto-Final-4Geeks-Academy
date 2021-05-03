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
				{/* <TextField id="standard-basic" label="Nombre" placeholder="Ingrese el nombre..." /> */}
				<TextField type="text" id="name" label="Nombre" variant="outlined" placeholder="Ingrese el nombre..." />
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
		</div>
	);
}
