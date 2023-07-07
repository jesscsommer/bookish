import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState, useContext } from "react";
import { UserContext } from '../../context/userContext';
import { useFormik } from "formik";
import * as yup from "yup";

import Error from '../building_blocks/Error';
import Cookies from "js-cookie"

const AddToShelfForm = ({ book_id }) => {
    const [open, setOpen] = useState(false);
    const { user, dispatch : userDispatch } = useContext(UserContext)

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const shelfSchema = yup.object().shape({
        name: yup
        .string()
        .required("Shelf name is required")
    })

    const formik = useFormik({
        initialValues: {
            shelf_id: ""
        },
        validationSchema: shelfSchema,
        onSubmit: (values) => {
            (async () => {
                const res = await fetch("/book_shelves", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": Cookies.get("csrf_access_token")
                    },
                    body: JSON.stringify({...values, "book_id": book_id})
                })
                if (res.ok) {
                    userDispatch({ type: "fetch", payload: {...user} })
                }
            })();
        }
    })

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add to shelf
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add To Shelf</DialogTitle>
                <DialogContent>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Shelf</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="shelf_id"
                        name="shelf_id"
                        value={formik.values.shelf_id}
                        label="name"
                        onChange={formik.handleChange}
                        >
                        {user.shelves.map(shelf => {
                            return <MenuItem key={shelf.id} value={shelf.id}>{shelf.name}</MenuItem>
                        })}
                        </Select>
                    </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        onClick={() => {
                            formik.handleSubmit()
                            handleClose()
                        }}>
                            Add
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
}

export default AddToShelfForm