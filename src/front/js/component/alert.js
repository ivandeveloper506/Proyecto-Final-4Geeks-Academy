import Swal from "sweetalert2";

export function ShowAlert(aPosition, aIcon, aTitle, aText, aShowConfirmButton, aTimerProgressBar, aTimer) {
	Swal.fire({
		position: aPosition,
		icon: aIcon,
		title: aTitle,
		text: aText,
		showConfirmButton: aShowConfirmButton,
		timerProgressBar: aTimerProgressBar,
		timer: aTimer
	});
}
