import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Grid, Typography } from "@mui/material";

import EditProfileForm from './EditProfileForm';
import { UserContext } from '../../context/userContext';
import AddShelfForm from "../shelves/AddShelfForm";
import DeleteButton from "../building_blocks/DeleteButton";

const Profile = () => {
    const { username } = useParams()
    const navigate = useNavigate()

    const { user, dispatch: userDispatch } = useContext(UserContext)
    const [ profileUser, setProfileUser ] = useState(null)

    useEffect(() => {
        (async () => {
            const res = await fetch(`/users/${username}`)
            if (res.ok) {
                const data = await res.json()
                setProfileUser(data)
            } else {
                navigate("/404")
            }
        })();
    }, [username, user])

    const handleClick = (shelf_id) => {
        (async () => {
            const res = await fetch(`/shelves/${shelf_id}`, { method: "DELETE" })
            if (res.ok){
                userDispatch({ type: "fetch", payload: { ...user }})
            }
        })();
    }

    return (
        <Box
            // sx={{
            //     display: 'flex',
            //     flexWrap: 'wrap',
            //     '& > :not(style)': {
            //     m: 1,
            //     padding: 3
            //     },
            // }}
            // maxWidth={false}
            // alignItems="center"
            >
            <Paper sx={{ padding: 3 }}>
                <h1>{profileUser?.username}</h1>
                <h3>{profileUser?.bio}</h3>
            { user?.id === profileUser?.id ? <EditProfileForm /> : null }
            </Paper>
            <Grid>
                <h1>My shelves</h1>
            {profileUser?.shelves.map((shelf) => 
                <Grid item mt={5} key={shelf.id}>
                    <Typography>
                        {shelf.name}
                        <DeleteButton handleClick={() => handleClick(shelf.id)} />
                    </Typography>
                </Grid>)}
            </Grid>
            <AddShelfForm />
    </Box>
    )
}

export default Profile