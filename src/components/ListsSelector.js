import { Autocomplete } from '@mui/joy';

export default function ListsSelector({ lists, selectedList, setSelectedList }) {
	return (
		<>
			<div className="lists-selector">
				<select
					value={selectedList}
					onChange={(e) => setSelectedList(e.target.value)}>
					{lists.map((list) => (
						<option
							key={list.id}
							value={list.id}>
							{list.name}
						</option>
					))}
				</select>
			</div>
			<Autocomplete
				variant="soft"
				placeholder="Create new list"
				options={lists.map((list) => list.name)}
				onChange={(event, value) => {
					if (value) {
						setSelectedList(lists.find((list) => list.name === value).id);
					}
				}}
			/>
		</>
	);
}
