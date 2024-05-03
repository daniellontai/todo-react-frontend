import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * Renders a new task button component.
 *
 * @param {function} clickHandler - The function to be called when the button is clicked
 * @return {React.JSX.Element} The new task button component
 */
export default function NewTaskBtn({ clickHandler }) {
	// TODO: rename to PlusBtn or something to reflect reusability (same for className)
	return (
		<div
			tabIndex="-1"
			className="task-new">
			<button onClick={clickHandler}>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	);
}
