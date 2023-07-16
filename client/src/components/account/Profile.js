import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Grid, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';

import EditProfileForm from './EditProfileForm';
import { UserContext } from '../../context/userContext';
import AddShelfForm from "../shelves/AddShelfForm";
import DeleteButton from "../building_blocks/DeleteButton";
import { ShelfContext } from "../../context/shelfContext";
import ReviewsContainer from "../reviews/ReviewsContainer";
import EditReviewForm from "../reviews/EditReviewForm";

const Profile = () => {
    const { username } = useParams()
    const navigate = useNavigate()

    const { user, dispatch: userDispatch } = useContext(UserContext)
    const { shelves, dispatch: shelfDispatch } = useContext(ShelfContext)
    const [ profileUser, setProfileUser ] = useState(null)
    const [ reviews, setReviews ] = useState(null)

    const updateReview = (updatedReview) => {
        setReviews(reviews => reviews.map(review => review.id === updatedReview.id ? 
            updatedReview : review))
    }

    const deleteReview = (deletedReviewId) => {
        setReviews(reviews => reviews.filter(review => review.id !== deletedReviewId))
    }

    useEffect(() => {
        (async () => {
            const res = await fetch(`/users/${username}`)
            if (res.ok) {
                const data = await res.json()
                setProfileUser(data)
                setReviews(data.reviews)
            } else {
                navigate("/404")
            }
        })();
    }, [username, user])

    const handleClick = (shelf_id) => {
        (async () => {
            const res = await fetch(`/api/v1/shelves/${shelf_id}`, { method: "DELETE" })
            if (res.ok){
                userDispatch({ type: "fetch", payload: { ...user }})
                shelfDispatch({ type: "remove", payload: shelf_id })
            }
        })();
    }

    return (
        <Box>
                <Box
                    sx={{ padding: 3}}
                    display="flex"
                    alignItems="top"
                >
                    <Avatar alt={profileUser?.username} src={profileUser?.profile_pic} sx={{ width : 56, height : 56}} />
                    <Box ml={3} display="block">
                        <Typography variant="h3" mb={3}>{profileUser?.display_name}</Typography>
                        <Typography variant="h5" mb={3}>{profileUser?.username}</Typography>
                        <Typography mb={3}>{profileUser?.bio}</Typography>
                        { user?.id === profileUser?.id ? <EditProfileForm /> : null }
                    </Box>
                </Box>
            
            { user?.id === profileUser?.id ? 
                <Grid>
                    <Typography variant="h4" mt={3}>Manage shelves</Typography>
                {shelves?.map((shelf) => 
                    <Grid item mt={1} key={shelf?.id}>
                        <Typography variant="h6">
                            {shelf?.name}
                            {shelf?.default ? null : <DeleteButton handleClick={() => handleClick(shelf?.id)} />} 
                        </Typography>
                    </Grid>)}
                    <AddShelfForm />
                </Grid>
            : null }

            <Grid>
                <Typography variant="h4" mt={3}>{ user?.id === profileUser?.id ? "Manage reviews" : "All reviews" }</Typography>
                <ReviewsContainer reviews={reviews} updateReview={updateReview} deleteReview={deleteReview} /> 
            </Grid>
    </Box>
    )
}

export default Profile