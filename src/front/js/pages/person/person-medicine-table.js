import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import SearchBar from "material-ui-search-bar";
import Divider from "@material-ui/core/Divider";
import { Form } from "react-bootstrap";

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

const headCells = [
	{
		id: "description",
		numeric: false,
		disablePadding: false,
		label: "Descripción"
	},
	{ id: "frequency", numeric: false, disablePadding: false, label: "Frecuencia" },
	{ id: "observation", numeric: false, disablePadding: false, label: "Observaciones" },
	{ id: "actions", numeric: false, disablePadding: false, label: "Acciones" }
];

function EnhancedTableHead(props) {
	const { classes, order, orderBy, onRequestSort } = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<TableHead className="head-table-class">
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
						className="cell-table-class"
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "default"}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
	personId: PropTypes.personId
};

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 600
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1
	}
}));

export default function EnhancedTable() {
	const params = useParams();
	const personIdParam = parseInt(params.id);
	const { store, actions } = useContext(Context);
	const [searchPerson, setSearchPerson] = useState("");
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(true);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const inputSearchRef = useRef(null);

	const personId = store.persons[personIdParam].id;

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleDelete = index => {
		let personMedicineDelete = store.personMedicine[index];

		actions.handlePersonMedicineDelete(personMedicineDelete.id, personIdParam);
	};

	const retrievePersonMedicine = () => {
		// Se obtienen los datos de los medicamentos de las persona asociada argumento persona.
		// const personId = store.persons[personIdParam].id;

		// actions.getPersonMedicine(personId);

		console.log("*** retrievePersonMedicine - [store.personMedicine] ***");
		console.log(store.personMedicine);
		console.log(personId);

		store.personMedicine.filter(item => {
			console.log(item);
			console.log(item.person_id);
			console.log(personId);

			item.person_id === personId;
		});
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = event => {
		setDense(event.target.checked);
	};

	const isSelected = name => selected.indexOf(name) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, store.personMedicine.length - page * rowsPerPage);

	useEffect(() => {
		retrievePersonMedicine();
		inputSearchRef.current.focus();
	});

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<div className="row container-fluid">
					<h2 className="col title-table-class">Listado de Medicamentos</h2>
				</div>
				<div className="row container-fluid search-people-class">
					<div className="col-md-8">
						<SearchBar
							ref={inputSearchRef}
							// onChange={event => {
							// 	setSearchPerson(event.target.value);
							// }}
							type="text"
							className="search-bar-class"
							placeholder="Buscar medicamento..."
							aria-label="Buscar medicamento"
							name="SearchMedicine"
							id="SearchMedicine"
						/>
					</div>

					<div className="col-md-4">
						<Tooltip title="Crear Medicamento" aria-label="Crear Medicamento">
							<NavLink to={`/dashboard/person/medicine/detail/`}>
								<button className="mt-1 btn btn-success">
									<i className="fas fa-plus"></i> Crear medicamento
								</button>
							</NavLink>
						</Tooltip>
						<Tooltip title="Regresar" aria-label="Regresar">
							<NavLink to="/dashboard/person">
								<button className="btn btn-primary ml-3">
									<i className="fas fa-arrow-left"></i> Regresar
								</button>
							</NavLink>
						</Tooltip>

						{/* <Form.Group className="col-md-4">
						<Tooltip title="Crear Medicamento" aria-label="Crear Medicamento">
							<NavLink to={`/dashboard/person/detail/medicine/`}>
								<button className="mt-1 btn btn-success">
									<i className="fas fa-plus"></i> Crear medicamento
								</button>
							</NavLink>
						</Tooltip>

						<Tooltip title="Regresar" aria-label="Regresar">
							<NavLink to="/dashboard/person">
								<button className="btn btn-primary ml-3">
									<i className="fas fa-arrow-left"></i> Regresar
								</button>
							</NavLink>
						</Tooltip>
					</Form.Group> */}
					</div>
				</div>

				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={dense ? "small" : "medium"}
						aria-label="enhanced table">
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={store.personMedicine.length}
						/>
						<TableBody className="body-table-class">
							{stableSort(store.personMedicine, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.name);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow hover tabIndex={-1} key={index}>
											<TableCell component="th" id={labelId} scope="row" padding="20">
												{row.description}
											</TableCell>
											<TableCell align="right">{row.frequency}</TableCell>
											<TableCell align="right">{row.observation}</TableCell>
											<TableCell>
												<Tooltip title="Editar medicamento">
													<NavLink
														to={`/dashboard/person/medicine/detail/${index}/${personId}`}>
														<IconButton
															className="text-warning"
															aria-label="Editar medicamento">
															<i className="fas fa-pen"></i>
														</IconButton>
													</NavLink>
												</Tooltip>
												<Tooltip title="Eliminar medicamento">
													<IconButton
														className="text-danger"
														aria-label="Eliminar medicamento"
														onClick={event => handleDelete(index)}>
														<i className="fas fa-trash-alt"></i>
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={store.persons.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
