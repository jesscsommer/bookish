import { useState, useContext, useEffect } from "react";
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
import { ShelfContext } from "../../context/shelfContext";
import { BookShelfContext } from "../../context/bookShelfContext";
import BookRating from "../reviews/BookRating";

const BookCard = ({ book, shelf }) => {
    const [ avgRating, setAvgRating ] = useState(null)
    const { user, dispatch: userDispatch } = useContext(UserContext)
    const { bookShelves, dispatch : bookShelfDispatch } = useContext(BookShelfContext)
    const { shelves, dispatch : shelfDispatch } = useContext(ShelfContext)
    const location = useLocation()

    useEffect(() => {
        (async () => {
            const res = await fetch(`/avg_rating/books/${book?.id}`)
            if (res.ok) {
                const data = await res.json()
                setAvgRating(data.avg_rating)
            }
        })()
    }, [book])

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
                    <BookRating rating={avgRating} /> 
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