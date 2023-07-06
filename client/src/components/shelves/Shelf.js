import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuid } from "uuid";

import BookCard from '../books/BookCard';

const defaultTheme = createTheme()

const cards = [1, 2, 3];

const Shelf = ({ shelf }) => {

    return (
        <Grid container spacing={4}>
            <Box mt={5} sx={{ width: 1 }}>
                <Typography variant="h5">
                    {shelf.name}
                </Typography>
            </Box>
            {shelf.books.map((book) => (
                <BookCard key={uuid()} book={book} />
            ))}
        </Grid>
    )
}

export default Shelf