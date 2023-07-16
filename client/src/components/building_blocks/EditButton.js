import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const EditButton = (handleClick) => {
    return (
        <IconButton onClick={handleClick} aria-label="edit">
            <EditIcon />
        </IconButton>
    )
}

export default EditButton