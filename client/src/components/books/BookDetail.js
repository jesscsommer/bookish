import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorContext } from '../../context/errorContext';
import RecsContainer from "./RecsContainer";
import { BookContext } from '../../context/bookContext';
import AddReviewForm from '../reviews/AddReviewForm';
import { UserContext } from '../../context/userContext';
import ReviewsContainer from '../reviews/ReviewsContainer';
import BookRating from '../reviews/BookRating';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import Rating from '@mui/material/Rating';
import { v4 as uuid } from "uuid";
import Loading from '../building_blocks/Loading';


const BookDetail = () => {
    const { id : book_id } = useParams()
    const { user } = useContext(UserContext)
    const { errors, dispatch: errorDispatch } = useContext(ErrorContext)
    const { books, dispatch: bookDispatch } = useContext(BookContext)
    const [ currentBook, setCurrentBook ] = useState(null)
    const [ reviews, setReviews ] = useState(null)
    const [ rating, setRating ] = useState(null)

    const addReview = (newReview) => {
        setReviews(reviews => [...reviews, newReview])
    }

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/v1/books/${book_id}`)
            if (res.ok) {
                const bookData = await res.json()
                setCurrentBook(bookData)
                setReviews(bookData.reviews)
                setRating(bookData.avg_rating)
            } else {
                const errorData = await res.json()
                errorDispatch({ type: "add", payload: errorData })
            }
        })();
    }, [book_id])

    if (!currentBook) return <Loading />

    const recs = books?.filter(book => book?.id !== currentBook?.id).filter(book => {
        return book?.author.full_name === currentBook?.author.full_name ||
            book?.genre === currentBook?.genre
    })

    const reviewedByUser = currentBook?.reviews.find(review => review.user.id === user?.id)

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
                    alt="alt text"
                    src={currentBook?.cover_photo}
                />
                <Box sx={{ padding: "0 3em 0 3em", width: 2/3 }}>
                    <Typography variant="h3">
                        {currentBook?.title}
                    </Typography>
                    <Typography mb={1} variant="h5">
                        {currentBook?.author.full_name}
                    </Typography>
                    <BookRating rating={rating} />
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
            {/* { recs.length ? 
                <Box sx={{ padding: 3}}>
                    <Typography variant="h5">You might also like ... </Typography>
                    <RecsContainer recs={recs} /> 
                </Box> :
                null } */}
            { user && !reviewedByUser ? < AddReviewForm book={currentBook} addReview={addReview} /> : null }
            <ReviewsContainer reviews={reviews} />
        </Box>
    )
}

export default BookDetail;