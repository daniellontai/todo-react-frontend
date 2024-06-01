import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function EditListDialog({ open, setOpen, list, patchListHandler, listToEdit, setListToEdit }) {
	const [newListName, setNewListName] = useState('');

	useEffect(() => {
		if (list) {
			setNewListName(list.name);
		}
	}, [open]);

	return (
		<>
			<Modal
				open={open}
				onClose={() => setOpen(false)}>
				<ModalDialog>
					<DialogTitle>Edit List '{newListName}'</DialogTitle>
					<DialogContent>Update your list data below.</DialogContent>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							setOpen(false);
						}}>
						<Stack spacing={2}>
							<FormControl>
								<FormLabel>List Name</FormLabel>
								<Input
									autoFocus
									required
									value={newListName}
									onChange={(event) => setNewListName(event.target.value)}
								/>
							</FormControl>
							<Button
								type="submit"
								startDecorator={<FontAwesomeIcon icon={faFloppyDisk} />}
								onClick={() => patchListHandler(list.id, newListName)}>
								Save
							</Button>
						</Stack>
					</form>
				</ModalDialog>
			</Modal>
		</>
	);
}
