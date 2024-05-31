import ListsSelector from './ListsSelector';
import NewTaskBtn from './PlusBtn';

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
					<ListsSelector
						lists={lists}
						selectedList={selectedList}
						setSelectedList={setSelectedList}
					/>
					<NewTaskBtn clickHandler={newTaskListPopupHandler} />
				</div>
			</div>
		</header>
	);
}
