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

import { useContext } from "react"
import { BookContext } from '../../context/bookContext';

const defaultTheme = createTheme()

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const BooksContainer = () => {
    const { books } = useContext(BookContext)

    return (
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
            <main>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                {books.map((book) => (
                    <Grid item key={book.id} xs={12} sm={6} md={4}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardMedia
                        component="div"
                        sx={{
                            // 16:9
                            pt: '56.25%',
                        }}
                        image={book.cover_photo}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {book.title}
                        </Typography>
                        <Typography>
                            {book.description}
                        </Typography>
                        </CardContent>
                        <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                        </CardActions>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Container>
            </main>
        </ThemeProvider>
    )
}

export default BooksContainer