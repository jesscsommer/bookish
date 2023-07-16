import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Filter from '../building_blocks/Filter';
import Box from '@mui/material/Box';

import { useContext, useState } from "react"
import { BookContext } from '../../context/bookContext';

import BookCard from './BookCard';

const defaultTheme = createTheme()

const BooksContainer = () => {
    const [ minAvgRating, setMinAvgRating ] = useState(null)
    const { books } = useContext(BookContext)
    const filteredBooks = books.filter(book => book.avg_rating >= minAvgRating)

    const updateMinAvgRating = (newAvg) => {
        setMinAvgRating(avg => newAvg)
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ py: 8 }} 
                    maxWidth="md"
                    // display="flex"
                    // alignItems="top"
                    // justify="center"
                    display="flex"
                    justifyContent="center"
                    alignItems="top"
                    // minHeight="100vh"
                    >
                <Filter updateMinAvgRating={updateMinAvgRating} />
                <Grid container spacing={4}>
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
                </Grid>
            </Box>
        </ThemeProvider>
    )
}

export default BooksContainer