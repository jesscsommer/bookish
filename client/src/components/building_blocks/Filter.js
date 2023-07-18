import { Typography, Paper, Popper, Dialog, DialogActions, DialogTitle, DialogContent, Button, Box, Rating, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";
import { styled } from '@mui/material/styles';

const Filter = ({ updateMinAvgRating, updateSortBy }) => {
    const [anchorEl, setAnchorEl] = useState(null);

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
                    boxShadow: "2px 2px 2px #E3E1E1"}}>
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
                <Typography mt={3} variant="h6">Sort by</Typography>
                <Select
                    id="sort_by"
                    fullWidth
                    sx={{ maxHeight: 45, marginBottom: 2 }}
                    onChange={(e) => updateSortBy(e.target.value)}
                >
                    <MenuItem value="avg_rating">Avg. rating</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                </Select>
                <Button 
                    variant="text"
                    color="secondary"
                    onClick={() => updateMinAvgRating(0)}>
                        Clear
                </Button>
                </Paper>
            </Popper>
        </div>
    )
}

export default Filter;