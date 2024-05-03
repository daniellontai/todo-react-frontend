import { Tooltip } from '@mui/joy';
import ListsSelector from './ListsSelector';
import NewTaskBtn from './NewTaskBtn';

export default function Header({ lists, selectedList, setSelectedList, newTaskListPopupHandler }) {
	return (
		<header>
			<div className="header-container">
				<div className="logo-container">
					<img
						src="logo192.png"
						alt="logo"
					/>
					<h1>Todo</h1>
				</div>
				<div className="listselector-container">
					<Tooltip title="Select a task list">
						<ListsSelector
							lists={lists}
							selectedList={selectedList}
							setSelectedList={setSelectedList}
						/>
					</Tooltip>
					<Tooltip title="Add a new task list">
						<NewTaskBtn clickHandler={newTaskListPopupHandler} />
					</Tooltip>
				</div>
			</div>
		</header>
	);
}
