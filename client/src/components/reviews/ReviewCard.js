import { useState, useContext } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";

import AddToShelfForm from "../shelves/AddToShelfForm";
import DeleteButton from "../building_blocks/DeleteButton";
import { UserContext } from "../../context/userContext";
import { useLocation, Link } from "react-router-dom";
import { ShelfContext } from "../../context/shelfContext";
import { BookShelfContext } from "../../context/bookShelfContext";
import Rating from "./Rating"

const ReviewCard = () => {
    const { user, dispatch: userDispatch } = useContext(UserContext)
    const { bookShelves, dispatch : bookShelfDispatch } = useContext(BookShelfContext)
    const { shelves, dispatch : shelfDispatch } = useContext(ShelfContext)
    const location = useLocation()


    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    benevolent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default ReviewCard