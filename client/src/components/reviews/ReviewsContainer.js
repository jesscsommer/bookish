import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useContext } from "react"
import { BookContext } from '../../context/bookContext';

import ReviewCard from './ReviewCard';

const defaultTheme = createTheme()

const ReviewsContainer = ({ reviews }) => {
    // const { books } = useContext(BookContext)

    return (
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
            <main>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                {reviews?.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
                </Grid>
            </Container>
            </main>
        </ThemeProvider>
    )
}

export default ReviewsContainer