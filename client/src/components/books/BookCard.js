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
import { useLocation, Link } from "react-router-dom";


const BookCard = ({ book, shelf }) => {
    const { user, dispatch: userDispatch } = useContext(UserContext)
    const location = useLocation()

    // console.log("book shelf id")
    // console.log(book_shelf_id)


    const removeFromShelf = () => {
        (async () => {
            const book_shelf_id = user?.shelves?.find(s => s.id === shelf.id)?.book_shelves?.find(b_s => b_s.book_id === book.id)?.id
            const res = await fetch(`/book_shelves/${book_shelf_id}`, { method: "DELETE"})
            if (res.ok) {
                userDispatch({ type: "fetch", payload: { ...user }})
            }
        })();
    }

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
                    //     16:9,
                    //     pt: '100%'
                    // }}
                    component="img"
                    sx={{ objectFit: "contain" }}
                    image={book.cover_photo}
                    // height="65%"
                    // width="85%"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {book.title}
                    </Typography>
                    <Typography>
                        {book.genre}
                    </Typography>
                    </CardContent>
                    </Link>
                    <CardActions>
                        {user &&  user.shelves.length ? <AddToShelfForm book_id={book.id} /> : null}
                        {location.pathname === "/shelves" ? <DeleteButton handleClick={removeFromShelf}/> : null}
                    </CardActions>
                </Card>
        </Grid>
    )
}

export default BookCard