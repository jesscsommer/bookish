import { Typography, Popper, Dialog, DialogActions, DialogTitle, DialogContent, Button, Box, Rating, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";

const Filter = ({ updateMinAvgRating, updateSortBy }) => {
    // const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    
    // const handleClose = () => {
    //     setOpen(false);
    // };

    const handleClick = (e) => {
        setAnchorEl(anchorEl ? null : e.target);
    };
    
    const open = !!anchorEl

    return (
        <div>
            <Button id="anchor" color="primary" onClick={handleClick}>
                Filters
            </Button>
            <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
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
            </Popper>
        </div>
    )
}

export default Filter;