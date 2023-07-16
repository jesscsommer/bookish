import { Typography, Box, Rating, InputLabel, MenuItem, FormControl, Select, OutlinedInput, Chip } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { UserContext } from "../../context/userContext";
import { useContext, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };


const Filter = ({ updateMinAvgRating, updateSortBy, selectedTags, handleChange }) => {
    const { user } = useContext(UserContext)

    const theme = useTheme();

    const getStyles = (name, selectedTags, theme) => {
        return {
        fontWeight:
            selectedTags.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
        };
    }

    // const [selectedTags, setSelectedTags] = useState([]);

    // const handleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setSelectedTags(
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

    return (
        <Box>
            <Typography variant="h6">Filter by minimum avg rating:</Typography>
            <Rating name="min-avg-rating" defaultValue={0} onChange={(e) => updateMinAvgRating(e.target.value)}/>

            <Typography mt={3} variant="h6">Filter by tag:</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                id="tags"
                multiple
                value={selectedTags}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                >
                {user?.tags.map((tag) => (
                    <MenuItem
                    key={tag.id}
                    value={tag.name}
                    style={getStyles(tag.name, selectedTags, theme)}
                    >
                    {tag.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>

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