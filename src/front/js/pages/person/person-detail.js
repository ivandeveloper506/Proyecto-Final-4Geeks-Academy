// import React, { useContext, useState, useRef, useEffect } from "react";
// import { Link, NavLink, useParams } from "react-router-dom";
// import { Context } from "../../store/appContext";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import SaveIcon from "@material-ui/icons/Save";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import Fab from "@material-ui/core/Fab";
// import { green } from "@material-ui/core/colors";
// import Tooltip from "@material-ui/core/Tooltip";
// import Divider from "@material-ui/core/Divider";
// import { Form } from "react-bootstrap";

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		"& > *": {
// 			margin: theme.spacing(1),
// 			width: "300px",
// 			background: "white"
// 		}
// 	}
// }));

// let personDetail = [];
// let action = "";

// export default function PersonDetail() {
// 	const { store, actions } = useContext(Context);
// 	const params = useParams();
// 	const personId = parseInt(params.personId);

// 	if (personId >= 0) {
// 		action = "edit";
// 	} else {
// 		action = "new";
// 	}

// 	const classes = useStyles();

// 	const [name, setName] = useState("");
// 	const [firstSurname, setFirstSurname] = useState("");
// 	const [secondSurname, setSecondSurname] = useState("");
// 	const [knownAs, setKnownAs] = useState("");
// 	const [birthDate, setBirthDate] = useState("");
// 	const [telephoneNumber, setTelephoneNumber] = useState("");
// 	const [userImage, setUserImage] = useState("");
// 	const [emergencyContact, setEmergencyContact] = useState("");
// 	const [emergencyPhone, setEmergencyPhone] = useState("");
// 	const [vaccine1Date, setVaccine1Date] = useState(null);
// 	const [vaccine2Date, setVaccine2Date] = useState(null);
// 	const inputNameRef = useRef("");

// 	const handleSave = e => {
// 		e.preventDefault();

// 		console.log("*** handleSave [person] ***");
// 		console.log(vaccine1Date);
// 		console.log(vaccine2Date);

// 		// Se manda a crear el usuario
// 		const personBody = {
// 			name: name,
// 			first_surname: firstSurname,
// 			second_surname: secondSurname,
// 			known_as: knownAs,
// 			birth_date: birthDate,
// 			telephone_number: telephoneNumber,
// 			user_image: userImage,
// 			emergency_contact: emergencyContact,
// 			emergency_phone: emergencyPhone,
// 			user_creation_id: store.userProfile.id,
// 			vaccine1_date: vaccine1Date,
// 			vaccine2_date: vaccine2Date
// 		};

// 		if (action === "edit") {
// 			actions.personUpdate(personBody, personDetail.id);
// 		} else {
// 			actions.personStore(personBody);
// 		}
// 	};

// 	const getPerson = () => {
// 		setName("");
// 		setFirstSurname("");
// 		setSecondSurname("");
// 		setKnownAs("");
// 		setBirthDate("");
// 		setTelephoneNumber("");
// 		setEmergencyContact("");
// 		setUserImage("");
// 		setVaccine1Date(null);
// 		setVaccine2Date(null);

// 		if (action === "edit") {
// 			{
// 				personDetail = store.persons[personId];
// 			}

// 			if (personDetail !== "undefined" && personDetail !== null) {
// 				setName(personDetail.name);
// 				setFirstSurname(personDetail.first_surname);
// 				setSecondSurname(personDetail.second_surname);
// 				setKnownAs(personDetail.known_as);
// 				setBirthDate(personDetail.birth_date);
// 				setTelephoneNumber(personDetail.telephone_number);
// 				setEmergencyContact(personDetail.emergency_contact);
// 				setUserImage(personDetail.user_image);
// 				setVaccine1Date(personDetail.vaccine1_date);
// 				setVaccine2Date(personDetail.vaccine2_date);
// 			}
// 		}
// 	};

// 	useEffect(() => {
// 		getPerson();
// 		inputNameRef.current.focus();
// 	}, []);

// 	return (
// 		<div className="container container-detail-class body-mant-class">
// 			<div>
// 				<Form.Group className="col-md-9 mt-3">
// 					<h2>{action === "new" ? "Registrar Persona" : "Editar Persona"}</h2>
// 				</Form.Group>
// 				<Form className="mt-3" onSubmit={handleSave}>
// 					<div className="form-row title-mant-class head-mant-class">
// 						{/* <Form.Group className="col-md-9">
// 							<h2>{action === "new" ? "Registrar Persona" : "Editar Persona"}</h2>
// 						</Form.Group> */}
// 						<Form.Group className="col-md-3">
// 							<Tooltip title="Guardar datos" aria-label="Guardar datos">
// 								<button type="submit" className="btn btn-success">
// 									<i className="fas fa-save"></i> Guardar
// 								</button>
// 							</Tooltip>

// 							<NavLink to="/dashboard/person/">
// 								<Tooltip title="Regresar" aria-label="Regresar">
// 									<button className="btn btn-primary ml-3">
// 										<i className="fas fa-arrow-left"></i> Regresar
// 									</button>
// 								</Tooltip>
// 							</NavLink>
// 						</Form.Group>
// 					</div>

// 					<div className="form-row">
// 						<Form.Group className="col-md-4">
// 							<Form.Label>
// 								<span className="text-danger">
// 									<strong>*</strong>
// 								</span>{" "}
// 								Nombre
// 							</Form.Label>
// 							<Form.Control
// 								className="bg-white"
// 								onChange={e => setName(e.target.value)}
// 								value={name}
// 								ref={inputNameRef}
// 								required="true"
// 								type="text"
// 								id="name"
// 								label="Nombre"
// 								placeholder="Ingrese el nombre..."
// 							/>
// 						</Form.Group>
// 						<Form.Group className="col-md-4">
// 							<Form.Label>
// 								<span className="text-danger">
// 									<strong>*</strong>
// 								</span>{" "}
// 								Primer apellido
// 							</Form.Label>
// 							<Form.Control
// 								onChange={e => setFirstSurname(e.target.value)}
// 								value={firstSurname}
// 								required="true"
// 								type="text"
// 								id="firstSurname"
// 								label="Primer apellido"
// 								placeholder="Ingrese el primer apellido..."
// 							/>
// 						</Form.Group>
// 						<Form.Group className="col-md-4">
// 							<Form.Label>Segundo apellido</Form.Label>
// 							<Form.Control
// 								onChange={e => setSecondSurname(e.target.value)}
// 								value={secondSurname}
// 								type="text"
// 								id="secondSurname"
// 								label="Segundo apellido"
// 								placeholder="Ingrese el segundo apellido..."
// 							/>
// 						</Form.Group>
// 					</div>

// 					<div className="form-row">
// 						<Form.Group className="col-md-4">
// 							<Form.Label>Conocido como (cc)</Form.Label>
// 							<Form.Control
// 								onChange={e => setKnownAs(e.target.value)}
// 								value={knownAs}
// 								type="text"
// 								id="knownAs"
// 								label="Conocido como"
// 								placeholder="Ingrese el conocido como..."
// 							/>
// 						</Form.Group>
// 						<Form.Group className="col-md-4">
// 							<Form.Label>
// 								<span className="text-danger">
// 									<strong>*</strong>
// 								</span>{" "}
// 								Fecha nacimiento
// 							</Form.Label>
// 							<Form.Control
// 								onChange={e => setBirthDate(e.target.value)}
// 								value={birthDate}
// 								required="true"
// 								type="date"
// 								id="birthDate"
// 								label="Fecha nacimiento"
// 								placeholder="Ingrese la fecha nacimiento..."
// 							/>
// 						</Form.Group>
// 						<Form.Group className="col-md-4">
// 							<Form.Label>Número de teléfono</Form.Label>
// 							<Form.Control
// 								onChange={e => setTelephoneNumber(e.target.value)}
// 								value={telephoneNumber}
// 								type="number"
// 								id="telephoneNumber"
// 								label="Número de teléfono"
// 								placeholder="Ingrese el número de teléfono..."
// 							/>
// 						</Form.Group>
// 					</div>

// 					<div className="form-row">
// 						<Form.Group className="col-md-8">
// 							<Form.Label>Contacto de emergencia</Form.Label>
// 							<Form.Control
// 								onChange={e => setEmergencyContact(e.target.value)}
// 								value={emergencyContact}
// 								type="text"
// 								id="emergencyContact"
// 								label="Contacto de emergencia"
// 								placeholder="Ingrese el nombre del contacto en caso de emergencia..."
// 							/>
// 						</Form.Group>
// 						<Form.Group className="col-md-4">
// 							<Form.Label>Teléfono de emergencia</Form.Label>
// 							<Form.Control
// 								onChange={e => setEmergencyPhone(e.target.value)}
// 								value={emergencyPhone}
// 								type="number"
// 								id="emergencyPhone"
// 								label="Teléfono de emergencia"
// 								placeholder="Ingrese el teléfono de emergencia..."
// 							/>
// 						</Form.Group>
// 					</div>

// 					<div className="form-row">
// 						<Form.Group className="col-md-6">
// 							<Form.Label>COVID-19 1° Dosis</Form.Label>
// 							<Form.Control
// 								onChange={e => setVaccine1Date(e.target.value)}
// 								value={vaccine1Date}
// 								type="date"
// 								id="vaccine1Date"
// 								label="COVID-19 1° Dosis"
// 							/>
// 						</Form.Group>
// 						<Form.Group className="col-md-6">
// 							<Form.Label>COVID-19 2° Dosis</Form.Label>
// 							<Form.Control
// 								onChange={e => setVaccine2Date(e.target.value)}
// 								value={vaccine2Date}
// 								type="date"
// 								id="vaccine2Date"
// 								label="COVID-19 2° Dosis"
// 							/>
// 						</Form.Group>
// 					</div>
// 				</Form>
// 			</div>
// 		</div>
// 	);
// }

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Form } from "react-bootstrap";

import PersonDetailHandle from "./person-detail-handle";

const useStyles = makeStyles(theme => ({
	appBar: {
		position: "relative"
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Crear Persona
						</Typography>
						<Button autoFocus color="inherit" onClick={handleClose}>
							Guardar
						</Button>
					</Toolbar>
				</AppBar>
				<Form.Group className="col-md-4">
					<Form.Label>
						<span className="text-danger">
							<strong>*</strong>
						</span>{" "}
						Primer apellido
					</Form.Label>
					<Form.Control
						// onChange={e => setFirstSurname(e.target.value)}
						// value={firstSurname}
						required="true"
						type="text"
						id="firstSurname"
						label="Primer apellido"
						placeholder="Ingrese el primer apellido..."
					/>
				</Form.Group>
			</Dialog>
		</div>
	);
}
