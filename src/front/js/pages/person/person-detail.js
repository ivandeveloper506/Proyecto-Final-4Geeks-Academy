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
import { Form } from "react-bootstrap";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "300px",
			background: "white"
		}
	}
}));

let personDetail = [];
let action = "";

export default function PersonDetail() {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const personId = parseInt(params.id);

	if (personId >= 0) {
		action = "edit";
	} else {
		action = "new";
	}

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
		e.preventDefault();

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

		if (action === "edit") {
			actions.personUpdate(personBody, personDetail.id);
		} else {
			actions.personStore(personBody);
		}
	};

	const getPerson = () => {
		setName("");
		setFirstSurname("");
		setSecondSurname("");
		setKnownAs("");
		setBirthDate("");
		setTelephoneNumber("");
		setEmergencyContact("");
		setUserImage("");

		if (action === "edit") {
			{
				personDetail = store.persons[personId];
			}

			if (personDetail !== "undefined" && personDetail !== null) {
				setName(personDetail.name);
				setFirstSurname(personDetail.first_surname);
				setSecondSurname(personDetail.second_surname);
				setKnownAs(personDetail.known_as);
				setBirthDate(personDetail.birth_date);
				setTelephoneNumber(personDetail.telephone_number);
				setEmergencyContact(personDetail.emergency_contact);
				setUserImage(personDetail.user_image);
			}
		}
	};

	useEffect(() => {
		getPerson();
	}, []);

	return (
		<div className="container container-detail-class body-mant-class">
			<div>
				<Form className="mt-3" onSubmit={handleSave}>
					<div className="form-row title-mant-class head-mant-class">
						<Form.Group className="col-md-9">
							<h2>{action === "new" ? "Registrar Persona" : "Editar Persona"}</h2>
						</Form.Group>
						<Form.Group className="col-md-3">
							<Tooltip title="Guardar datos" aria-label="Guardar datos">
								<button type="submit" className="btn btn-success">
									<i className="fas fa-save"></i> Guardar
								</button>
							</Tooltip>

							<NavLink to="/dashboard/person/">
								<Tooltip title="Regresar" aria-label="Regresar">
									<button className="btn btn-primary ml-3">
										<i className="fas fa-arrow-left"></i> Regresar
									</button>
								</Tooltip>
							</NavLink>
						</Form.Group>
					</div>

					<div className="form-row">
						<Form.Group className="col-md-4">
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								className="bg-white"
								onChange={e => setName(e.target.value)}
								value={name}
								// ref={inputNameRef}
								required="true"
								type="text"
								id="name"
								label="Nombre"
								placeholder="Ingrese el nombre..."
							/>
						</Form.Group>
						<Form.Group className="col-md-4">
							<Form.Label>Primer apellido</Form.Label>
							<Form.Control
								onChange={e => setFirstSurname(e.target.value)}
								value={firstSurname}
								required="true"
								type="text"
								id="firstSurname"
								label="Primer apellido"
								placeholder="Ingrese el primer apellido..."
							/>
						</Form.Group>
						<Form.Group className="col-md-4">
							<Form.Label>Segundo apellido</Form.Label>
							<Form.Control
								onChange={e => setSecondSurname(e.target.value)}
								value={secondSurname}
								type="text"
								id="secondSurname"
								label="Segundo apellido"
								placeholder="Ingrese el segundo apellido..."
							/>
						</Form.Group>
					</div>

					<div className="form-row">
						<Form.Group className="col-md-4">
							<Form.Label>Conocido como (cc)</Form.Label>
							<Form.Control
								onChange={e => setKnownAs(e.target.value)}
								value={knownAs}
								required="true"
								type="text"
								id="knownAs"
								label="Conocido como"
								placeholder="Ingrese el conocido como..."
							/>
						</Form.Group>
						<Form.Group className="col-md-4">
							<Form.Label>Fecha nacimiento</Form.Label>
							<Form.Control
								onChange={e => setBirthDate(e.target.value)}
								value={birthDate}
								required="true"
								type="date"
								id="birthDate"
								label="Fecha nacimiento"
								placeholder="Ingrese la fecha nacimiento..."
							/>
						</Form.Group>
						<Form.Group className="col-md-4">
							<Form.Label>Número de teléfono</Form.Label>
							<Form.Control
								onChange={e => setTelephoneNumber(e.target.value)}
								value={telephoneNumber}
								type="number"
								id="telephoneNumber"
								label="Número de teléfono"
								placeholder="Ingrese el número de teléfono..."
							/>
						</Form.Group>
					</div>

					<div className="form-row">
						<Form.Group className="col-md-8">
							<Form.Label>Contacto de emergencia</Form.Label>
							<Form.Control
								onChange={e => setEmergencyContact(e.target.value)}
								value={emergencyContact}
								required="true"
								type="text"
								id="emergencyContact"
								label="Contacto de emergencia"
								placeholder="Ingrese el nombre del contacto en caso de emergencia..."
							/>
						</Form.Group>
						<Form.Group className="col-md-4">
							<Form.Label>Teléfono de emergencia</Form.Label>
							<Form.Control
								onChange={e => setEmergencyPhone(e.target.value)}
								value={emergencyPhone}
								required="true"
								type="number"
								id="emergencyPhone"
								label="Teléfono de emergencia"
								placeholder="Ingrese el teléfono de emergencia..."
							/>
						</Form.Group>
					</div>
				</Form>
			</div>
		</div>
	);
}
