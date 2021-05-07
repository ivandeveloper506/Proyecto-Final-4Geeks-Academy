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

let personMedicineDetail = [];
let action = "";

export default function PersonMedicineDetail() {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const personMedicineId = parseInt(params.id);
	const personId = parseInt(params.personId);

	if (personMedicineId >= 0) {
		action = "edit";
	} else {
		action = "new";
	}

	const classes = useStyles();

	const [description, setDescription] = useState("");
	const [frequency, setFrequency] = useState("");
	const [observation, setObservation] = useState("");
	const inputDescriptionRef = useRef(null);

	const handleSave = e => {
		e.preventDefault();

		// Se manda a crear el medicamento
		const medicineBody = {
			description: description,
			frequency: frequency,
			observation: observation,
			person_id: 1, // TOTO: OJO DEBE IR EL ID DE LA PERSONA
			user_creation_id: store.userProfile.id
		};

		if (action === "edit") {
			actions.personUpdate(personBody, personDetail.id);
		} else {
			actions.personStore(personBody);
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
			<div>
				<Form className="mt-3" onSubmit={handleSave}>
					<div className="form-row title-mant-class head-mant-class">
						<Form.Group className="col-md-9">
							<h2>{action === "new" ? "Registrar Medicamento" : "Editar Medicamento"}</h2>
						</Form.Group>
						<Form.Group className="col-md-3">
							<Tooltip title="Guardar datos" aria-label="Guardar datos">
								<button type="submit" className="btn btn-success">
									<i className="fas fa-save"></i> Guardar
								</button>
							</Tooltip>

							<NavLink to={`/dashboard/person/medicine/${personMedicineId}`}>
								<Tooltip title="Regresar" aria-label="Regresar">
									<button className="btn btn-primary ml-3">
										<i className="fas fa-arrow-left"></i> Regresar
									</button>
								</Tooltip>
							</NavLink>
						</Form.Group>
					</div>

					<div className="form-row">
						<Form.Group className="col">
							<Form.Label>Descripción</Form.Label>
							<Form.Control
								className="bg-white"
								onChange={e => setDescription(e.target.value)}
								value={description}
								ref={inputDescriptionRef}
								required="true"
								type="text"
								id="description"
								label="Descripción"
								placeholder="Ingrese la descripción..."
							/>
						</Form.Group>
					</div>

					<div className="form-row">
						<Form.Group className="col">
							<Form.Label>Frecuencia</Form.Label>
							<Form.Control
								onChange={e => setFrequency(e.target.value)}
								value={frequency}
								required="true"
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
								required="true"
								type="text"
								id="observation"
								label="Observaciones"
								placeholder="Ingrese las observaciones..."
							/>
						</Form.Group>
					</div>
				</Form>
			</div>
		</div>
	);
}
