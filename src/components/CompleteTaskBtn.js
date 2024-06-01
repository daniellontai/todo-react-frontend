import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * CompleteTaskBtn component that renders a button to complete a task.
 *
 * @param {function} clickHandler - The function to be called when the button is clicked
 * @return {React.JSX.Element} A button element with FontAwesomeIcon for completing a task
 */
export default function CompleteTaskBtn({ clickHandler }) {
	return (
		<button
			tabIndex="-1"
			className="task-complete icon-btn"
			onClick={clickHandler}>
			<FontAwesomeIcon icon={faCheck} />
		</button>
	);
}
