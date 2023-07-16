import { Typography, Box, Rating } from "@mui/material";


const Filter = ({ updateMinAvgRating }) => {
    return (
        <Box>
            <Typography variant="h6">Filter by minimum avg rating:</Typography>
            <Rating name="min-avg-rating" defaultValue={0} onChange={(e) => updateMinAvgRating(e.target.value)}/>
        </Box>
    )
}

export default Filter;