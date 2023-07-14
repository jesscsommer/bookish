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

import AddToShelfForm from "../shelves/AddToShelfForm";
import DeleteButton from "../building_blocks/DeleteButton";
import { UserContext } from "../../context/userContext";
import { useLocation, Link } from "react-router-dom";
import { ShelfContext } from "../../context/shelfContext";
import { BookShelfContext } from "../../context/bookShelfContext";
import EditButton from "../building_blocks/EditButton";
import EditReviewForm from "./EditReviewForm";

const ReviewCard = ({ review }) => {
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
                // shelfDispatch({ type: "remove", payload: shelf_id })
            }
        })();
    }

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
            <CardContent>
                <Link to={`/profile/${review?.user?.username}`} style={{ textDecoration: "none", color: "black" }}>
                    <Box
                        display="flex"
                        alignItems="top"
                        mb={2}
                        >
                        <Avatar sx={{ width: 30, height: 30 }} alt={review?.user?.username} src={review?.user?.profile_pic} />
                        <Typography ml={1} variant="h6" component="div">
                            {review?.user.username}
                        </Typography>
                        { onProfile && review?.user?.id === user?.id ? <EditReviewForm review={review} /> : null }
                        { onProfile && review?.user?.id === user?.id ? <DeleteButton handleClick={() => handleDelete(review?.id)} /> : null }
                    </Box>
                </Link>
                <Rating 
                    id="rating"
                    name="rating" 
                    precision={0.5} 
                    value={review?.rating}
                    readOnly
                    />
                <Typography variant="body2">
                    {review?.comment}
                </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ReviewCard