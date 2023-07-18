import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuid } from "uuid";

import BookCard from '../books/BookCard';
import DeleteButton from "../building_blocks/DeleteButton"
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { BookShelfContext } from '../../context/bookShelfContext';
import { BookContext } from '../../context/bookContext';

const Shelf = ({ shelf }) => {
    const { bookShelves, dispatch : bookShelfDispatch } = useContext(BookShelfContext)

    const booksOnShelves = bookShelves?.filter(bs => bs.shelf_id === shelf.id)
    // console.log(shelf.name)
    // console.log(booksOnShelves[0]?.book)

    return (
        <Box>
            <Typography mt={6} mb={2} variant="h5">
                {shelf?.name}
                {/* <DeleteButton handleClick={() => handleClick(shelf.id)} /> */}
            </Typography>
            <Grid container spacing={4}>
                {booksOnShelves.map(bookShelf => 
                    <BookCard 
                    key={uuid()}
                    book={bookShelf.book}
                    shelf={shelf} 
                    bookShelfId={bookShelf.id} />)}
            </Grid>
        </Box>
    )
}

export default Shelf