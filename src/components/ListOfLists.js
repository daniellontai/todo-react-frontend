import { Button, Dropdown, IconButton, Link, ListDivider, ListItemDecorator, Menu, MenuButton, MenuItem } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import NewListBtn from './PlusBtn';
import EditListDialog from './EditListDialog';
import { useState } from 'react';
import { clearErrorMessage, generateErrorString, patchList } from '../api/apiCalls';

export default function ListOfLists({ lists, setLists, selectedList, setSelectedList, deleteTaskListHandler, newTaskListPopupHandler, setIsLoading, setErrorMessage }) {
	const [editListDialogOpen, setEditListDialogOpen] = useState(false);
	const [listToEdit, setListToEdit] = useState(null);
	async function patchListHandler(listId, newName) {
		clearErrorMessage(setErrorMessage);
		try {
			let currentListName = lists.find((list) => list.id === listId).name;
			console.log(currentListName);
			console.log(newName);
			if (newName !== currentListName) {
				setIsLoading(true);
				const response = await patchList(listId, { name: newName });
				setIsLoading(false);

				if (response.error) {
					setErrorMessage(generateErrorString(response.error));
					return;
				} else {
					//update lists
					const updatedLists = lists.map((list) => {
						if (list.id === listId) {
							return { ...list, name: newName };
						} else {
							return list;
						}
					});
					setLists(updatedLists);
				}
			}
		} catch (error) {}
	}
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
									<MenuItem
										variant="plain"
										onClick={() => {
											setEditListDialogOpen(true);
											setListToEdit(list.id);
										}}>
										<ListItemDecorator sx={{ color: 'var(--text-color)' }}>
											<FontAwesomeIcon icon={faPencil} />
										</ListItemDecorator>
										Edit List
									</MenuItem>
									<ListDivider />
									<MenuItem
										variant="soft"
										color="danger"
										onClick={() => deleteTaskListHandler(list.id)}>
										<ListItemDecorator sx={{ color: 'danger' }}>
											<FontAwesomeIcon icon={faTrashCan} />
										</ListItemDecorator>
										Delete List
									</MenuItem>
								</Menu>
							</Dropdown>
						</li>
					))}
				</ul>
			</nav>
			<EditListDialog
				open={editListDialogOpen}
				setOpen={setEditListDialogOpen}
				list={lists.find((list) => list.id === listToEdit)}
				patchListHandler={patchListHandler}
				listToEdit={listToEdit}
				setListToEdit={setListToEdit}
			/>
		</>
	);
}
