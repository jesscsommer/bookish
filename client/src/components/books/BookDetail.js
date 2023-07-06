import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const BookDetail = () => {
    return (
        <Box display="flex" alignItems="top">
            <Box
                component="img"
                sx={{
                    width: 300,
                    // height: 300,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
                alt="alt text"
                src="https://shorturl.at/lLQ37"
            />
            <Box>
                <Typography variant="h4">
                    Book title
                </Typography>
                <Typography variant="h6">
                    Author name
                </Typography>
                <Typography variant="h8">
                    Description
                </Typography>
            </Box>
        </Box>
    )
}

export default BookDetail