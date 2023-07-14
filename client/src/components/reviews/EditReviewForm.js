import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import { useFormik } from "formik";
import * as yup from "yup";
import Cookies from "js-cookie";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from '../../context/userContext';

import Error from '../building_blocks/Error';
import EditButton from '../building_blocks/EditButton';

const EditReviewForm = ({ review }) => {
    const navigate = useNavigate()
    const { user, dispatch : userDispatch } = useContext(UserContext)
    const [ errors, setErrors ] = useState(null)

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const reviewSchema = yup.object().shape({
        rating: yup
        .number()
        .min(0.5, "Rating must be at least 0.5 stars")
        .max(5, "Rating must be at most 5 stars")
        .required("Rating is required"),
        comment: yup
        .string()
        .min(100, "Comment must be at least 100 characters")
        .max(2000, "Comment must be at most 2000 characters")
        .required("Comment is required")
    })

    const formik = useFormik({
        initialValues: {
            rating: review?.rating,
            comment: review?.comment
        },
        validationSchema: reviewSchema,
        onSubmit: (values, { resetForm }) => {
            // debugger 
            (async () => {
                const res = await fetch(`/api/v1/reviews/${review.id}`, {
                    method: "PATCH", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...values, "book_id": review.book.id })
                })
                if (res.ok) {
                    const data = await res.json()
                    // set context 
                    console.log(data)
                    handleClose()
                } else {
                    const err = await res.json()
                    setErrors(err.error)
                }
            })();
        }
    })

    return (
        <div>
            <IconButton onClick={handleClickOpen} aria-label="edit">
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit review</DialogTitle>
                <DialogContent>
                <Typography component="legend">Rating</Typography>
            <Rating 
                id="rating"
                name="rating" 
                precision={0.5} 
                value={Number(formik.values?.rating)} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} />
            {formik.errors.rating && formik.touched.rating ? 
                <Error severity="warning" error={formik.errors.rating} /> 
                : null}
            <TextField
                margin="normal"
                fullWidth
                multiline
                id="comment"
                label="Comment"
                name="comment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values?.comment}
            >
            </TextField>
            {formik.errors.comment && formik.touched.comment ? 
                <Error severity="warning" error={formik.errors.comment} /> 
                : null}
            {errors ? <Error severity="error" error={errors} /> : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={(e) => {
                            formik.handleSubmit()
                        }}
                            >
                            Update
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
}

export default EditReviewForm