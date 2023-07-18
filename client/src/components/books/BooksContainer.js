import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Filter from '../building_blocks/Filter';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useContext, useState } from "react"
import { BookContext } from '../../context/bookContext';

import BookCard from './BookCard';

const defaultTheme = createTheme()

const BooksContainer = () => {
    const [ minAvgRating, setMinAvgRating ] = useState(null)
    const [ sortBy, setSortBy ] = useState(null)
    const { books } = useContext(BookContext)
    const filteredBooks = books.filter(book => book.avg_rating >= minAvgRating)

    const updateMinAvgRating = (newAvg) => {
        setMinAvgRating(avg => newAvg)
    }

    const sortedBooks = 
        sortBy === "avg_rating" ?
        
        filteredBooks.sort((a, b) => b.avg_rating - a.avg_rating) :

        filteredBooks.sort((a, b) => {
            const titleA = a.title.toUpperCase()
            const titleB = b.title.toUpperCase()

            if (titleA < titleB) {
                return -1 
            }
            if (titleB > titleA) {
                return 1
            }
            return 0
    })

    const updateSortBy = (newSort) => {
        setSortBy(old => newSort)
    }


    return (
            <Box sx={{ py: 8, padding: 10}} 
                    maxWidth="xl"
                    // display="flex"
                    // alignItems="top"
                    // justify="center"
                    display="flex"
                    justifyContent="center"
                    alignItems="top"
                    // minHeight="100vh"
                    >
                <Filter updateMinAvgRating={updateMinAvgRating} updateSortBy={updateSortBy} />
                <Grid container spacing={4}>
                {sortedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
                </Grid>
            </Box>
    );
}

export default BooksContainer;