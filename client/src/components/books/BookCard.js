import { useState, useContext } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AddToShelfForm from "../shelves/AddToShelfForm";
import DeleteButton from "../building_blocks/DeleteButton";
import { UserContext } from "../../context/userContext";
import { useLocation } from "react-router-dom";


const BookCard = ({ book }) => {
    const { user } = useContext(UserContext)
    const location = useLocation()

    const removeFromShelf = () => {

    }

    return (
        <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                component="div"
                sx={{
                    // 16:9
                    pt: '56.25%',
                }}
                image={book.cover_photo}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    {book.title}
                </Typography>
                <Typography>
                    {book.genre}
                </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        size="small"
                        href={`/books/${book.id}`}>
                            View
                    </Button>
                    <Button size="small">Edit</Button>
                    {user ? <AddToShelfForm book_id={book.id} /> : null}
                    {location.pathname === "/shelves" ? <DeleteButton handleClick={removeFromShelf}/> : null}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default BookCard