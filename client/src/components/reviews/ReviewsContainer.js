import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useContext } from "react"
import { BookContext } from '../../context/bookContext';

import ReviewCard from './ReviewCard';

const defaultTheme = createTheme()

const ReviewsContainer = ({ reviews, updateReview, deleteReview }) => {
    // const { books } = useContext(BookContext)

    return (
        <Box maxWidth="md" sx={{ px: 4 }}> 
            <Grid container spacing={4}>
                {reviews?.map(review => 
                    <ReviewCard 
                        key={review.id} 
                        review={review}
                        updateReview={updateReview}
                        deleteReview={deleteReview} />)}
            </Grid>
        </Box>
            // <main>
            // <Container sx={{ py: 8 }} maxWidth="md">
            //     <Grid container spacing={4}>
            //     {reviews?.map((review) => (
            //         <ReviewCard key={review.id} review={review} updateReview={updateReview} deleteReview={deleteReview} />
            //     ))}
            //     </Grid>
            // </Container>
            // </main>
    )
}

export default ReviewsContainer