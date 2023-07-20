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
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookRating from "../reviews/BookRating";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const BookCard = ({ book, shelf, bookShelfId }) => {
    const { user, dispatch: userDispatch } = useContext(UserContext)
    const { bookShelves, dispatch : bookShelfDispatch } = useContext(BookShelfContext)
    const { shelves, dispatch : shelfDispatch } = useContext(ShelfContext)
    const [ avg, setAvg ] = useState(book.avg_rating)
    const location = useLocation()

    if (!avg) {
        (async () => {
            const res = await fetch(`/avg_rating/books/${book.id}`)
            if (res.ok){
                const data = await res.json()
                setAvg(data.avg_rating)
            }
        })()
    }

    const removeFromShelf = () => {
        (async () => {
            const res = await fetch(`/api/v1/book_shelves/${bookShelfId}`, { method: "DELETE"})
            if (res.ok) {
                bookShelfDispatch({ type: "remove", payload: bookShelfId })
            }
        })();
    }

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#FF8849',
        },
        '& .MuiRating-iconHover': {
            color: '#B24A13',
        },
    });

    return (
        <Grid item sx={{objectFit: "contain"}} key={book.id} xs={12} sm={8} md={4} lg={3} xl={2}>
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
                    />
                    <CardContent>
                    <Typography variant="h6" component="h2">
                            {book.title}
                    </Typography>
                    <Typography>
                        {book.genre}
                    </Typography>
                    <StyledRating 
                            id="rating"
                            name="rating" 
                            precision={0.5} 
                            value={avg} 
                            readOnly 
                            />
                
                    {/* <BookRating rating={avg} /> */}
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
                            {user ? 
                                <AddToShelfForm book={book} /> 
                                : null}
                            {location.pathname === "/shelves" ? 
                                <IconButton 
                                    color="secondary" 
                                    onClick={removeFromShelf}> 
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