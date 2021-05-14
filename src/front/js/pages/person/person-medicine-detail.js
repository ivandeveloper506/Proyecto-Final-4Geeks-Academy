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
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "300px",
			background: "white"
		}
	}
}));

let personMedicineDetail = [];
let action = "";

export default function PersonMedicineDetail() {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const personIdParam = parseInt(params.personId);
	const personMedicineId = parseInt(params.id);

	const personId = store.persons[personIdParam].id;

	if (personMedicineId >= 0) {
		action = "edit";
	} else {
		action = "new";
	}

	if (personMedicineId === -1) {
		action = "new";
	} else {
		action = "edit";
	}

	const classes = useStyles();

	const [description, setDescription] = useState("");
	const [frequency, setFrequency] = useState("");
	const [observation, setObservation] = useState("");
	const inputDescriptionRef = useRef(null);

	const handleSave = e => {
		e.preventDefault();

		// Se manda a crear el medicamento
		const personMedicineBody = {
			description: description,
			frequency: frequency,
			observation: observation,
			person_id: personId,
			user_creation_id: store.userProfile.id
		};

		if (action === "edit") {
			actions.personMedicineUpdate(personMedicineBody, personMedicineDetail.id);
		} else {
			actions.personMedicineStore(personMedicineBody);

			setDescription("");
			setFrequency("");
			setObservation("");

			inputDescriptionRef.current.focus();
		}
	};

	const getPersonMedicine = () => {
		setDescription("");
		setFrequency("");
		setObservation("");

		if (action === "edit") {
			{
				personMedicineDetail = store.personMedicine[personMedicineId];
			}

			if (personMedicineDetail !== "undefined" && personMedicineDetail !== null) {
				setDescription(personMedicineDetail.description);
				setFrequency(personMedicineDetail.frequency);
				setObservation(personMedicineDetail.observation);
			}
		}
	};

	useEffect(() => {
		getPersonMedicine();
		inputDescriptionRef.current.focus();
	}, []);

	return (
		<div className="container container-detail-class body-mant-class">
			<h2 className="mt-2">{action === "new" ? "Registrar Medicamento" : "Editar Medicamento"}</h2>
			<div>
				<Form className="mt-3" onSubmit={handleSave}>
					<div className="form-row title-mant-class head-mant-class">
						<Form.Group className="col-md-3">
							<Tooltip title="Guardar datos" aria-label="Guardar datos">
								<button type="submit" className="btn btn-success">
									<i className="fas fa-save"></i> Guardar
								</button>
							</Tooltip>

							<NavLink to={`/dashboard/person/medicine/${personIdParam}`}>
								<Tooltip title="Regresar" aria-label="Regresar">
									<button className="btn btn-primary ml-3">
										<i className="fas fa-arrow-left"></i> Regresar
									</button>
								</Tooltip>
							</NavLink>
						</Form.Group>
					</div>
					<div className="form-row">
						<Form.Group className="col-12">
							<Form.Label>
								<span className="text-danger">
									<strong>*</strong>
								</span>{" "}
								Descripción
							</Form.Label>
							<div>
								<Autocomplete
									freeSolo
									onChange={e => setDescription(e.target.value)}
									value={description}
									ref={inputDescriptionRef}
									required
									id="description"
									// placeholder="Ingrese el medicamento o seleccionelo de la lista..."
									options={store.infoAPIExterna.map(option => option.nombre)}
									renderInput={params => (
										<TextField
											{...params}
											// label="Ingrese el medicamento o seleccionelo de la lista..."
											placeholder="Ingrese el medicamento o seleccionelo de la lista..."
											margin="normal"
											variant="outlined"
										/>
									)}
								/>
							</div>
							{/* <InputSearchMedicine /> */}
						</Form.Group>
					</div>

					<div className="form-row">
						<Form.Group className="col">
							<Form.Label>
								<span className="text-danger">
									<strong>*</strong>
								</span>{" "}
								Frecuencia
							</Form.Label>
							<Form.Control
								onChange={e => setFrequency(e.target.value)}
								value={frequency}
								required
								type="text"
								id="frequency"
								label="Frecuencia"
								placeholder="Ingrese la frecuencia..."
							/>
						</Form.Group>
					</div>

					<div className="form-row">
						<Form.Group className="col">
							<Form.Label>Observaciones</Form.Label>
							<Form.Control
								onChange={e => setObservation(e.target.value)}
								value={observation}
								type="text"
								id="observation"
								label="Observaciones"
								placeholder="Ingrese las observaciones..."
								rows="3"
							/>
						</Form.Group>
					</div>
				</Form>
			</div>
		</div>
	);
}
