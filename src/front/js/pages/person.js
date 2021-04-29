import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/recover.scss";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function Person() {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row dashboard-main-table-class">
				<div className="col">
					<Table striped bordered hover size="sm" className="mt-3 bg-white">
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Primer apellido</th>
								<th>Segundo Apellido</th>
								<th>Correo electrónico</th>
								<th width="110">Acciones</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Iván</td>
								<td>Fonseca</td>
								<td>Castro</td>
								<td>ivan@email.com</td>
								<td colSpan="2">
									<Button variant="btn btn-warning" className="ml-2">
										<i className="fas fa-pen" />
									</Button>
									<Button variant="btn btn-danger" className="ml-2">
										<i className="far fa-trash-alt" />
									</Button>
								</td>
							</tr>
							<tr>
								<td>Lilliana</td>
								<td>Boza</td>
								<td></td>
								<td>lilliana@email.com</td>
								<td colSpan="2">
									<Button variant="btn btn-warning" className="ml-2">
										<i className="fas fa-pen" />
									</Button>
									<Button variant="btn btn-danger" className="ml-2">
										<i className="far fa-trash-alt" />
									</Button>
								</td>
							</tr>
							<tr>
								<td>Jairo</td>
								<td>Santamaría</td>
								<td></td>
								<td>jairo@email.com</td>
								<td colSpan="2">
									<Button variant="btn btn-warning" className="ml-2">
										<i className="fas fa-pen" />
									</Button>
									<Button variant="btn btn-danger" className="ml-2">
										<i className="far fa-trash-alt" />
									</Button>
								</td>
							</tr>
							<tr>
								<td>Carlos</td>
								<td>Benavides Benavides</td>
								<td></td>
								<td>carlos@email.com</td>
								<td colSpan="2">
									<Button variant="btn btn-warning" className="ml-2">
										<i className="fas fa-pen" />
									</Button>
									<Button variant="btn btn-danger" className="ml-2">
										<i className="far fa-trash-alt" />
									</Button>
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		</div>
	);
}
