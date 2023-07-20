import { useState, useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import AddToShelfForm from "../shelves/AddToShelfForm";
import DeleteButton from "../building_blocks/DeleteButton";
import { UserContext } from "../../context/userContext";
import { useLocation, Link } from "react-router-dom";
import { ShelfContext } from "../../context/shelfContext";
import { BookShelfContext } from "../../context/bookShelfContext";
import BookRating from "../reviews/BookRating";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from "uuid";

const QuoteCard = ({ quote }) => {

    return (
        <Grid item sx={{objectFit: "contain", width: 1/3}} key={uuid()}>
                <Card
                    sx={{ 
                        height: "100%", 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: "flex-start", 
                        borderRadius: "5px", 
                        boxShadow: "0px 2px 2px #E3E1E1",
                        padding: 3, 
                        bgcolor: "rgba(255,136,73,0.4)"}}
                >
                    {quote?.content?.split("\n").map(line => 
                        <Typography key={uuid()} sx={{ display: "flex", flexDirection: "column" }} variant="pullquote">{line}</Typography>
                        )}
                </Card>
        </Grid>
    )
}

export default QuoteCard