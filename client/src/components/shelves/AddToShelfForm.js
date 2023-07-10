import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';


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
        shelf_id: yup
        .number()
        .required("Shelf is required")
    })

    const formik = useFormik({
        initialValues: {
            shelf_id: ""
        },
        validationSchema: shelfSchema,
        onSubmit: (values) => {
            // console.log("Reached submit!")
            (async () => {
                const res = await fetch("/book_shelves", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({...values, "book_id": book_id})
                })
                if (res.ok) {
                    const data = await res.json()
                    userDispatch({ type: "fetch", payload: {...user} })
                    console.log(data)
                    console.log(user.book_shelves)
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
                <DialogTitle>Add to Shelf</DialogTitle>
                <DialogContent>
                    <TextField
                            margin="normal"
                            required
                            select
                            fullWidth
                            id="shelf_id"
                            label="shelf_id"
                            name="shelf_id"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            // defaultValue={""}
                            value={formik.values?.shelf_id}
                        >
                            {/* <MenuItem value={1}>One</MenuItem> */}
                            {user?.shelves?.map(shelf => <MenuItem key={shelf.id} value={shelf.id}>{shelf.name}</MenuItem>)}
                        </TextField>
                        {formik.errors.shelf_id && formik.touched.shelf_id ? 
                            <Error severity="warning" error={formik.errors.shelf_id} /> 
                            : null}
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