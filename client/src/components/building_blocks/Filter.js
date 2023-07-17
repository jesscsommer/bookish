import { Typography, Box, Rating, InputLabel, MenuItem, FormControl, Select } from "@mui/material";


const Filter = ({ updateMinAvgRating, updateSortBy }) => {
    return (
        <Box>
            <Typography variant="h6">Filter by minimum avg rating:</Typography>
            <Rating name="min-avg-rating" defaultValue={0} onChange={(e) => updateMinAvgRating(e.target.value)}/>

            <Typography mt={3} variant="h6">Sort by:</Typography>
            <Select
                id="sort_by"
                sx={{ minWidth: 125 }}
                // value={age}
                onChange={(e) => updateSortBy(e.target.value)}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="avg_rating">Avg. Reader Review</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                {/* // add more options, most reviewed, etc. */}
            </Select>
        </Box>
    )
}

export default Filter;