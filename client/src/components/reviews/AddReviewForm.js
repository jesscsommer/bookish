import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';


import { useState, useContext } from "react";
import { UserContext } from '../../context/userContext';
import { useFormik } from "formik";
import * as yup from "yup";

import Error from '../building_blocks/Error';
import Cookies from "js-cookie"
import { ShelfContext } from '../../context/shelfContext';
import { BookContext } from '../../context/bookContext';

const AddReviewForm = ({ book }) => {
    const { user, dispatch : userDispatch } = useContext(UserContext)
    const { shelves, dispatch : shelfDispatch } = useContext(ShelfContext)
    const { books, dispatch : bookDispatch } = useContext(BookContext)
    const [ errors, setErrors ] = useState(null)

    const reviewSchema = yup.object().shape({
        rating: yup
        .number(),
        comment: yup
        .string()
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
                const res = await fetch("/api/v1/reviews")
                }
            )();
        }
    })

    return (
        <Box sx={{ padding: 3, maxWidth: 500 }}>
            <Typography mb={3} variant="h5">Review {book?.title}</Typography>
            <Typography component="legend">Rating</Typography>
            <Rating name="half-rating" precision={0.5} />
            <TextField
                margin="normal"
                required
                fullWidth
                multiline
                id="review"
                label="Comment"
                name="review"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // // defaultValue={""}
                // value={formik.values?.shelf_id}
            >
            </TextField>
            {/* {formik.errors.shelf_id && formik.touched.shelf_id ? 
                <Error severity="warning" error={formik.errors.shelf_id} /> 
                : null} */}
            <Button 
                // onClick={(e) => {
                //     formik.handleSubmit()
                //     handleClose()
                // }}
                        >
                    Add
            </Button>
        </Box>
    )
}

export default AddReviewForm