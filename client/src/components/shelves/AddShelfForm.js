import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import Error from '../building_blocks/Error';

const AddShelfForm = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const addShelf = (values) => {
        (async () => {
            const res = await fetch("/shelves", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            if (res.ok) {
                const new_shelf = await res.json()
                console.log(new_shelf)
            }
        })();
    }
    
    const shelfSchema = yup.object().shape({
        name: yup
        .string()
    })

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: shelfSchema,
        onSubmit: addShelf
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
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
    </div>
    )
}

export default AddShelfForm