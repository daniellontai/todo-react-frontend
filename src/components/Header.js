import ListsSelector from './ListsSelector';

export default function Header({ lists, selectedList, setSelectedList }) {
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
				<ListsSelector
					lists={lists}
					selectedList={selectedList}
					setSelectedList={setSelectedList}
				/>
			</div>
		</header>
	);
}
