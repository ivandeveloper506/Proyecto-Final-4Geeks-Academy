import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import { Link, NavLink, useHistory } from "react-router-dom";
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
import PersonGenerateQRDetail from "../person/person-table-generateqr-detail";

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
		id: "full_name",
		numeric: false,
		disablePadding: false,
		label: "Persona"
	}
	// { id: "actions", numeric: false, disablePadding: false, label: "Acciones" }
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
		maxWidth: 800,
		marginBottom: theme.spacing(1)
	},
	table: {
		minWidth: 200,
		maxWidth: 800
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
		width: 1,
		paddingLeft: 0
	}
}));

export default function EnhancedTable() {
	const { store, actions } = useContext(Context);
	const [searchPerson, setSearchPerson] = useState("");
	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("calories");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(true);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleClick = (event, index) => {
		actions.personIDSelected(index);

		// Se obtiene el código recien generado
		const personQRGetBody = {
			person_id: store.persons[index].id
		};

		// Se valida si existe el código, se obtiene, de lo contrario se genera.
		actions.getQRCodePerson(personQRGetBody);

		actions.personQRGenerate(store.persons[index]);

		if (store.QRCodePerson.length === 0) {
			console.log("*** handleClick en Person [store.persons[index]] ***");
			console.log(store.persons[index]);
			console.log(store.persons[index].id);

			const personQRGenerateBody = {
				url: `${store.URLCodeQR}${store.persons[index].id}`,
				person_id: store.persons[index].id,
				user_creation_id: store.userProfile.id
			};

			actions.generateQR(personQRGenerateBody);

			actions.getQRCodePerson(personQRGetBody);
		}

		// const selectedIndex = selected.indexOf(name);
		// let newSelected = [];

		// if (selectedIndex === -1) {
		// 	newSelected = newSelected.concat(selected, name);
		// } else if (selectedIndex === 0) {
		// 	newSelected = newSelected.concat(selected.slice(1));
		// } else if (selectedIndex === selected.length - 1) {
		// 	newSelected = newSelected.concat(selected.slice(0, -1));
		// } else if (selectedIndex > 0) {
		// 	newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		// }

		// setSelected(newSelected);
		// alert(name);
	};

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleDelete = index => {
		let personDelete = store.persons[index];

		actions.handlePersonDelete(personDelete.id, store.userProfile.id);
	};

	const retrievePerson = () => {
		// Se obtienen los datos de las personas asociadas al usuario.
		actions.getPerson(store.userProfile.id);

		actions.activeOption("/dashboard/person/generateqr");
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

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, store.persons.length - page * rowsPerPage);

	useEffect(() => {
		retrievePerson();

		if (store.persons.length > 0) {
			handleClick(null, 0);
		}
	}, []);

	return (
		<div className="row container-fluid container-person-class">
			{/* <div className="col-md-3" /> */}
			<div className="col-md-6">
				<div className={classes.root}>
					<Paper className={classes.paper}>
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
									rowCount={store.persons.length}
								/>
								<TableBody className="body-table-class">
									{stableSort(store.persons, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											const isItemSelected = isSelected(row.name);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow
													hover
													onClick={event => handleClick(event, index)}
													tabIndex={-1}
													key={index}>
													<TableCell component="th" id={labelId} scope="row" padding="20">
														{row.full_name}
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
							rowsPerPageOptions={[5]}
							component="div"
							count={store.persons.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Paper>
				</div>
			</div>
			<div className="col-md-6">
				<PersonGenerateQRDetail />
			</div>
		</div>
	);
}
