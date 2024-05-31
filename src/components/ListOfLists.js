import { Dropdown, IconButton, Link, ListDivider, ListItemDecorator, Menu, MenuButton, MenuItem } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import NewListBtn from './PlusBtn';

export default function ListOfLists({ lists, selectedList, setSelectedList, deleteTaskListHandler, newTaskListPopupHandler }) {
	return (
		<>
			<nav>
				<h3>Lists</h3>
				<NewListBtn
					clickHandler={newTaskListPopupHandler}
					className="new-list-btn"
				/>
				<ul className="list-of-lists">
					{lists.map((list) => (
						<li
							key={list.id}
							className={list.id === selectedList ? 'selected' : ''}>
							<Link
								onClick={(e) => {
									e.preventDefault();
									setSelectedList(list.id);
								}}>
								{list.name}
							</Link>
							<Dropdown>
								<MenuButton
									slots={{ root: IconButton }}
									slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}>
									<FontAwesomeIcon icon={faEllipsisVertical} />
								</MenuButton>
								<Menu>
									<MenuItem>Edit List</MenuItem>
									<ListDivider />
									<MenuItem
										variant="soft"
										color="danger"
										onClick={() => deleteTaskListHandler(list.id)}>
										<ListItemDecorator sx={{ color: 'inherit' }}>
											<FontAwesomeIcon icon={faTrashCan} />
										</ListItemDecorator>{' '}
										Delete List
									</MenuItem>
								</Menu>
							</Dropdown>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
