import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#FF8849',
    },
    '& .MuiRating-iconHover': {
        color: '#B24A13',
    },
});

const BookRating = ({ rating }) => {
    return (
        <StyledRating 
                id="rating"
                name="rating" 
                precision={0.5} 
                value={rating} 
                readOnly 
                />
    )
}

export default BookRating