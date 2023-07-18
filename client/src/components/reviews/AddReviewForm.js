import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import { useState, useContext } from "react";
import { UserContext } from '../../context/userContext';
import { useFormik } from "formik";
import * as yup from "yup";

import Error from '../building_blocks/Error';
import Cookies from "js-cookie"
import { ShelfContext } from '../../context/shelfContext';
import { BookContext } from '../../context/bookContext';
import { Input } from '@mui/material';

const AddReviewForm = ({ book, addReview }) => {
    const { user, dispatch : userDispatch } = useContext(UserContext)
    const { shelves, dispatch : shelfDispatch } = useContext(ShelfContext)
    const { books, dispatch : bookDispatch } = useContext(BookContext)
    const [ errors, setErrors ] = useState(null)

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
            rating: 0,
            comment: ""
        },
        validationSchema: reviewSchema,
        onSubmit: (values, { resetForm }) => {
            // debugger 
            (async () => {
                const res = await fetch("/api/v1/reviews", {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...values, "book_id": book.id })
                })
                if (res.ok) {
                    const data = await res.json()
                    // set context 
                    addReview(data)
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
        <Box mb={3} sx={{ padding: 3, maxWidth: 500 }}>
            <Typography mb={3} variant="h5">Review {book?.title}</Typography>
            <Typography component="legend">Rating</Typography>
            <StyledRating 
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
                InputProps={{
                    endAdornment: 
                    <InputAdornment position="end">
                        <IconButton onClick={formik.handleSubmit}>
                            <AddIcon />
                        </IconButton>
                    </InputAdornment>
                }}
            >
            </TextField>
            {formik.errors.comment && formik.touched.comment ? 
                <Error severity="warning" error={formik.errors.comment} /> 
                : null}
            {errors ? <Error severity="error" error={errors} /> : null}
        </Box>
    )
}

export default AddReviewForm