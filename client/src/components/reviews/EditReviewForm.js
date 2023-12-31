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
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { styled } from '@mui/material/styles';


import { useFormik } from "formik";
import * as yup from "yup";
import Cookies from "js-cookie";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from '../../context/userContext';

import Error from '../building_blocks/Error';
import EditButton from '../building_blocks/EditButton';
import { FormControl } from '@mui/material';
import BookRating from './BookRating';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { ReviewContext } from '../../context/reviewContext';

const EditReviewForm = ({ review, updateReview }) => {
    const navigate = useNavigate()
    const { user, dispatch : userDispatch } = useContext(UserContext)
    const { reviews, dispatch : reviewDispatch } = useContext(ReviewContext)
    const [ errors, setErrors ] = useState(null)
    const [ rating, setRating ] = useState(review?.rating)

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const reviewSchema = yup.object().shape({
        comment: yup
        .string()
        .min(100, "Comment must be at least 100 characters")
        .max(2000, "Comment must be at most 2000 characters")
        .required("Comment is required")
    })

    const formik = useFormik({
        initialValues: {
            comment: review?.comment
        },
        validationSchema: reviewSchema,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            // debugger 
            (async () => {
                const res = await fetch(`/api/v1/reviews/${review.id}`, {
                    method: "PATCH", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...values, "rating": rating, "book_id": review.book.id })
                })
                if (res.ok) {
                    const data = await res.json()
                    reviewDispatch({ type: "patch", payload: data })
                    handleClose()
                    resetForm()
                } else {
                    const err = await res.json()
                    setErrors(err.error)
                }
            })();
        }
    })

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#FF8849',
        },
        '& .MuiRating-iconHover': {
            color: '#B24A13',
        },
    });

    return (
        <div>
            <IconButton 
                color="primary"
                onClick={handleClickOpen}>
                <ModeEditOutlineOutlinedIcon />
            </IconButton>
            <Dialog fullWidth maxWidth="sm" component="form" open={open} onClose={handleClose}>
                <DialogTitle>Edit review</DialogTitle>
                <DialogContent>
                <StyledRating 
                    id="rating"
                    name="rating" 
                    precision={0.5} 
                    value={rating} 
                    onClick={e => {
                        setRating(Number(e.target.children[1].innerText.split(" ")[0]))
                    }}
                    />
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
                    <IconButton
                            color="secondary"
                            onClick={handleClose}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    <IconButton 
                        color="primary"
                        onClick={formik.handleSubmit}>
                            <SaveAsOutlinedIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>
    </div>
    )
}

export default EditReviewForm