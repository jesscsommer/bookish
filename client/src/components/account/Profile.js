import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Profile = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                padding: 3
                },
            }}
            >
            <Paper>
                <h1>Profile: Name</h1>
                <h3>Profile: Bio</h3>
            </Paper>
    </Box>
    )
}

export default Profile