import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Fab from "@material-ui/core/Fab";
import { green } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";

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
	const { store, actions } = useContext(Context);
	const params = useParams();
	const personId = parseInt(params.id);
	const classes = useStyles();

	const [name, setName] = useState("");
	const [firstSurname, setFirstSurname] = useState("");
	const [secondSurname, setSecondSurname] = useState("");
	const [knownAs, setKnownAs] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [telephoneNumber, setTelephoneNumber] = useState("");
	const [userImage, setUserImage] = useState("");
	const [emergencyContact, setEmergencyContact] = useState("");
	const [emergencyPhone, setEmergencyPhone] = useState("");
	const inputNameRef = useRef("");

	const handleSave = e => {
		// e.preventDefault();

		// Se manda a crear el usuario
		const personBody = {
			name: name,
			first_surname: firstSurname,
			second_surname: secondSurname,
			known_as: knownAs,
			birth_date: birthDate,
			telephone_number: telephoneNumber,
			user_image: userImage,
			emergency_contact: emergencyContact,
			emergency_phone: emergencyPhone,
			user_creation_id: store.userProfile.id
		};

		actions.personStore(personBody);
	};

	useEffect(() => {
		inputNameRef.current.focus();
	}, []);

	return (
		<div className="container container-detail-class">
			<div className="row">
				<div className="col-md-9">
					<h2>Registro y Mantenimiento de Personas</h2>
				</div>

				<div className="col-md-3">
					<Tooltip title="Guardar cambios" aria-label="Guardar cambios">
						<Button
							style={{
								background: "#28A745",
								color: "white"
							}}
							onClick={() => handleSave()}
							variant="contained"
							size="small"
							className={classes.button}
							startIcon={<SaveIcon />}>
							Salvar
						</Button>
					</Tooltip>

					<Tooltip title="Regresar" aria-label="Regresar">
						<NavLink to="/dashboard/person/">
							<Button
								style={{
									background: "#0D6EFD",
									color: "white"
								}}
								type="submit"
								variant="contained"
								size="small"
								className={classes.button}
								startIcon={<ArrowBackIcon />}>
								Regresar
							</Button>
						</NavLink>
					</Tooltip>
				</div>
			</div>

			<Divider />

			{store.persons.map((item, index) => {
				if (personId === index) {
					return (
						<div>
							<form className={classes.root} noValidate autoComplete="off">
								<TextField
									onChange={e => setName(e.target.value)}
									// value={item.name}
									ref={inputNameRef}
									required="true"
									type="text"
									id="name"
									label="Nombre"
									variant="outlined"
									placeholder="Ingrese el nombre..."
								/>
								<TextField
									onChange={e => setFirstSurname(e.target.value)}
									// value={item.first_surname}
									required="true"
									type="text"
									id="firstSurname"
									label="Primer apellido"
									variant="outlined"
									placeholder="Ingrese el primer apellido..."
								/>
								<TextField
									onChange={e => setSecondSurname(e.target.value)}
									// value={item.second_surname}
									type="text"
									id="secondSurname"
									label="Segundo apellido"
									variant="outlined"
									placeholder="Ingrese el segundo apellido..."
								/>
							</form>
							<form className={classes.root} noValidate autoComplete="off">
								<TextField
									onChange={e => setKnownAs(e.target.value)}
									// value={item.known_as}
									required="true"
									type="text"
									id="knownAs"
									label="Conocido como"
									variant="outlined"
									placeholder="Ingrese el conocido como..."
								/>
								<TextField
									onChange={e => setBirthDate(e.target.value)}
									// value={item.birth_date}
									required="true"
									type="date"
									id="birthDate"
									label="Fecha nacimiento"
									variant="outlined"
									placeholder="Ingrese la fecha nacimiento..."
								/>
								<TextField
									onChange={e => setTelephoneNumber(e.target.value)}
									// value={item.telephone_number}
									type="number"
									id="telephoneNumber"
									label="Número de teléfono"
									variant="outlined"
									placeholder="Ingrese el número de teléfono..."
								/>
							</form>
							<form className={classes.root} noValidate autoComplete="off">
								<TextField
									onChange={e => setEmergencyContact(e.target.value)}
									// value={item.emergency_contact}
									required="true"
									type="text"
									id="emergencyContact"
									label="Contacto de emergencia"
									variant="outlined"
									placeholder="Ingrese el nombre del contacto de emergencia..."
								/>
								<TextField
									onChange={e => setEmergencyPhone(e.target.value)}
									// value={item.emergency_phone}
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
									onChange={e => setUserImage(e.target.value)}
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
			})}
		</div>
	);
}
