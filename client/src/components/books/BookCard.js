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

    return (
        <Grid item sx={{objectFit: "contain"}} key={book.id} xs={12} sm={8} md={6} lg={3} xl={2}>
                <Card
                    sx={{ 
                        height: "100%", 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: "space-between", 
                        borderRadius: "16px", 
                        boxShadow: "0px 2px 2px #E3E1E1" }}
                >
                    <Link 
                        to={`/books/${book.id}`} 
                        style={{ textDecoration: "none", color: "black" }}>
                    <CardMedia
                        component="img"
                        sx={{ 
                            objectFit: "contain", 
                            borderRadius: "16px", 
                            boxShadow: "2px 2px 2px #E3E1E1" }}
                        image={book.cover_photo}
                        // maxHeight="450px"
                    />
                    <CardContent>
                    <Typography variant="h6" component="h2">
                            {book.title}
                    </Typography>
                    <Typography>
                        {book.genre}
                    </Typography>
                    <BookRating rating={book.avg_rating} />
                    </CardContent>
                    </Link>
                    <CardActions disableSpacing> 
                        <Box 
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                margin: 0
                            }}>
                            {user && shelves?.length ? 
                                    <AddToShelfForm book={book} /> 
                                : null}
                            {location.pathname === "/shelves" ? 
                                <IconButton 
                                    color="secondary" 
                                    handleClick={removeFromShelf}> 
                                    <RemoveCircleOutlineIcon />
                                </IconButton> 
                                : null}
                        </Box>
                    </CardActions> 
                </Card>
        </Grid>
    )
}

export default BookCard