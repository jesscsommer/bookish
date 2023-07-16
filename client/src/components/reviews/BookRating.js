import Rating from '@mui/material/Rating';

const BookRating = ({ rating }) => {
    return (
        <Rating 
                id="rating"
                name="rating" 
                precision={0.5} 
                value={rating} 
                readOnly />
    )
}

export default BookRating