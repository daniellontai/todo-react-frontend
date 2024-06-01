import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * Renders a new task button component.
 *
 * @param {function} clickHandler - The function to be called when the button is clicked
 * @return {React.JSX.Element} The new task button component
 */
export default function PlusBtn({ clickHandler, className }) {
	// TODO: rename to PlusBtn or something to reflect reusability (same for className)
	let classString = 'plus-btn';
	if (className && className.length > 0) {
		classString += ' ' + className;
	}
	return (
		<div
			tabIndex="-1"
			className={classString}>
			<button
				onClick={clickHandler}
				className="icon-btn">
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	);
}
