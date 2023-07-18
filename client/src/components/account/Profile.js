import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Grid, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Divider from '@mui/material/Divider';


import EditProfileForm from './EditProfileForm';
import { UserContext } from '../../context/userContext';
import AddShelfForm from "../shelves/AddShelfForm";
import DeleteButton from "../building_blocks/DeleteButton";
import { ShelfContext } from "../../context/shelfContext";
import ReviewsContainer from "../reviews/ReviewsContainer";
import EditReviewForm from "../reviews/EditReviewForm";
import Loading from "../building_blocks/Loading";
import { ReviewContext } from "../../context/reviewContext";

const Profile = () => {
    const { username } = useParams()
    const navigate = useNavigate()

    const { user, dispatch: userDispatch } = useContext(UserContext)
    const { shelves, dispatch: shelfDispatch } = useContext(ShelfContext)
    const { reviews, dispatch: reviewDispatch } = useContext(ReviewContext)
    const [ profileUser, setProfileUser ] = useState(null)


    useEffect(() => {
        (async () => {
            const res = await fetch(`/users/${username}`)
            if (res.ok) {
                const data = await res.json()
                setProfileUser(data)
                reviewDispatch({ type: "set", payload: data?.reviews })
            } else {
                navigate("/404")
            }
        })();
    }, [username, user])

    const handleClick = (shelf_id) => {
        (async () => {
            const res = await fetch(`/api/v1/shelves/${shelf_id}`, { method: "DELETE" })
            if (res.ok){
                shelfDispatch({ type: "remove", payload: shelf_id })
            }
        })();
    }

    if (!profileUser) return <Loading />

    return (
        <Box sx={{ py: 3 }}>
                <Box
                    sx={{ padding: 3}}
                    display="flex"
                    alignItems="flex-start"
                >
                    <Avatar alt={profileUser?.username} src={profileUser?.profile_pic} sx={{ width : 56, height : 56}} />
                    <Box ml={3} display="block">
                        <Typography variant="h3" mb={3}>{profileUser?.display_name}</Typography>
                        <Typography variant="h5" mb={3}>{profileUser?.username}</Typography>
                        <Typography mb={3}>{profileUser?.bio}</Typography>
                    </Box>
                    { user?.id === profileUser?.id ? <EditProfileForm /> : null }
                </Box>
            { user?.id === profileUser?.id ? <Divider variant="middle" /> : null }
            { user?.id === profileUser?.id ? 
                <Grid ml={5} sx={{ px: "56px" }}>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <Typography variant="h4" mt={3}>Manage shelves</Typography>
                        <AddShelfForm />
                    </Box>
                {shelves?.map((shelf) => 
                    <Grid item mt={1} key={shelf?.id}>
                        <Typography variant="h6">
                            {shelf?.name}
                            {shelf?.default ? null : 
                                <IconButton 
                                    color="secondary"
                                    onClick={() => handleClick(shelf?.id)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton> }
                        </Typography>
                    </Grid>)}
                </Grid>
            : null }
            <Divider variant="middle" sx={{ py: 3 }} />
            <Grid ml={5} sx={{ px: "56px" }}>
                <Typography variant="h4" mb={3} sx={{ py: 3 }}>{ user?.id === profileUser?.id ? "Manage reviews" : "All reviews" }</Typography>
                <ReviewsContainer 
                    reviews={reviews} 
                    /> 
            </Grid>
    </Box>
    )
}

export default Profile