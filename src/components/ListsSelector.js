import { Autocomplete, Tooltip } from '@mui/joy';
import '../styles.css';

export default function ListsSelector({ lists, selectedList, setSelectedList }) {
	return (
		<>
			{/* <div className="lists-selector">
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
			</div> */}
			<Tooltip title="Select a task list">
				<Autocomplete
					placeholder={lists.find((list) => list.id === selectedList)?.name}
					options={lists}
					getOptionLabel={(option) => option.name}
					onChange={(event, value) => {
						if (value) {
							setSelectedList(value.id);
						}
					}}
					className="list-selector"
				/>
			</Tooltip>
		</>
	);
}
