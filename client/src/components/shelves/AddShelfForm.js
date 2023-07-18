import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';



import { useState, useContext } from "react";
import { UserContext } from '../../context/userContext';
import { useFormik } from "formik";
import * as yup from "yup";

import Error from '../building_blocks/Error';
import Cookies from "js-cookie"
import { ShelfContext } from '../../context/shelfContext';

const AddShelfForm = () => {
    const [open, setOpen] = useState(false);
    const { user, dispatch : userDispatch } = useContext(UserContext)
    const { shelves, dispatch : shelfDispatch } = useContext(ShelfContext)
    const [ errors, setErrors ] = useState(null)

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
        onSubmit: (values, { resetForm }) => {
            // debugger 
            (async () => {
                const res = await fetch("/api/v1/shelves", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                if (res.ok) {
                    const data = await res.json()
                    // userDispatch({ type: "fetch", payload: {...user} })
                    shelfDispatch({ type: "add", payload : data })
                    resetForm()
                    setErrors(null)
                    handleClose()
                } else {
                    const err = await res.json()
                    setErrors("Shelf name must be unique")
                }
            })();
        }
    })

    return (
        <div>
            <IconButton 
                color="primary"
                sx={{ px: 2 }}
                onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Add shelf
            </Button> */}
            <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
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
                        {errors ? <Error severity="error" error={errors} /> : null}
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
                        <AddIcon />
                    </IconButton>
                    {/* <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        onClick={() => {
                            formik.handleSubmit()
                        }}>
                            Add
                    </Button> */}
                </DialogActions>
            </Dialog>
    </div>
    )
}

export default AddShelfForm