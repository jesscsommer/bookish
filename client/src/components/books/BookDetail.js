import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import RecsContainer from "./RecsContainer";
import { BookContext } from '../../context/bookContext';
import AddReviewForm from '../reviews/AddReviewForm';
import { UserContext } from '../../context/userContext';
import ReviewsContainer from '../reviews/ReviewsContainer';
import BookRating from '../reviews/BookRating';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { ReviewContext } from '../../context/reviewContext';

import Rating from '@mui/material/Rating';
import { v4 as uuid } from "uuid";
import Loading from '../building_blocks/Loading';


const BookDetail = () => {
    const { id : book_id } = useParams()
    const { user } = useContext(UserContext)
    const { books, dispatch: bookDispatch } = useContext(BookContext)
    const { reviews, dispatch: reviewDispatch } = useContext(ReviewContext)
    const [ currentBook, setCurrentBook ] = useState(null)
    const [ errors, setErrors ] = useState(null)


    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/v1/books/${book_id}`)
            if (res.ok) {
                const bookData = await res.json()
                setCurrentBook(bookData)
                reviewDispatch({ type: "set", payload: bookData?.reviews })
            } else {
                const errorData = await res.json()
                setErrors(errorData)
            }
        })();
    }, [book_id])

    if (!currentBook) return <Loading />

    const recs = books?.filter(book => book?.id !== currentBook?.id).filter(book => {
        return book?.author.full_name === currentBook?.author.full_name ||
            book?.genre === currentBook?.genre
    })

    const reviewedByUser = currentBook?.reviews.find(review => review?.user?.id === user?.id)

    const desc_paragraphs = currentBook?.description.split("\n").map(p => p.replace("\\n", ""))

    return (
        <Box m={5} ml={10} mr={10}>
            <Box sx={{padding: 3}} display="flex" alignItems="top">
                <Box
                    component="img"
                    sx={{
                        maxHeight: 400,
                        objectFit: "contain",
                        borderRadius: "16px"
                    }}
                    alt={currentBook?.title}
                    src={currentBook?.cover_photo}
                />
                <Box sx={{ padding: "0 3em 0 3em", width: 2/3 }}>
                    <Typography variant="h3">
                        {currentBook?.title}
                    </Typography>
                    <Typography mb={1} variant="h5">
                        {currentBook?.author.full_name}
                    </Typography>
                    <BookRating rating={currentBook?.avg_rating} />
                    {desc_paragraphs?.map(p => 
                        <Typography key={uuid()} mt={2} variant="body1">
                            {p}
                        </Typography>
                    )}
                </Box>
            </Box>
            { recs.length ? 
                <RecsContainer recs={recs} /> 
                : null }
            <Box sx={{ py: 4 }}>              
                { user && !reviewedByUser ? 
                < AddReviewForm 
                    book={currentBook} 
                    /> 
                    : null }
                <Box sx={{ px: 3 }}>
                    <ReviewsContainer reviews={reviews} />
                </Box>
            </Box>
        </Box>
    )
}

export default BookDetail;