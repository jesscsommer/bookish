import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
    return (
        <Box 
            justifyContent="center"
            sx={{
                display: "flex",
                padding: 10
            }}>
            <CircularProgress />
            <Typography ml={2} variant="h3">Loading ...</Typography>
        </Box>
    )
}

export default Loading;