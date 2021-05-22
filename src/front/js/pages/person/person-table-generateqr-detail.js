// import React, { useContext, useState, useEffect, useRef } from "react";
// import { Context } from "../../store/appContext";
// import { Link, NavLink, useHistory, useParams } from "react-router-dom";
// import "../../../styles/qrstyles.scss";
// import Tooltip from "@material-ui/core/Tooltip";
// import { QRCode } from "react-qrcode-logo";

// export default function PersonGenerateQr() {
// 	const { store, actions } = useContext(Context);
// 	const params = useParams();
// 	const personId = parseInt(params.personId);

// 	let personDetail = store.persons[personId];

// 	const handleGenerate = index => {
// 		// Se manda a crear el usuario
// 		const personQRBody = {
// 			url: `${store.URLCodeQR}${personDetail.id}`,
// 			person_id: personDetail.id,
// 			user_creation_id: store.userProfile.id
// 		};

// 		actions.generateQR(personQRBody);
// 	};

// 	useEffect(() => {
// 		const personQRBody = {
// 			person_id: personDetail.id
// 		};

// 		actions.getQRCodePerson(personQRBody);

// 		actions.activeOption(`/dashboard/person/generateqr/detail/${personId}`);
// 	}, []);

// 	return (
// 		<div className="container">
// 			<div className="col-md-2" />
// 			<div className="col-md-8 container-fluid qr-main-class">
// 				<div className="row qr-title-main-class">
// 					<div className="col-md-7 mt-3">
// 						<h6>Generar Código QR [{personDetail.full_name}]</h6>
// 					</div>
// 					<div className="col-md-5">
// 						<Tooltip title="Generar Código" aria-label="Generar Código">
// 							<button className="mt-1 btn btn-success" onClick={event => handleGenerate()}>
// 								<i className="fas fa-plus"></i> Generar
// 							</button>
// 						</Tooltip>
// 						<Tooltip title="Regresar" aria-label="Regresar">
// 							<NavLink to="/dashboard/person/generateqr">
// 								<button className="btn btn-primary ml-3">
// 									<i className="fas fa-arrow-left"></i> Regresar
// 								</button>
// 							</NavLink>
// 						</Tooltip>
// 					</div>
// 				</div>
// 				<div className="row mt-3">
// 					<div className="col-md-5 mt-3 text-justify">
// 						{store.QRCodePerson.length === 0 ? (
// 							<p>
// 								Utilice la opión del botón Generar para generar el Código QR con la información de la
// 								persona.
// 							</p>
// 						) : (
// 							<p>
// 								El Código QR contiene la información que sea desea compartir, de la persona{" "}
// 								{personDetail.full_name} .
// 							</p>
// 						)}
// 					</div>
// 					<div className="col-md person-qr-info-class">
// 						<div className="row">
// 							<div className="col">
// 								{store.QRCodePerson.length === 0 ? (
// 									""
// 								) : (
// 									<QRCode
// 										className="col qr-info-cardL-class"
// 										value={store.QRCodePerson.url}
// 										size="150"
// 										ecLevel="H"
// 										qrStyle="square"
// 										fgColor="#003E7E"
// 										bgColor="#C4F1FE"
// 										enableCORS="true"
// 									/>
// 								)}

// 								{/* <QRCode
// 									className="col qr-info-cardL-class"
// 									value={store.QRCodePerson.url}
// 									size="150"
// 									ecLevel="H"
// 									qrStyle="square"
// 									fgColor="#003E7E"
// 									bgColor="#C4F1FE"
// 									enableCORS="true"
// 								/> */}
// 							</div>
// 							<div className="col qr-info-cardR-class">
// 								<p className="mt-3">{personDetail.full_name}</p>
// 								{store.QRCodePerson.length === 0 ? "" : <h5>ESCANEA EL</h5>}
// 								{store.QRCodePerson.length === 0 ? "" : <h3>CÓDIGO QR</h3>}

// 								{/* <h5>ESCANEA EL</h5>
// 								<h3>CÓDIGO QR</h3> */}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="col-md-2" />
// 		</div>
// 	);
// }

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345
	},
	media: {
		height: 0,
		paddingTop: "56.25%" // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	avatar: {
		backgroundColor: red[500]
	}
}));

export default function RecipeReviewCard() {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title="Shrimp and Chorizo Paella"
				subheader="September 14, 2016"
			/>
			<CardMedia className={classes.media} image="/static/images/cards/paella.jpg" title="Paella dish" />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add
					1 cup of frozen peas along with the mussels, if you like.
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more">
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Method:</Typography>
					<Typography paragraph>
						Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
					</Typography>
					<Typography paragraph>
						Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add
						chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8
						minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan.
						Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often
						until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups
						chicken broth; bring to a boil.
					</Typography>
					<Typography paragraph>
						Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without
						stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
						reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring,
						until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels
						that don’t open.)
					</Typography>
					<Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
