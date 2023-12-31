import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IconButton } from "@mui/material";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';


import { useState, useContext } from "react";
import { UserContext } from '../../context/userContext';
import { useFormik } from "formik";
import * as yup from "yup";
import AddIcon from '@mui/icons-material/Add';
import Error from '../building_blocks/Error';
import Cookies from "js-cookie"
import { ShelfContext } from '../../context/shelfContext';
import { BookContext } from '../../context/bookContext';
import { BookShelfContext } from '../../context/bookShelfContext';

const AddToShelfForm = ({ book }) => {
    const [open, setOpen] = useState(false);
    const { user, dispatch : userDispatch } = useContext(UserContext)
    const { shelves, dispatch : shelfDispatch } = useContext(ShelfContext)
    const { books, dispatch : bookDispatch } = useContext(BookContext)
    const { bookShelves, dispatch: bookShelfDispatch } = useContext(BookShelfContext)

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const shelfSchema = yup.object().shape({
        shelf_id: yup
        .number()
        .required("Shelf is required")
    })

    const formik = useFormik({
        initialValues: {
            shelf_id: ""
        },
        validationSchema: shelfSchema,
        onSubmit: (values, { resetForm }) => {
            (async () => {
                const res = await fetch("/api/v1/book_shelves", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({...values, "book_id": book.id, "user_id": user.id })
                })
                if (res.ok) {
                    const data = await res.json()
                    bookShelfDispatch({ type: "add", payload: data })
                    resetForm()
                }
            })();
        }
    })


    const alreadyInShelves = bookShelves?.filter(bs => bs.book_id == book.id).map(bs => bs.shelf_id)
    const notInShelves = shelves?.filter(shelf => !alreadyInShelves?.includes(shelf.id))

    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen}>
                <BookmarkAddOutlinedIcon />
            </IconButton>
            <Dialog fullWidth maxWidth="xs" sx={{ margin: "auto" }} open={open} onClose={handleClose}>
                <DialogTitle>Add to Shelf</DialogTitle>
                <DialogContent>
                    <TextField
                            margin="normal"
                            required
                            select
                            fullWidth
                            id="shelf_id"
                            label="Shelf name"
                            name="shelf_id"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values?.shelf_id}
                        >
                            {notInShelves?.map(shelf => <MenuItem key={shelf.id} value={shelf.id}>{shelf.name}</MenuItem>)}
                        </TextField>
                        {formik.errors.shelf_id && formik.touched.shelf_id ? 
                            <Error severity="warning" error={formik.errors.shelf_id} /> 
                            : null}
                </DialogContent>
                <DialogActions>
                    <IconButton
                        color="secondary"
                        onClick={handleClose}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={(e) => {
                            formik.handleSubmit()
                            handleClose()
                        }}>
                        <BookmarkAddOutlinedIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>
    </div>
    )
}

export default AddToShelfForm