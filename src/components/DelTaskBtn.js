import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

/**
 * Function component for a delete task button.
 *
 * @param {function} clickHandler - The function to be called when the button is clicked
 * @return {React.JSX.Element} A button component with a trash can icon
 */
export default function DelTaskBtn({ clickHandler }) {
	const deleting = useRef(false);
	const handleClick = () => {
		if (!deleting.current) {
			clickHandler();
			deleting.current = true;
		}
	};
	return (
		<button
			tabIndex="-1"
			className="task-delete icon-btn"
			onClick={handleClick}>
			<FontAwesomeIcon icon={faTrashCan} />
		</button>
	);
}
