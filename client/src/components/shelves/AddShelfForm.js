import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState, useContext } from "react";
import { UserContext } from '../../context/userContext';
import { useFormik } from "formik";
import * as yup from "yup";

import Error from '../building_blocks/Error';
import Cookies from "js-cookie"

const AddShelfForm = () => {
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
        .max(100, "Name must be at most 100 characters")
        .required("Shelf name is required")
    })

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: shelfSchema,
        onSubmit: (values) => {
            (async () => {
                const res = await fetch("/shelves", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": Cookies.get("csrf_access_token")
                    },
                    body: JSON.stringify(values)
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
                Add shelf
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Shelf</DialogTitle>
                <DialogContent>
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.errors.name && formik.touched.name ? 
                            <Error severity="warning" error={formik.errors.name} /> 
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

export default AddShelfForm