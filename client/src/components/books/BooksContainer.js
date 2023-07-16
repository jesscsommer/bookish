import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Filter from '../building_blocks/Filter';
import Box from '@mui/material/Box';

import { useContext, useState } from "react"
import { BookContext } from '../../context/bookContext';
import { UserContext } from '../../context/userContext';

import BookCard from './BookCard';

const defaultTheme = createTheme()

const BooksContainer = () => {
    const [ minAvgRating, setMinAvgRating ] = useState(null)
    const [ sortBy, setSortBy ] = useState(null)
    const { books } = useContext(BookContext)
    const { user } = useContext(UserContext)
    const filteredBooks = books.filter(book => book.avg_rating >= minAvgRating)

    const [selectedTags, setSelectedTags] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    // const TAGS = ["booktok", "DNF"]
    
    const checkTag = (arr, val) => {
        return arr?.some((arrVal) => val === arrVal.name)
    }

    const filteredBooksByTag = filteredBooks.filter(book => {
        const userTags = book.tags.filter(tag => tag.user_id === user?.id)
        for (let tag of selectedTags) {
            if (checkTag(userTags, tag)) {
                return true
            }
        }
    })
    // above needs to replace constant TAGS with whatever the selectedTags are

    const updateMinAvgRating = (newAvg) => {
        setMinAvgRating(avg => newAvg)
    }

    const sortedBooks = 
        sortBy === "avg_rating" ?
        
        filteredBooksByTag.sort((a, b) => b.avg_rating - a.avg_rating) :

        filteredBooksByTag.sort((a, b) => {
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
                <Filter 
                    updateMinAvgRating={updateMinAvgRating} 
                    updateSortBy={updateSortBy} 
                    selectedTags={selectedTags} 
                    handleChange={handleChange} />
                <Grid container spacing={4}>
                {sortedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
                </Grid>
            </Box>
        </ThemeProvider>
    )
}

export default BooksContainer