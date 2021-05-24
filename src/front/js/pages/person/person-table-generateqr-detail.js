import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../../../styles/qrstyles.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { QRCode } from "react-qrcode-logo";
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
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CodeQRPrint from "../person/codeqr-print";

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 400
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

export default function PersonQRGenerate() {
	const { store, actions } = useContext(Context);

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div className="container d-flex justify-content-center">
			<div className="row">
				<div className="col">
					<Card className={classes.root}>
						<CardHeader
							avatar={<Avatar aria-label="recipe" className={classes.avatar}></Avatar>}
							title={store.personQRGenerate.full_name}
						/>

						<CodeQRPrint />

						<CardContent>
							<Typography variant="body2" color="textSecondary" component="p">
								El Código QR contiene la información que sea desea compartir de la persona.
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							{/* <IconButton aria-label="Print QRCode">
								<PrintIcon />
							</IconButton> */}
							{/* <IconButton aria-label="Share QRCode">
								<ShareIcon />
							</IconButton> */}
						</CardActions>
					</Card>
				</div>
			</div>
		</div>
	);
}
