import { useState, useContext } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import AddToShelfForm from "../shelves/AddToShelfForm";
import DeleteButton from "../building_blocks/DeleteButton";
import { UserContext } from "../../context/userContext";
import { useLocation, Link } from "react-router-dom";
import { ShelfContext } from "../../context/shelfContext";
import { BookShelfContext } from "../../context/bookShelfContext";
import EditButton from "../building_blocks/EditButton";
import EditReviewForm from "./EditReviewForm";
import BookRating from "./BookRating";

const ReviewCard = ({ review, updateReview, deleteReview }) => {
    const { user, dispatch: userDispatch } = useContext(UserContext)
    const { bookShelves, dispatch : bookShelfDispatch } = useContext(BookShelfContext)
    const { shelves, dispatch : shelfDispatch } = useContext(ShelfContext)
    const location = useLocation()
    const onProfile = location.pathname.includes("profile")

    // console.log(review)
    // console.log(user.reviews)

    const handleDelete = (review_id) => {
        (async () => {
            const res = await fetch(`/api/v1/reviews/${review_id}`, { method: "DELETE" })
            if (res.ok){
                userDispatch({ type: "fetch", payload: { ...user }})
                deleteReview(review_id)
                // shelfDispatch({ type: "remove", payload: shelf_id })
            }
        })();
    }

    return (
        <Box xs={12} sx={{ width: "100%" }}>
            <Card variant="outlined">
            <CardContent>
                <Link to={`/profile/${review?.user?.username}`} style={{ textDecoration: "none", color: "black" }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        m={1}
                        >
                        <Avatar sx={{ width: 25, height: 25 }} alt={review?.user?.username} src={review?.user?.profile_pic} />
                        <Typography sx={{ px: 2 }} variant="h6" component="div">
                            {review?.user.username}
                        </Typography>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end"
                            }}>
                            { onProfile && review?.user?.id === user?.id ? 
                                <EditReviewForm review={review} updateReview={updateReview} /> 
                                : null }
                            { onProfile && review?.user?.id === user?.id ? 
                                <IconButton 
                                    color="secondary"
                                    onClick={() => handleDelete(review?.id)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                : null }
                        </Box>
                    </Box>
                </Link>
                <BookRating rating={review?.rating} />
                <Typography variant="body1">
                    {review?.comment}
                </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ReviewCard