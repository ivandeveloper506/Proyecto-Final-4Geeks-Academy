// import React, { useContext, useState, useEffect, useRef } from "react";
// import { Context } from "../../store/appContext";
// import { Link, NavLink, useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Paper from "@material-ui/core/Paper";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import DeleteIcon from "@material-ui/icons/Delete";
// import SearchIcon from "@material-ui/icons/Search";
// import EditIcon from "@material-ui/icons/Edit";
// import Swal from "sweetalert2";
// import SearchBar from "material-ui-search-bar";
// import Divider from "@material-ui/core/Divider";

// function descendingComparator(a, b, orderBy) {
// 	if (b[orderBy] < a[orderBy]) {
// 		return -1;
// 	}
// 	if (b[orderBy] > a[orderBy]) {
// 		return 1;
// 	}
// 	return 0;
// }

// function getComparator(order, orderBy) {
// 	return order === "desc"
// 		? (a, b) => descendingComparator(a, b, orderBy)
// 		: (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
// 	const stabilizedThis = array.map((el, index) => [el, index]);
// 	stabilizedThis.sort((a, b) => {
// 		const order = comparator(a[0], b[0]);
// 		if (order !== 0) return order;
// 		return a[1] - b[1];
// 	});
// 	return stabilizedThis.map(el => el[0]);
// }

// const headCells = [
// 	{
// 		id: "full_name",
// 		numeric: false,
// 		disablePadding: false,
// 		label: "Persona"
// 	},
// 	{ id: "actions", numeric: false, disablePadding: false, label: "Acciones" }
// ];

// function EnhancedTableHead(props) {
// 	const { classes, order, orderBy, onRequestSort } = props;
// 	const createSortHandler = property => event => {
// 		onRequestSort(event, property);
// 	};

// 	return (
// 		<TableHead className="head-table-class">
// 			<TableRow>
// 				{headCells.map(headCell => (
// 					<TableCell
// 						className="cell-table-class"
// 						key={headCell.id}
// 						align={headCell.numeric ? "right" : "left"}
// 						padding={headCell.disablePadding ? "none" : "default"}
// 						sortDirection={orderBy === headCell.id ? order : false}>
// 						<TableSortLabel
// 							active={orderBy === headCell.id}
// 							direction={orderBy === headCell.id ? order : "asc"}
// 							onClick={createSortHandler(headCell.id)}>
// 							{headCell.label}
// 							{orderBy === headCell.id ? (
// 								<span className={classes.visuallyHidden}>
// 									{order === "desc" ? "sorted descending" : "sorted ascending"}
// 								</span>
// 							) : null}
// 						</TableSortLabel>
// 					</TableCell>
// 				))}
// 			</TableRow>
// 		</TableHead>
// 	);
// }

// EnhancedTableHead.propTypes = {
// 	classes: PropTypes.object.isRequired,
// 	numSelected: PropTypes.number.isRequired,
// 	onRequestSort: PropTypes.func.isRequired,
// 	onSelectAllClick: PropTypes.func.isRequired,
// 	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
// 	orderBy: PropTypes.string.isRequired,
// 	rowCount: PropTypes.number.isRequired,
// 	personId: PropTypes.personId
// };

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		width: "100%"
// 		// width: "max-content"
// 	},
// 	paper: {
// 		width: "100%",
// 		maxWidth: 800,
// 		marginBottom: theme.spacing(1)
// 	},
// 	table: {
// 		minWidth: 200,
// 		maxWidth: 800
// 	},
// 	visuallyHidden: {
// 		border: 0,
// 		clip: "rect(0 0 0 0)",
// 		height: 1,
// 		margin: -1,
// 		overflow: "hidden",
// 		padding: 0,
// 		position: "absolute",
// 		top: 20,
// 		width: 1,
// 		paddingLeft: 0
// 	}
// }));

// export default function EnhancedTable() {
// 	const { store, actions } = useContext(Context);
// 	const [searchPerson, setSearchPerson] = useState("");
// 	const classes = useStyles();
// 	const [order, setOrder] = React.useState("asc");
// 	const [orderBy, setOrderBy] = React.useState("calories");
// 	const [selected, setSelected] = React.useState([]);
// 	const [page, setPage] = React.useState(0);
// 	const [dense, setDense] = React.useState(true);
// 	const [rowsPerPage, setRowsPerPage] = React.useState(5);

// 	const handleRequestSort = (event, property) => {
// 		const isAsc = orderBy === property && order === "asc";
// 		setOrder(isAsc ? "desc" : "asc");
// 		setOrderBy(property);
// 	};

// 	const handleDelete = index => {
// 		let personDelete = store.persons[index];

// 		actions.handlePersonDelete(personDelete.id, store.userProfile.id);
// 	};

// 	const retrievePerson = () => {
// 		// Se obtienen los datos de las personas asociadas al usuario.
// 		actions.getPerson(store.userProfile.id);

// 		// Se obtienen los datos de los medicamentos de una vez
// 		// actions.getPersonMedicine(1);

// 		// Se configura la opción del home
// 		actions.activeOption("/dashboard/person");
// 	};

// 	const handleChangePage = (event, newPage) => {
// 		setPage(newPage);
// 	};

// 	const handleChangeRowsPerPage = event => {
// 		setRowsPerPage(parseInt(event.target.value, 10));
// 		setPage(0);
// 	};

// 	const handleChangeDense = event => {
// 		setDense(event.target.checked);
// 	};

// 	const isSelected = name => selected.indexOf(name) !== -1;

// 	const emptyRows = rowsPerPage - Math.min(rowsPerPage, store.persons.length - page * rowsPerPage);

// 	useEffect(() => {
// 		retrievePerson();
// 	}, []);

// 	return (
// 		<div className="row container-fluid">
// 			<div className="col-md-3" />
// 			<div className="col-md-6">
// 				<div className={classes.root}>
// 					<Paper className={classes.paper}>
// 						<div className="row container-fluid search-people-class">
// 							<div className="col d-flex justify-content-center">
// 								<Tooltip title="Crear Persona" aria-label="Crear Persona">
// 									<NavLink to={`/dashboard/person/detail/`}>
// 										<button className="mt-1 btn btn-success">
// 											<i className="fas fa-plus"></i> Crear persona
// 										</button>
// 									</NavLink>
// 								</Tooltip>
// 							</div>
// 						</div>

// 						<TableContainer>
// 							<Table
// 								className={classes.table}
// 								aria-labelledby="tableTitle"
// 								size={dense ? "small" : "medium"}
// 								aria-label="enhanced table">
// 								<EnhancedTableHead
// 									classes={classes}
// 									numSelected={selected.length}
// 									order={order}
// 									orderBy={orderBy}
// 									onRequestSort={handleRequestSort}
// 									rowCount={store.persons.length}
// 								/>
// 								<TableBody className="body-table-class">
// 									{stableSort(store.persons, getComparator(order, orderBy))
// 										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// 										.map((row, index) => {
// 											const isItemSelected = isSelected(row.name);
// 											const labelId = `enhanced-table-checkbox-${index}`;

// 											return (
// 												<TableRow hover tabIndex={-1} key={index}>
// 													<TableCell component="th" id={labelId} scope="row" padding="20">
// 														{row.full_name}
// 													</TableCell>
// 													<TableCell>
// 														<Tooltip title="Editar registro">
// 															<NavLink to={`/dashboard/person/detail/${index}`}>
// 																<button className="m-2 btn btn-warning button-table-class">
// 																	<i className="fas fa-pen"></i>
// 																</button>
// 															</NavLink>
// 														</Tooltip>
// 														<Tooltip title="Eliminar registro">
// 															<button
// 																className="m-2 btn btn-danger button-table-class"
// 																onClick={event => handleDelete(index)}>
// 																<i className="fas fa-trash"></i>
// 															</button>
// 														</Tooltip>
// 														<Tooltip title="Medicamentos">
// 															<NavLink to={`/dashboard/person/medicine/${index}`}>
// 																<button className="m-2 btn btn-primary button-table-class">
// 																	<i className="fas fa-tablets"></i>
// 																</button>
// 															</NavLink>
// 														</Tooltip>
// 													</TableCell>
// 												</TableRow>
// 											);
// 										})}
// 									{emptyRows > 0 && (
// 										<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
// 											<TableCell colSpan={6} />
// 										</TableRow>
// 									)}
// 								</TableBody>
// 							</Table>
// 						</TableContainer>
// 						<TablePagination
// 							rowsPerPageOptions={[5, 10, 25]}
// 							component="div"
// 							count={store.persons.length}
// 							rowsPerPage={rowsPerPage}
// 							page={page}
// 							onChangePage={handleChangePage}
// 							onChangeRowsPerPage={handleChangeRowsPerPage}
// 						/>
// 					</Paper>
// 				</div>
// 			</div>
// 			<div className="col-md-3" />
// 		</div>
// 	);
// }

// import React from "react";
// import clsx from "clsx";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MenuItem from "@material-ui/core/MenuItem";

// import PersonDrawer from "../pages/person/person-drawer";
// import MedicineDrawer from "../pages/person/medicine-drawer";

// const drawerWidth = 240;

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		display: "flex"
// 	},
// 	appBar: {
// 		transition: theme.transitions.create(["margin", "width"], {
// 			easing: theme.transitions.easing.sharp,
// 			duration: theme.transitions.duration.leavingScreen
// 		})
// 	},
// 	appBarShift: {
// 		width: `calc(100% - ${drawerWidth}px)`,
// 		marginLeft: drawerWidth,
// 		transition: theme.transitions.create(["margin", "width"], {
// 			easing: theme.transitions.easing.easeOut,
// 			duration: theme.transitions.duration.enteringScreen
// 		})
// 	},
// 	menuButton: {
// 		marginRight: theme.spacing(2)
// 	},
// 	hide: {
// 		display: "none"
// 	},
// 	drawer: {
// 		width: drawerWidth,
// 		flexShrink: 0
// 	},
// 	drawerPaper: {
// 		width: drawerWidth
// 	},
// 	drawerHeader: {
// 		display: "flex",
// 		alignItems: "center",
// 		padding: theme.spacing(0, 1),
// 		// necessary for content to be below app bar
// 		...theme.mixins.toolbar,
// 		justifyContent: "flex-end"
// 	},
// 	content: {
// 		flexGrow: 1,
// 		padding: theme.spacing(3),
// 		transition: theme.transitions.create("margin", {
// 			easing: theme.transitions.easing.sharp,
// 			duration: theme.transitions.duration.leavingScreen
// 		}),
// 		marginLeft: -drawerWidth
// 	},
// 	contentShift: {
// 		transition: theme.transitions.create("margin", {
// 			easing: theme.transitions.easing.easeOut,
// 			duration: theme.transitions.duration.enteringScreen
// 		}),
// 		marginLeft: 0
// 	}
// }));

// export default function PersistentDrawerLeft() {
// 	const classes = useStyles();
// 	const theme = useTheme();
// 	const [open, setOpen] = React.useState(false);

// 	const handleDrawerOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleDrawerClose = () => {
// 		setOpen(false);
// 	};

// 	const handleProfileMenuOpen = event => {
// 		setAnchorEl(event.currentTarget);
// 		alert("Entro 1");
// 	};

// 	return (
// 		<div className={classes.root}>
// 			<CssBaseline />
// 			<AppBar
// 				position="fixed"
// 				className={clsx(classes.appBar, {
// 					[classes.appBarShift]: open
// 				})}>
// 				<Toolbar>
// 					<IconButton
// 						color="inherit"
// 						aria-label="open drawer"
// 						onClick={handleDrawerOpen}
// 						edge="start"
// 						className={clsx(classes.menuButton, open && classes.hide)}>
// 						<MenuIcon />
// 					</IconButton>
// 					<Typography variant="h5" noWrap>
// 						medicQR
// 					</Typography>
// 					{/* <div className={classes.grow} />
// 					<div className={classes.sectionDesktop}>
// 						<MenuItem onClick={handleProfileMenuOpen}>
// 							<IconButton
// 								aria-label="account of current user"
// 								aria-controls="primary-search-account-menu"
// 								aria-haspopup="true"
// 								color="inherit">
// 								<AccountCircle />
// 							</IconButton>
// 							<p>Editar perfil</p>
// 						</MenuItem>
// 					</div> */}
// 				</Toolbar>
// 			</AppBar>
// 			<Drawer
// 				className={classes.drawer}
// 				variant="persistent"
// 				anchor="left"
// 				open={open}
// 				classes={{
// 					paper: classes.drawerPaper
// 				}}>
// 				<div className={classes.drawerHeader}>
// 					<IconButton onClick={handleDrawerClose}>
// 						{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
// 					</IconButton>
// 				</div>
// 				<Divider />
// 				<List>
// 					{["Personas", "Generar QR"].map((text, index) => (
// 						<ListItem button key={text}>
// 							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
// 							<ListItemText primary={text} />
// 						</ListItem>
// 					))}
// 				</List>
// 				<Divider />
// 				<List>
// 					{["Editar Perfil", "Cerrar Sesión"].map((text, index) => (
// 						<ListItem button key={text}>
// 							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
// 							<ListItemText primary={text} />
// 						</ListItem>
// 					))}
// 				</List>
// 			</Drawer>
// 			<main
// 				className={clsx(classes.content, {
// 					[classes.contentShift]: open
// 				})}>
// 				<div className={classes.drawerHeader} />
// 				{/* <PersonDrawer /> */}
// 				<div className="row">
// 					<div className="col-md-6">
// 						<PersonDrawer />
// 					</div>
// 					<div className="col-md-6">
// 						<MedicineDrawer />
// 					</div>
// 				</div>

// 				{/* <h1>Esto es una prueba</h1> */}
// 				{/* <Typography paragraph>
// 					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
// 					et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at
// 					ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis
// 					convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
// 					sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
// 					quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris
// 					commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue
// 					eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
// 					donec massa sapien faucibus et molestie ac.
// 				</Typography> */}
// 			</main>
// 		</div>
// 	);
// }

// import React from "react";
// import PersonDrawer from "../person/person-drawer";
// import MedicineDrawer from "../person/medicine-drawer";

// export default function PersonTable() {
// 	return (
// 		<div className="container">
// 			<div className="row">
// 				<div className="col-md-6">
// 					<PersonDrawer />
// 				</div>
// 				<div className="col-md-6">{/* <MedicineDrawer /> */}</div>
// 			</div>
// 		</div>
// 	);
// }

// import React, { useContext, useState, useEffect, useRef } from "react";
// import { Context } from "../../store/appContext";
// import { Link, NavLink, useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Paper from "@material-ui/core/Paper";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import DeleteIcon from "@material-ui/icons/Delete";
// import SearchIcon from "@material-ui/icons/Search";
// import EditIcon from "@material-ui/icons/Edit";
// import Swal from "sweetalert2";
// import SearchBar from "material-ui-search-bar";
// import Divider from "@material-ui/core/Divider";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
// import Typography from "@material-ui/core/Typography";

// function descendingComparator(a, b, orderBy) {
// 	if (b[orderBy] < a[orderBy]) {
// 		return -1;
// 	}
// 	if (b[orderBy] > a[orderBy]) {
// 		return 1;
// 	}
// 	return 0;
// }

// function getComparator(order, orderBy) {
// 	return order === "desc"
// 		? (a, b) => descendingComparator(a, b, orderBy)
// 		: (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
// 	const stabilizedThis = array.map((el, index) => [el, index]);
// 	stabilizedThis.sort((a, b) => {
// 		const order = comparator(a[0], b[0]);
// 		if (order !== 0) return order;
// 		return a[1] - b[1];
// 	});
// 	return stabilizedThis.map(el => el[0]);
// }

// const headCells = [
// 	{
// 		id: "full_name",
// 		numeric: false,
// 		disablePadding: false,
// 		label: "Nombre"
// 	},
// 	{ id: "actions", numeric: false, disablePadding: false, label: "Acciones" }
// ];

// function EnhancedTableHead(props) {
// 	const { classes, order, orderBy, onRequestSort } = props;
// 	const createSortHandler = property => event => {
// 		onRequestSort(event, property);
// 	};

// 	return (
// 		<TableHead className="head-table-class">
// 			<TableRow>
// 				{headCells.map(headCell => (
// 					<TableCell
// 						className="cell-table-class"
// 						key={headCell.id}
// 						align={headCell.numeric ? "right" : "left"}
// 						padding={headCell.disablePadding ? "none" : "default"}
// 						sortDirection={orderBy === headCell.id ? order : false}>
// 						<TableSortLabel
// 							active={orderBy === headCell.id}
// 							direction={orderBy === headCell.id ? order : "asc"}
// 							onClick={createSortHandler(headCell.id)}>
// 							{headCell.label}
// 							{orderBy === headCell.id ? (
// 								<span className={classes.visuallyHidden}>
// 									{order === "desc" ? "sorted descending" : "sorted ascending"}
// 								</span>
// 							) : null}
// 						</TableSortLabel>
// 					</TableCell>
// 				))}
// 			</TableRow>
// 		</TableHead>
// 	);
// }

// EnhancedTableHead.propTypes = {
// 	classes: PropTypes.object.isRequired,
// 	numSelected: PropTypes.number.isRequired,
// 	onRequestSort: PropTypes.func.isRequired,
// 	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
// 	orderBy: PropTypes.string.isRequired,
// 	rowCount: PropTypes.number.isRequired
// };

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		width: "100%"
// 	},
// 	paper: {
// 		width: "100%",
// 		maxWidth: 800,
// 		marginBottom: theme.spacing(1)
// 	},
// 	table: {
// 		minWidth: 200,
// 		maxWidth: 800
// 	},
// 	visuallyHidden: {
// 		border: 0,
// 		clip: "rect(0 0 0 0)",
// 		height: 1,
// 		margin: -1,
// 		overflow: "hidden",
// 		padding: 0,
// 		position: "absolute",
// 		top: 20,
// 		width: 1,
// 		paddingLeft: 0
// 	}
// }));

// export default function EnhancedTable() {
// 	const { store, actions } = useContext(Context);
// 	const [searchPerson, setSearchPerson] = useState("");
// 	const classes = useStyles();
// 	const [order, setOrder] = React.useState("asc");
// 	const [orderBy, setOrderBy] = React.useState("calories");
// 	const [selected, setSelected] = React.useState([]);
// 	const [page, setPage] = React.useState(0);
// 	const [dense, setDense] = React.useState(true);
// 	const [rowsPerPage, setRowsPerPage] = React.useState(5);

// 	const handleRequestSort = (event, property) => {
// 		const isAsc = orderBy === property && order === "asc";
// 		setOrder(isAsc ? "desc" : "asc");
// 		setOrderBy(property);
// 	};

// 	const handleDelete = index => {
// 		let personDelete = store.persons[index];

// 		actions.handlePersonDelete(personDelete.id, store.userProfile.id);
// 	};

// 	const retrievePerson = () => {
// 		// Se obtienen los datos de las personas asociadas al usuario.
// 		actions.getPerson(store.userProfile.id);

// 		// Se obtienen los datos de los medicamentos de una vez
// 		// actions.getPersonMedicine(1);

// 		// Se configura la opción del home
// 		actions.activeOption("/dashboard/person");
// 	};

// 	const handleChangePage = (event, newPage) => {
// 		setPage(newPage);
// 	};

// 	const handleChangeRowsPerPage = event => {
// 		setRowsPerPage(parseInt(event.target.value, 10));
// 		setPage(0);
// 	};

// 	const handleChangeDense = event => {
// 		setDense(event.target.checked);
// 	};

// 	const handleClick = (event, index) => {
// 		actions.personIDSelected(index);
// 	};

// 	const isSelected = name => selected.indexOf(name) !== -1;

// 	const emptyRows = rowsPerPage - Math.min(rowsPerPage, store.persons.length - page * rowsPerPage);

// 	useEffect(() => {
// 		retrievePerson();
// 	}, []);

// 	return (
// 		<div className="container-fluid">
// 			<div className="row">
// 				<div className="col-md-3" />
// 				<div className="col-md-6">
// 					<div className={classes.root}>
// 						<Paper className={classes.paper}>
// 							<div className="row">
// 								<div className="col d-flex align-items-center">
// 									<h4 className="ml-3">Personas</h4>
// 								</div>
// 								<div className="col d-flex justify-content-end m-2">
// 									<Tooltip title="Crear Persona" aria-label="Crear Persona">
// 										<NavLink to={`/dashboard/person/detail/`}>
// 											<AddCircleIcon className="new-icon-person-class" />
// 										</NavLink>
// 									</Tooltip>
// 								</div>
// 							</div>

// 							<TableContainer>
// 								<Table
// 									className={classes.table}
// 									aria-labelledby="tableTitle"
// 									size={dense ? "small" : "medium"}
// 									aria-label="enhanced table">
// 									<EnhancedTableHead
// 										classes={classes}
// 										numSelected={selected.length}
// 										order={order}
// 										orderBy={orderBy}
// 										onRequestSort={handleRequestSort}
// 										rowCount={store.persons.length}
// 									/>
// 									<TableBody className="body-table-class">
// 										{stableSort(store.persons, getComparator(order, orderBy))
// 											.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// 											.map((row, index) => {
// 												const isItemSelected = isSelected(row.name);
// 												const labelId = `enhanced-table-checkbox-${index}`;

// 												return (
// 													<TableRow hover tabIndex={-1} key={index}>
// 														<TableCell component="th" id={labelId} scope="row">
// 															{row.full_name}
// 														</TableCell>
// 														<TableCell>
// 															<Tooltip title="Editar registro">
// 																<NavLink to={`/dashboard/person/detail/${index}`}>
// 																	<button className="m-2 btn btn-warning button-table-class">
// 																		<i className="fas fa-pen"></i>
// 																	</button>
// 																</NavLink>
// 															</Tooltip>
// 															<Tooltip title="Eliminar registro">
// 																<button
// 																	className="m-2 btn btn-danger button-table-class"
// 																	onClick={event => handleDelete(index)}>
// 																	<i className="fas fa-trash"></i>
// 																</button>
// 															</Tooltip>
// 															<Tooltip title="Medicamentos">
// 																<NavLink to={`/dashboard/person/medicine/${index}`}>
// 																	<button className="m-2 btn btn-primary button-table-class">
// 																		<i className="fas fa-tablets"></i>
// 																	</button>
// 																</NavLink>
// 															</Tooltip>
// 														</TableCell>
// 													</TableRow>
// 												);
// 											})}
// 										{emptyRows > 0 && (
// 											<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
// 												<TableCell colSpan={6} />
// 											</TableRow>
// 										)}
// 									</TableBody>
// 								</Table>
// 							</TableContainer>
// 							<TablePagination
// 								rowsPerPageOptions={[5]}
// 								component="div"
// 								count={store.persons.length}
// 								rowsPerPage={rowsPerPage}
// 								page={page}
// 								onChangePage={handleChangePage}
// 								onChangeRowsPerPage={handleChangeRowsPerPage}
// 							/>
// 						</Paper>
// 					</div>
// 				</div>
// 				<div className="col-md-3" />
// 			</div>
// 		</div>
// 	);
// }

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
import AddCircleIcon from "@material-ui/icons/AddCircle";

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
	},
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
		// width: "max-content"
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

		// Se obtienen los datos de los medicamentos de una vez
		// actions.getPersonMedicine(1);

		// Se configura la opción del home
		actions.activeOption("/dashboard/person");
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
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3" />
				<div className="col-md-6">
					<div className={classes.root}>
						<Paper className={classes.paper}>
							<div className="row search-people-class">
								<div className="col d-flex justify-content-center">
									<Tooltip title="Crear Persona" aria-label="Crear Persona">
										<NavLink to={`/dashboard/person/detail/`}>
											<button className="mt-1 btn btn-success">
												<i className="fas fa-plus"></i> Crear persona
											</button>
										</NavLink>
									</Tooltip>
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
										rowCount={store.persons.length}
									/>
									<TableBody className="body-table-class">
										{stableSort(store.persons, getComparator(order, orderBy))
											.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
											.map((row, index) => {
												const isItemSelected = isSelected(row.name);
												const labelId = `enhanced-table-checkbox-${index}`;

												return (
													<TableRow hover tabIndex={-1} key={index}>
														<TableCell component="th" id={labelId} scope="row" padding="20">
															{row.full_name}
														</TableCell>
														<TableCell>
															<Tooltip title="Editar registro">
																<NavLink to={`/dashboard/person/detail/${index}`}>
																	<button className="m-2 btn btn-warning button-table-class">
																		<i className="fas fa-pen"></i>
																	</button>
																</NavLink>
															</Tooltip>
															<Tooltip title="Eliminar registro">
																<button
																	className="m-2 btn btn-danger button-table-class"
																	onClick={event => handleDelete(index)}>
																	<i className="fas fa-trash"></i>
																</button>
															</Tooltip>
															<Tooltip title="Medicamentos">
																<NavLink to={`/dashboard/person/medicine/${index}`}>
																	<button className="m-2 btn btn-primary button-table-class">
																		<i className="fas fa-tablets"></i>
																	</button>
																</NavLink>
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
			</div>
			<div className="col-md-3" />
		</div>
	);
}
