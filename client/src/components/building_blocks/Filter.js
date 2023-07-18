import { Typography, Paper, Popper, Dialog, DialogActions, DialogTitle, DialogContent, Button, Box, Rating, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";
import { styled } from '@mui/material/styles';

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

    const NUMS = [5, 4, 3, 2, 1]

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#FF8849',
        },
        '& .MuiRating-iconHover': {
            color: '#B24A13',
        },
    });


    return (
        <div>
            <Box 
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
                mb={1}>
                <Button id="anchor" color="primary" onClick={handleClick}>
                    Filters
                </Button>
            </Box>
            <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
                <Paper sx={{ 
                    padding: 3,
                    borderRadius: "5px", 
                    boxShadow: "2px 2px 2px #E3E1E1" }}>
                <Typography variant="h6">Avg. reader rating</Typography>
                {NUMS.map(NUM => 
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        key={NUM}
                        onClick={() => updateMinAvgRating(NUM)}
                        >
                        <StyledRating
                            name="min-avg-rating"
                            value={NUM}
                            readOnly
                        />
                        <Typography variant="body1" sx={{ ml: 1 }}>& up</Typography>
                    </Box>
                )}
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
                </Paper>
            </Popper>
        </div>
    )
}

export default Filter;