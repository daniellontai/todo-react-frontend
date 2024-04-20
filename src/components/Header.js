import ListsSelector from './ListsSelector';

export default function Header({ lists, selectedList, setSelectedList }) {
	return (
		<header>
			<ListsSelector
				lists={lists}
				selectedList={selectedList}
				setSelectedList={setSelectedList}
			/>
			<div className="logo">
				<img src="../../public/logo192.png" />
			</div>
		</header>
	);
}
