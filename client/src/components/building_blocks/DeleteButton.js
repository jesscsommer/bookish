import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = ({ handleClick }) => {
    return (
        <IconButton aria-label="delete">
            <DeleteIcon onClick={handleClick} />
        </IconButton>
    )
}

export default DeleteButton