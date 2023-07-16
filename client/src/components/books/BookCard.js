import { useState, useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import AddToShelfForm from "../shelves/AddToShelfForm";
import DeleteButton from "../building_blocks/DeleteButton";
import { UserContext } from "../../context/userContext";
import { useLocation, Link } from "react-router-dom";
import { ShelfContext } from "../../context/shelfContext";
import { BookShelfContext } from "../../context/bookShelfContext";
import BookRating from "../reviews/BookRating";

const BookCard = ({ book, shelf }) => {
    const { user, dispatch: userDispatch } = useContext(UserContext)
    const { bookShelves, dispatch : bookShelfDispatch } = useContext(BookShelfContext)
    const { shelves, dispatch : shelfDispatch } = useContext(ShelfContext)
    const location = useLocation()

    const removeFromShelf = () => {
        (async () => {
            const book_shelf_id = user?.book_shelves?.find(bs => bs.book_id === book.id && bs.shelf_id === shelf.id)?.id
            const res = await fetch(`/api/v1/book_shelves/${book_shelf_id}`, { method: "DELETE"})
            if (res.ok) {
                shelf["books"] = shelf.books.filter(b => b.id !== book.id)
                shelfDispatch({ type: "patch", payload: shelf })

            }
        })();
    }

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    

    return (
        <Grid item key={book.id} xs={12} sm={8} md={4}>
                <Card
                    // component={Link}
                    // to={`/books/${book.id}`}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <Link to={`/books/${book.id}`} style={{ textDecoration: "none", color: "black" }}>
                    <CardMedia
                    // component="div"
                    // sx={{
                    //     9:16,
                    //     pt: '100%',
                    //     objectFit: "contain"
                    // }}
                    component="img"
                    sx={{ objectFit: "contain"}}
                    image={book.cover_photo}
                    // height="65%"
                    // width="85%"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                        {book.title}
                    </Typography>
                    <Typography>
                        {book.genre}
                    </Typography>
                    <BookRating rating={book.avg_rating} /> 
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label="Clickable Deletable"
                            onClick={handleClick}
                            onDelete={handleDelete}
                        />
                        <Chip
                            label="Clickable Deletable"
                            variant="outlined"
                            onClick={handleClick}
                            onDelete={handleDelete}
                        />
                    </Stack>
                    </CardContent>
                    </Link>
                    <CardActions>
                        {user &&  shelves?.length ? <AddToShelfForm book={book} /> : null}
                        {location.pathname === "/shelves" ? <DeleteButton handleClick={removeFromShelf}/> : null}
                    </CardActions>
                </Card>
        </Grid>
    )
}

export default BookCard